import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { AdminGuard } from 'src/auth-user/admin.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from './enums/roles.enum';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({
    type: CreateRoleDto, examples: {
      admin: {
        value: {
          name: Roles.ADMIN
        }
      },
      mechanic: {
        value: {
          name: Roles.MECHANIC
        }
      }
    }
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('all')
  @ApiOperation({ summary: 'Get all roles for admin' })
  findAll() {
    return this.roleService.findAll();
  }
}
