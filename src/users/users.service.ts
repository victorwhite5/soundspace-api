import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../common/entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);

      return user;

    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateUserProfile(uuid: string, userProfile: UpdateUserDto) {

    const userFound = await this.usersRepository.findOne({
      where: { codigo_usuario: uuid }
    });

    if (!userFound) {
      return new HttpException('User by id: ' + uuid +
        ' can\'t be updated because it wasn\'t found',
        HttpStatus.NOT_FOUND);
    }

    const updatedUserProfile = Object.assign(userFound, userProfile);
    return this.usersRepository.save(updatedUserProfile);

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
