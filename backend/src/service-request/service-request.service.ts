import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceRequest } from './entities/service-request.entity';
import { Model } from 'mongoose';
import { AuthUser } from 'src/auth-user/entities/auth-user.entity';
import { Service } from 'src/service/entities/service.entity';
import { ServiceType } from 'src/service/enums/serviceType.enum';
import { ResponseHandler } from 'src/common/helpers/responseHandler';
import { UploadService } from 'src/upload/upload.service';
import { VehicleType } from './enums/vehicle.enum';
import { ServiceRequestStatus } from './enums/status.enum';

@Injectable()
export class ServiceRequestService {
  constructor(
    @InjectModel(ServiceRequest.name)
    private serviceRequestModel: Model<ServiceRequest>,
    @InjectModel(AuthUser.name)
    private authUserModel: Model<AuthUser>,
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
    private uploadService: UploadService,
  ) {}

  async create(
    file: Express.Multer.File,
    createComplaintDto: CreateComplaintDto,
    user: any,
  ) {
    // check for the service
    const { serviceId, vehicleType } = createComplaintDto;
    const service = await this.serviceModel.findOne({
      _id: serviceId,
    });

    console.log('service', service);
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // upload the file
    const upload = await this.uploadService.uploadFile(file);

    if (!upload.success)
      throw new InternalServerErrorException('File not uploaded');

    // find the algorithm to get the mechanic which is nearest
    const findNearestMechanic = await this.authUserModel.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [createComplaintDto.lat, createComplaintDto.lng],
          },
          $maxDistance: 10000,
        },
      },
    });

    if (!findNearestMechanic) {
      throw new NotFoundException('No mechanic found');
    }

    // create a service request
    const newServiceRequest = await this.serviceRequestModel.create({
      ...createComplaintDto,
      location: {
        type: 'Point',
        coordinates: [createComplaintDto.lat, createComplaintDto.lng],
      },
      vechileType: vehicleType,
      userId: user.id,
      serviceId,
      authUserId: findNearestMechanic._id,
      vehicleImageUrl: upload.data.url,
    });

    const finalResponse = {
      ...newServiceRequest.toObject(),
      mechanicDetails: {
        firstName: findNearestMechanic['firstName'],
        lastName: findNearestMechanic['lastName'],
        lat: findNearestMechanic['lat'],
        lng: findNearestMechanic['lng'],
        shopName: findNearestMechanic['shopName'],
      },
      serviceDetails: {
        title: service['title'],
        description: service['description'],
        price: service['price'],
        serviceType: ServiceType[service['serviceType']],
      },
    };

    return new ResponseHandler(
      'Service Request Created Successfully',
      200,
      true,
      finalResponse,
    );
  }

  async findAll() {
    // get all the complaints
    const serviceRequests = await this.serviceRequestModel
      .find()
      .populate('userId')
      .populate('authUserId')
      .populate('serviceId');

    const updatedServiceRequest = serviceRequests.map((sr) => {
      const {
        authUserId,
        serviceId,
        userId,
        _id,
        description,
        location,
        status,
        createdAt,
      }: any = sr;
      // mechanic
      const mechanicFirstName = authUserId?.firstName;
      const mechanicLastName = authUserId?.lastName;
      const mechanicEmail = authUserId?.email;
      const mechanicContactNumber = authUserId?.contactNumber;
      const mechanicShopName = authUserId?.shopName;
      const mechanic_id = authUserId?._id;
      // user
      const userFirstName = userId?.firstName;
      const userLastName = userId?.lastName;
      const userContactNumber = userId?.address;
      const userEmail = userId?.email;
      const user_id = userId?._id;
      // service
      const serviceTitle = serviceId?.title;
      const serviceDescription = serviceId?.description;
      const servicePrice = serviceId?.price;
      const service_id = serviceId?._id;

      const data = {
        _id,
        status,
        createdAt,
        location,
        description,
        mechanic_id,
        mechanicFirstName,
        mechanicLastName,
        mechanicEmail,
        mechanicContactNumber,
        mechanicShopName,
        user_id,
        userFirstName,
        userLastName,
        userContactNumber,
        userEmail,
        service_id,
        serviceTitle,
        serviceDescription,
        servicePrice,
      };
      return data;
    });

    console.log(updatedServiceRequest, 'uodated');

    // console.log(serviceRequests, 'service Requests');

    if (serviceRequests.length == 0) {
      throw new NotFoundException('No complaints found');
    }

    return new ResponseHandler(
      'All Service Requests',
      200,
      true,
      updatedServiceRequest,
    );
  }

  async findAllComplaints(mechanicId: string) {
    // get all the complaints of a mechanic
    const serviceRequests = await this.serviceRequestModel
      .find({
        authUserId: mechanicId,
      })
      .populate('userId')
      .populate('serviceId');

    const updatedResponse = serviceRequests.map((serviceRequest) => {
      const { userId, serviceId, ...rest } = serviceRequest.toObject();
      return {
        ...rest,
        userDetails: {
          firstName: userId?.['firstName'],
          lastName: userId?.['lastName'],
          email: userId?.['email'],
        },
        price: serviceId?.['price'],
      };
    });

    return new ResponseHandler(
      'All Service Requests',
      200,
      true,
      updatedResponse,
    );
  }

  async updateStatus(
    id: string,
    updateComplaintDto: UpdateComplaintDto,
    user: object,
  ) {
    // find all the pending complaints of mechanic
    console.log('hi');
    const findServiceRequest = await this.serviceRequestModel.findOne({
      _id: id,
      status: ServiceRequestStatus.PENDING,
      authUserId: user['id'],
    });

    if (!findServiceRequest) {
      throw new NotFoundException('Service Request not found');
    }

    // update the status
    const updatedServiceRequest =
      await this.serviceRequestModel.findByIdAndUpdate(id, updateComplaintDto, {
        new: true,
      });

    return new ResponseHandler(
      'Service Request Updated Successfully',
      200,
      true,
      updatedServiceRequest,
    );
  }

  async findOne(id: string) {
    const findService = await this.serviceRequestModel.findById(id);

    if (!findService) throw new NotFoundException('Service Request Not Found');

    return new ResponseHandler('Service Request Found', 200, true, findService);
  }
}
