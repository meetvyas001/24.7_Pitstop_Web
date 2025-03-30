import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { VehicleType } from "../enums/vehicle.enum";
import mongoose, { HydratedDocument } from "mongoose";
import { ServiceRequestStatus } from "../enums/status.enum";

export type ServiceRequestDocument = HydratedDocument<ServiceRequest>;

@Schema({ timestamps : true, collection : 'service_requests' })
export class ServiceRequest {

    @Prop({ required : false, maxlength : 500, type : String })
    description : string;

    @Prop({ required : true })
    vechileType : string[]

    @Prop({ required : false, type : String})
    vehicleImageUrl : string;

    @Prop({ required : true })
    lat : number;

    @Prop({ required : true })
    lng : number;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    })
    location: {
        type: string;
        coordinates: number[];
    };

    @Prop({ required : true, enum : ServiceRequestStatus, default : ServiceRequestStatus.PENDING })
    status : ServiceRequestStatus;

    @Prop({ type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true })
    userId : mongoose.Schema.Types.ObjectId;

    @Prop({ type : mongoose.Schema.Types.ObjectId, ref : 'AuthUser', required : true })
    authUserId : mongoose.Schema.Types.ObjectId;

    @Prop({ type : mongoose.Schema.Types.ObjectId, ref : 'Service', required : true})
    serviceId : mongoose.Schema.Types.ObjectId

}

export const ServiceRequestSchema = SchemaFactory.createForClass(ServiceRequest);

ServiceRequestSchema.index({ location: '2dsphere' });