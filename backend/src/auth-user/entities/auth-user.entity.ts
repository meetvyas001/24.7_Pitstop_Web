import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { VerificationStatus } from "../enums/verification.enum";
import mongoose, { HydratedDocument } from "mongoose";
import { Roles } from "src/role/enums/roles.enum";

export type AuthUserDocument = HydratedDocument<AuthUser>;
@Schema({ timestamps : true, collection : 'auth_users' })
export class AuthUser {
    @Prop({ required : true, maxlength : 50, type : String})
    firstName : string;

    @Prop({ required : true, maxlength : 50, type : String})
    lastName : string;

    @Prop({ required : true, unique : true })
    email : string;

    @Prop({ required : true })
    contactNumber : string;

    @Prop({ required : true, select : false })
    password : string;

    @Prop({ required : false, default : null})
    dateOfBirth : Date;

    @Prop({ required : false, default : null})
    lat : number;

    @Prop({ required : false, default : null})
    lng : number;

    @Prop({ required : false, default : null})
    shopName : string;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: false,
            default: null
        }
    })
    location: {
        type: string;
        coordinates: number[];
    };

    @Prop({ required : false, default : null})
    refreshToken : string;

    @Prop({ required : false })
    yearsOfExperience : number;

    @Prop({ required : false, maxlength : 5, type : [String]})
    expertise : string[];

    @Prop({ required: false })
    mechanicLicense?: string; // upload mechanic license

    @Prop({ type: [String], required: false })
    certifications?: string[]; // Names or URLs of certifications

    @Prop({ default : VerificationStatus.PENDING, enum : VerificationStatus, required : false})
    verificationStatus : VerificationStatus;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
    role: mongoose.Schema.Types.ObjectId;

}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);

AuthUserSchema.index({ location: '2dsphere' });

