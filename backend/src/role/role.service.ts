import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';
import { Model } from 'mongoose';
import { ResponseHandler } from 'src/common/helpers/responseHandler';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) { }
  async create(createRoleDto: CreateRoleDto) {
    // check role of same name or not
    const checkName = await this.roleModel.findOne({
      name: createRoleDto.name
    })

    if(checkName) throw new ConflictException('Role already exists with this name');

    const newRole = new this.roleModel(createRoleDto);
    await newRole.save();

    return new ResponseHandler('Role created successfully', 200, true, newRole);
  }

  async findAll() {
    const getAllRoles = await this.roleModel.find(); 
    
    if(getAllRoles.length == 0) {
      throw new NotFoundException('No roles found');
    }

    return new ResponseHandler('Roles found', 200, true, getAllRoles);
    
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
