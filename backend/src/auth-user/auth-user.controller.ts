import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { LoginAuthUserDto } from './dto/login-auth-user.dto';
import { AdminGuard } from './admin.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'sign up new user' })
  create(@Body() createAuthUserDto: CreateAuthUserDto) {
    return this.authUserService.create(createAuthUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  login(@Body() payload: LoginAuthUserDto) {
    return this.authUserService.login(payload);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users for admin' })
  @Get('all')
  findAll() {
    return this.authUserService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authUserService.findOne(id);
  }
}

@Controller('admin')
export class AdminController {
  constructor(private readonly authUserService: AuthUserService) {} 
  @Post('login')
  @ApiOperation({ summary: 'login user' })
  login(@Body() payload: LoginAuthUserDto) {
    return this.authUserService.login(payload);
  }
}
