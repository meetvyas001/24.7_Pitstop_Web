import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './entities/auth-user.entity';
import { Model } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';
import { Roles } from 'src/role/enums/roles.enum';
import { ResponseHandler } from 'src/common/helpers/responseHandler';
import { LoginAuthUserDto } from './dto/login-auth-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUser>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private jwtService: JwtService
  ) { }
  
  async create(createAuthUserDto: CreateAuthUserDto) {
    const { email, password, firstName, lastName, certifications, dateOfBirth, expertise, lat, lng, mechanicLicense, yearsOfExperience } = createAuthUserDto;

    const checkEmail = await this.authUserModel.findOne({
      email
    })

    if (checkEmail) throw new ConflictException('Email already exists')

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    const findMechanicRole = await this.roleModel.findOne({
      name: Roles.MECHANIC
    })


    if (!findMechanicRole) throw new NotFoundException('Mechanic role not found')

    const newUser = await this.authUserModel.create({
      ...createAuthUserDto,
      location: {
        type: 'Point',
        coordinates: [lat, lng]
      },
      password: hashedPassword,
      role: findMechanicRole._id
    })

    return new ResponseHandler('User created successfully', 200, true, newUser)
  }

  async login(authUserLoginDto: LoginAuthUserDto) {
    const { email, password } = authUserLoginDto;
    const findAuthUser = await this.authUserModel.findOne({
      email
    }).select('+password')

    if (!findAuthUser) throw new NotFoundException('User not found')

    // Add await here
    const isValid = await bcrypt.compare(password, findAuthUser.password)

    if (!isValid) throw new BadRequestException('Invalid password')

    const accessToken = await this.jwtService.signAsync({ id: findAuthUser._id }, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET
    })

    const refreshToken = await this.jwtService.signAsync({ id: findAuthUser._id }, {
      expiresIn: '30d',
      secret: process.env.JWT_SECRET
    })

    findAuthUser.refreshToken = refreshToken;
    const updatedUser = await findAuthUser.save()

    // Include tokens in response
    return new ResponseHandler('User logged in successfully', 200, true, {
      user: updatedUser,
      accessToken,
      refreshToken
    })
  }

  async findAll() {
    // give all auth users with their roles and services attached
    const findMechanicRole = await this.roleModel.findOne({
      name: Roles.MECHANIC
    })
    const allAuthUsers = await this.authUserModel.find({
      role: findMechanicRole._id
    })

    if (allAuthUsers.length == 0) throw new NotFoundException('No users found')

    return new ResponseHandler('All users fetched successfully', 200, true, allAuthUsers)

  }

  async findOne(id: string) {
    const findAuthUser = await this.authUserModel.findById(id)
    if (!findAuthUser) throw new NotFoundException('User not found')

    return new ResponseHandler('User fetched successfully', 200, true, findAuthUser)
  }
}
