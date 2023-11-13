import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operadora } from 'src/common/entities/operadora.entity';
import { Telefono } from 'src/common/entities/telefono.entity';
import { Prefijo } from 'src/common/entities/prefijo.entity';
import { User } from 'src/common/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Operadora)
    private operadoraRepository: Repository<Operadora>,
    @InjectRepository(Telefono)
    private telefonoRepository: Repository<Telefono>,
    @InjectRepository(Prefijo)
    private prefijoRepository: Repository<Prefijo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  //Obtener prefijos de una operadora:
  async findPrefixesById(id: string): Promise<string[]> {
    try {
      const prefijos = await this.prefijoRepository
        .createQueryBuilder('prefijo')
        .where('prefijo.operadora.codigo_operadora = :id', { id })
        .getMany();

      if (!prefijos || prefijos.length === 0) {
        throw new NotFoundException(
          `No se encontraron prefijos para fk_operadora ${id}`,
        );
      }

      const prefijosArray = prefijos.map((prefijo) => prefijo.prefijo);

      return prefijosArray;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al buscar los prefijos',
        error.message,
      );
    }
  }

  //Srvicio para verificar existencia de tlf antes de iniciar sesion:
  async loginByPhoneNumber(numero: string): Promise<string> {
    try {
      const usuario = await this.userRepository.findOne({
        where: { telefono: numero },
      });

      if (usuario) {
        return 'Inicio de sesión exitoso, Bienvenido a SoundSpace :D';
      } else {
        return 'Usuario no encontrado';
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al verificar el inicio de sesión',
        error.message,
      );
    }
  }
}
