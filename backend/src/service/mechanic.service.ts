import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './entities/service.entity';
import { Model } from 'mongoose';
import { ResponseHandler } from 'src/common/helpers/responseHandler';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class MechanicService {
  constructor(
    @InjectModel(Service.name) private serviceModel : Model<Service>,
    private uploadService : UploadService
  ) {}
  async create(file, createServiceDto: CreateServiceDto) {
    const { title, description, price } = createServiceDto;

    // check if the title is unique or not
    const checkTitle = await this.serviceModel.findOne({
      title
    })
    
    if(checkTitle) throw new BadRequestException('Title already present')

    // upload an  image
    const upload = await this.uploadService.uploadFile(file)

    if(!upload.success) throw new ConflictException('Image not uploaded')

    // save the new service


    //save the new service
    const newService =  await this.serviceModel.create({
      title,
      description,
      price,
      imageUrl : upload?.data?.url
    })

    return new ResponseHandler('New Service Created Successfully', 200, true, newService)
  }

  async findAll() {
    // get all the services
    const allServices = await this.serviceModel.find()

    if(allServices.length == 0) throw new NotFoundException('No services available')

    return new ResponseHandler('All Services Fetched Successfully', 200, true, allServices)
  }

  async findOne(id: string) {
    const getService = await this.serviceModel.findById(id)

    if(!getService) throw new NotFoundException('Service not found')

    return new ResponseHandler('Service found successfully', 200, true, getService)
  }

  async update(id : string, updateServiceDto : UpdateServiceDto) {
    const getService = await this.serviceModel.findById(id)

    if(!getService) throw new NotFoundException('Service not found')

    // if the update contains the title change then check in the DB that is there any same service named updated title
    if(updateServiceDto?.title) {
      const checkTitle = await this.serviceModel.findOne({
        title :updateServiceDto.title
      })

      if(checkTitle) throw new ConflictException('Title is already present')
    }

    const updatedService = await this.serviceModel.findByIdAndUpdate
    (id, updateServiceDto, { new : true })

    return new ResponseHandler('Service Updated Successfully', 200, true, updatedService)

  }
  
  async remove(id: string) {
    const getService = await this.serviceModel.findById(id)

    if(!getService) throw new NotFoundException('Service not found')

    await this.serviceModel.findByIdAndDelete(id)

    return new ResponseHandler('Service Deleted Successfully', 200, true, null)
  }
}
