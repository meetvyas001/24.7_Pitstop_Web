import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { CombinedDto, CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { AdminGuard } from 'src/auth-user/admin.guard';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ServiceRequestStatus } from './enums/status.enum';

@Controller('service-request')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CombinedDto })
  @ApiConsumes('multipart/form-data')
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createComplaintDto: CreateComplaintDto,
    @Req() req: Request,
  ) {
    return this.serviceRequestService.create(
      file,
      createComplaintDto,
      req['user'],
    );
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all services by admin' })
  @Get('all')
  findAll() {
    return this.serviceRequestService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get service request by ID for status show in user ',
  })
  @ApiParam({
    name: 'id',
    description: 'Service request ID',
    type: String,
  })
  findOne(@Param('id') id: string) {
    return this.serviceRequestService.findOne(id);
  }

  // Mechanic Dahsboard
  @Patch('update-status/:id')
  @ApiOperation({ summary: 'Update service request status' })
  @ApiParam({
    name: 'id',
    description: 'Service request ID',
    type: String,
  })
  @ApiBody({
    type: UpdateComplaintDto,
    description: 'Status update data',
    examples: {
      accepted: {
        value: { status: ServiceRequestStatus.ACCEPTED },
      },
      rejected: {
        value: { status: ServiceRequestStatus.REJECTED },
      },
    },
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateComplaintDto: UpdateComplaintDto,
    @Req() req: Request,
  ) {
    return this.serviceRequestService.updateStatus(
      id,
      updateComplaintDto,
      req['user'],
    );
  }

  // Mechanic Dash
  @Get('mechanic-requests/:id')
  @ApiOperation({
    summary: 'Get all service request for mechanic Id is for mechanic',
  })
  findAllRequestsByMechanic(@Param('id') id: string) {
    return this.serviceRequestService.findAllComplaints(id);
  }
}
