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
      })

      if(!user) {
        throw new NotFoundException(`User with number: ${number} not found`)
      }

      return user;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async validateOperator(validateOperator: ValidateOperator) {
    // try {
    //   const prefijos = await this.findPrefixesById(
    //     validateOperator.operadoraId,
    //   );

    //   //Ignorar si se ingresa el numero con 58424...
    //   let numeroSin58: string;
    //   if (validateOperator.number.startsWith('58')) {
    //     numeroSin58 = validateOperator.number.slice(2);
    //   } else {
    //     //Si no contiene el 58 se deja el numero como estaba:
    //     numeroSin58 = validateOperator.number;
    //   }

    //   const primerosTresDigitos = numeroSin58.slice(0, 3);

    //   const coincidenciaEncontrada = prefijos.includes(primerosTresDigitos);

    //   if (coincidenciaEncontrada) {

    //     const user = await this.findByNumber(validateOperator.number);

    //     if (user) {
    //       return new BadRequestException(`User with number ${validateOperator.number} already exists `);
    //     }

    //     const nuevoTelefono = this.telefonoRepository.create({
    //       numero: numeroSin58,
    //       operadora: { codigo_operadora: data.uuid },
    //     });

    //     //Insert en tabla telefono:
    //     await this.telefonoRepository.save(nuevoTelefono);

    //     const nuevoUsuario = this.userRepository.create({
    //       telefono: numeroSin58,
    //     });

    //     //Insert en tabla "user":
    //     await this.userRepository.save(nuevoUsuario);

    //     // Todo Fino:
    //     return 'Bienvenido a la aplicación SoundSpace :)';
    //   } else {
    //     //Se seleccionó una operadora pero con un numero que no concuerda
    //     return 'Su numero no concuerda con la operadora seleccionada';
    //   }
    //   //Ojo Pelao:
    // } catch (error) {
    //   console.error('Error', error.message);
    //   return 'Error al comparar prefijos';
    // }
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
