import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps : true, collection : 'roles' })
export class Role {
    @Prop({ required : true })
    name : string;

    @Prop({ required : false })
    description : string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
