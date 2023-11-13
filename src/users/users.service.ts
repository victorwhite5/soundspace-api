import {
  NotFoundException,
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { handleDBExceptions } from 'src/common/helpers/handleDBExceptions';

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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
