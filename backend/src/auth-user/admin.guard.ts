import { CanActivate, ExecutionContext } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Observable } from "rxjs";
import { AuthUser } from "./entities/auth-user.entity";
import { Model } from "mongoose";
import { Roles } from "src/role/enums/roles.enum";

export class AdminGuard implements CanActivate {
    constructor(@InjectModel(AuthUser.name) private authUserModel: Model<AuthUser>) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const findRole = await this.authUserModel.findOne({
            _id: user.id
        }).populate('role');

        if(findRole?.role?.['name'] == Roles.ADMIN) {
            return true;
        }

        return false;
    }
}