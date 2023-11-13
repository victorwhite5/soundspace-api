import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operadora } from '../common/entities/operadora.entity';
import { Telefono } from 'src/common/entities/telefono.entity';
import { Prefijo } from 'src/common/entities/prefijo.entity';
import { User } from 'src/common/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { ValidateOperator } from './dto/validate-operator.dto';
import { handleDBExceptions } from 'src/common/helpers/handleDBExceptions';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(Operadora)
    private operadoraRepository: Repository<Operadora>,

    @InjectRepository(Telefono)
    private readonly telefonoRepository: Repository<Telefono>,

    @InjectRepository(Prefijo)
    private readonly prefijoRepository: Repository<Prefijo>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
      handleDBExceptions(error, this.logger);
    }
  }

  async findByNumber(number: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          telefono: number,
        },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findPhoneInOperadora(number: string) {
    try {
      const telefono = await this.telefonoRepository.findOne({
        where: {
          numero: number,
        },
      });

      if (!telefono) {
        throw new BadRequestException(`Phone number: ${number} not found`);
      }

      return true;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async validateOperator(validateOperator: ValidateOperator) {
    const user = await this.findByNumber(validateOperator.number);
    //Verificar que existe el numero registrado en la app:
    if (user) {
      return new BadRequestException(
        `User with number ${validateOperator.number} already exists `,
      );
    } else {
      //Si el numero no se encuentra registrado
      const prefixes = await this.findPrefixesById(
        validateOperator.operadoraId,
      );

      //Ignorar si se ingresa el numero con 58424...
      let originalNumber: string;
      if (validateOperator.number.startsWith('58')) {
        originalNumber = validateOperator.number.slice(2);
      } else {
        //Si no contiene el 58 se deja el numero como estaba:
        originalNumber = validateOperator.number;
      }

      const first3Digits = originalNumber.slice(0, 3);

      //Verificar que el numero ingresado coincida con las operadoras disponibles:
      const matchFound = prefixes.includes(first3Digits);

      if (!matchFound) {
        throw new NotFoundException(
          'El número ingresado no coincide con las operadoras disponibles',
        );
      }

      const phoneFound = await this.findPhoneInOperadora(
        validateOperator.number,
      );

      if (matchFound && phoneFound) {
        const nuevoUsuario = this.userRepository.create({
          telefono: originalNumber,
        });

        //Insert en tabla "user":
        const savedUser = await this.userRepository.save(nuevoUsuario);

        // Todo Fino:
        return {
          statusCode: 200,
          message: 'Bienvenido a la aplicación SoundSpace :)',
          codigo_usuario: savedUser.codigo_usuario,
        };
      } else {
        //Se seleccionó una operadora pero con un numero que no concuerda
        return 'Su numero no concuerda con la operadora seleccionada';
      }
    }
  }

  //Servicio para verificar existencia de tlf antes de iniciar sesion:
  async loginByPhoneNumber(validateOperator: ValidateOperator) {
    const user = await this.findByNumber(validateOperator.number);
    //Verificar que existe el numero registrado en la app:
    if (user) {
      return {
        statusCode: 200,
        message: 'Inicio de sesión exitoso, Bienvenido a SoundSpace :D',
        codigo_usuario: user.codigo_usuario,
      };
    } else {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
