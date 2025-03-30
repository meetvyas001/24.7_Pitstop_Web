import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;
@Schema({
    timestamps: true,
    collection: 'users'
})
export class User {
    @Prop({ required: true, })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select : false })
    password: string;

    @Prop({ required: false, default: null })
    lat: number;

    @Prop({ required: false, default: null })
    lng: number;

    @Prop({ required : false, default : null})
    address : string

    @Prop({ required: false, default: null })
    refreshToken: string;
}


export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('service_requests', {
    ref: 'ServiceRequest', 
    localField: '_id',     
    foreignField: 'userId', 
});