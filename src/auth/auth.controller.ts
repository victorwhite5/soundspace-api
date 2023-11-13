import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateOperator } from './dto/validate-operator.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Obtener prefijos de una operadora:
  @Post('getPrefijos')
  async getPrefijos(@Body() jsonData: { id: string }): Promise<string[]> {
    return this.authService.findPrefixesById(jsonData.id);
  }

  //Endpoint para Verificar numero ingresado segun operadora y registro de usuario
  @Post('validate_operator')
  validarOperadora(@Body() validateOperator: ValidateOperator) {
    return this.authService.validateOperator(validateOperator);
  }

  @Post('find-by-number')
  async findByNumber(@Body('number') number: string) {
    return this.authService.findByNumber(number);
  }

  //Método para iniciar sesión por número de teléfono
  //Método para iniciar sesión por número de teléfono
  @Post('login')
  async login(@Body() validateOperator: ValidateOperator) {
    return this.authService.loginByPhoneNumber(validateOperator);
  }
}
