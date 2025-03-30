import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MechanicService } from './mechanic.service';
import { CombinedCreateDto, CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth-user/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('service')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ServiceController {
  constructor(private readonly serviceService: MechanicService) { }

  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: CombinedCreateDto })
  @ApiConsumes('multipart/form-data')
  @Post('create')
  @ApiOperation({ summary: 'Create a new service only for admin' })
  create(@UploadedFile() file: Express.Multer.File, @Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(file, createServiceDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all services' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a service by ID for admin' })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service by ID for admin' })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
