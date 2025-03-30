import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { AdminGuard } from 'src/auth-user/admin.guard';

@Controller('user')
@ApiTags('User APIS')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'sign up new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  login(@Body() payload: UserLoginDto) {
    return this.userService.login(payload);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users for admin' })
  @Get('all')
  findAll () {
    return this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all service request history for user' })
  @Get('service-history/:id')
  findAllServiceHistory(@Param('id') id: string) {
    return this.userService.findAllServiceHistory(id);
  }
}
