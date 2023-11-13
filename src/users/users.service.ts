import {
  NotFoundException,
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { handleDBExceptions } from '../common/helpers/handleDBExceptions';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByNumber(number: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          telefono: number,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with number: ${number} not found`);
      }

      return user;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findById(codigo_usuario: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          codigo_usuario,
        },
      });
      if (!user) {
        throw new NotFoundException(
          `User with id: ${codigo_usuario} not found`,
        );
      }

      return {
        statusCode: 200,
        data: {
          name: user.nombre,
          email: user.correo,
          fecha_nac: user.fecha_nac,
          genero: user.genero,
        },
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


  async updateUserProfile(id: string, userProfile: UpdateUserDto) {
    try {

      const {telefono, ...toUpdate} = userProfile;
      const userFound = await this.usersRepository.findOne({
        where: { codigo_usuario: id },
      });

      if (!userFound) {
        throw new NotFoundException(`User with id: ${id} not found`);
      }

      const updatedUserProfile = Object.assign(userFound, toUpdate);

      await this.usersRepository.save(updatedUserProfile);

      return {
        statusCode: 200,
        data: `User with id: ${id} updated successfully`,
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
