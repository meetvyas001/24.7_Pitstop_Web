import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ServiceType } from "../enums/serviceType.enum";
import { HydratedDocument } from "mongoose";
import { VehicleType } from "src/service-request/enums/vehicle.enum";

export type ServiceDocument = HydratedDocument<Service>

@Schema({ timestamps : true, collection: 'services' })
export class Service {
    @Prop({ required : true, type : String, max : 100, unique : true })
    title : string;

    @Prop({ required : true, type : String, max : 500})
    description : string;

    @Prop({ required : true, type : Number, default : 0 })
    price : number;

    @Prop({ required : true, type : String})
    imageUrl : string
   
    @Prop({ default: () => new Date().toISOString(), type: Date, transform: (v) => v.toISOString() })
    createdAt: Date;

    @Prop({ default: () => new Date().toISOString(), type: Date, transform: (v) => v.toISOString() })
    updatedAt: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);