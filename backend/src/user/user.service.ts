import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { ResponseHandler } from 'src/common/helpers/responseHandler';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { UserLoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ServiceRequest } from 'src/service-request/entities/service-request.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(ServiceRequest.name) private serviceRequestModel: Model<ServiceRequest>,
    private jwtService: JwtService
  ) { }


  async create(createUserDto: CreateUserDto): Promise<ResponseHandler | BadRequestException | ConflictException> {
    //check if the user already exists with email
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new ConflictException('User already exists with this email');
    }

    //create new user
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    createUserDto.password = hashedPassword;
    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    return new ResponseHandler('User created successfully', 200, true, newUser);
  }

  async login(payload: UserLoginDto): Promise<ResponseHandler | BadRequestException | UnauthorizedException> {
    //check if the user exists with email
    const user = await this.userModel.findOne({ email: payload.email }).select('+password');
    if (!user) {
      throw new BadRequestException('User not found with this email');
    }

    //check if the password is correct
    const isValid = await bcrypt.compare(payload.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // if the user is valid then create accessToken and refreshToken
    const accessToken = await this.jwtService.signAsync({ id: user._id }, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET
    })

    const refreshToken = await this.jwtService.signAsync({ id: user._id }, {
      expiresIn: '30d',
      secret: process.env.JWT_SECRET
    })

    // save the refresh token in the user document
    user.refreshToken = refreshToken;
    await user.save()

    const { password, ...result } = user.toObject();
    return new ResponseHandler('User logged in successfully', 200, true, { ...result, accessToken, refreshToken });
  }

  async findAll() {
    const allUsers = await this.userModel.find().populate({ path: 'service_requests' })

    if (allUsers.length == 0) throw new NotFoundException('No users available')

    return new ResponseHandler('All users fetched successfully', 200, true, allUsers)
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)

    if (!user) throw new NotFoundException('User not found')

    return new ResponseHandler('User data fetched successfully', 200, true, user)
  }

  async findAllServiceHistory(id : string) {
    const allUserRequests = await this.serviceRequestModel.find({ userId: id }).populate('authUserId').populate('serviceId') 

   const updatedResponse =  allUserRequests.map((request) => {
    const { authUserId, serviceId,...rest } = request.toObject()
      return {
        ...rest,
        mechanicName: request.authUserId['firstName'] + ' ' + request.authUserId['lastName'],
        mechanicEmail: request.authUserId['email'],
        mechanicContact: request.authUserId['contactNumber'],
        totalAmount: request.serviceId['price']
      }
    })

    if (!allUserRequests) throw new NotFoundException('User not found')

    return new ResponseHandler('User service history fetched successfully', 200, true, updatedResponse)
  }
}
