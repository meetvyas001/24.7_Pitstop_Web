import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/role/enums/roles.enum";
export const RolesKey = 'roles';
export const VerifyRoles = (...rolesName : Roles[]) => SetMetadata(RolesKey, rolesName);