import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateOperator } from './dto/validate-operator.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
   
  ) {}

  

  //Obtener prefijos de una operadora:
  @Post('getPrefijos')
  async getPrefijos(@Body() jsonData: { id: string }): Promise<string[]> {
    return this.authService.findPrefixesById(jsonData.id);
  }

  //Endpoint para Verificar numero ingresado segun operadora y registro de usuario
  @Post('validate_operator')
  validarOperadora( @Body() validateOperator: ValidateOperator){
    return this.authService.validateOperator(validateOperator);
    // try {
    //   const prefijos = await this.authService.findPrefixesById(data.uuid);

    //   //Ignorar si se ingresa el numero con 58424...
    //   let numeroSin58: string;
    //   if (data.numero.startsWith('58')) {
    //     numeroSin58 = data.numero.slice(2);
    //   } else {
    //     //Si no contiene el 58 se deja el numero como estaba:
    //     numeroSin58 = data.numero;
    //   }

    //   const primerosCuatroDigitos = numeroSin58.slice(0, 3);

    //   const coincidenciaEncontrada = prefijos.includes(primerosCuatroDigitos);

    //   if (coincidenciaEncontrada) {
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

  //Método para iniciar sesión por número de teléfono
  @Post('login')
  async login(@Body() data: { telefono: string }): Promise<string> {
    try {
      const respuesta = await this.authService.loginByPhoneNumber(
        data.telefono,
      );
      return respuesta;
    } catch (error) {
      console.error('Error', error.message);
      return 'Error al verificar el inicio de sesión';
    }
  }
}
