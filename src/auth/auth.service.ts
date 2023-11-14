import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operadora } from '../common/entities/operadora.entity';
import { Telefono } from 'src/common/entities/telefono.entity';
import { Prefijo } from 'src/common/entities/prefijo.entity';
import { User } from 'src/common/entities/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { ValidateOperatorDto } from './dto/validate-operator.dto';
import { handleDBExceptions } from 'src/common/helpers/handleDBExceptions';
import { LoginDto } from './dto/login.dto';

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
        throw new NotFoundException(`Phone number: ${number} not found`);
      }

      return true;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async validateOperator(validateOperatorDto: ValidateOperatorDto) {
    try {
      //Ignorar si se ingresa el numero con 58424...
      let originalNumber: string;
      if (validateOperatorDto.number.startsWith('58')) {
        originalNumber = validateOperatorDto.number.slice(2);
      } else {
        //Si no contiene el 58 se deja el numero como estaba:
        originalNumber = validateOperatorDto.number;
      }

      const user = await this.findByNumber(originalNumber);
      //Verificar que existe el numero registrado en la app:
      if (user) {
        throw new BadRequestException(
          `User with number ${originalNumber} already exists `,
        );
      }
      //Si el numero no se encuentra registrado
      const prefixes = await this.findPrefixesById(
        validateOperatorDto.operadoraId,
      );

      const first3Digits = originalNumber.slice(0, 3);

      //Verificar que el numero ingresado coincida con las operadoras disponibles:
      const matchFound = prefixes.includes(first3Digits);

      if (!matchFound) {
        throw new NotFoundException(
          `The number ${originalNumber} does not exist in the selected operator, must be an ${prefixes}`,
        );
      }

      const phoneFound = await this.findPhoneInOperadora(
        originalNumber,
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
        throw new BadRequestException(
          `The number ${originalNumber} does not exist in the selected operator`,
        );
      }
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  //Servicio para verificar existencia de tlf antes de iniciar sesion:
  async loginByPhoneNumber(validateOperatorDto: LoginDto) {
    try {
      let originalNumber: string;
      if (validateOperatorDto.number.startsWith('58')) {
        originalNumber = validateOperatorDto.number.slice(2);
      } else {
        //Si no contiene el 58 se deja el numero como estaba:
        originalNumber = validateOperatorDto.number;
      }

      const user = await this.findByNumber(originalNumber);
      //Verificar que existe el numero registrado en la app:
      if (!user) {
        throw new NotFoundException(
          `User with number ${originalNumber} not found`,
        );
      }
      return {
        statusCode: 200,
        data: {
          message: 'Inicio de sesión exitoso, Bienvenido a SoundSpace :D',
          codigo_usuario: user.codigo_usuario,
        },
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
}
