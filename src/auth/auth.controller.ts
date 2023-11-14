import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateOperatorDto } from './dto/validate-operator.dto';
import { LoginDto } from './dto/login.dto';

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
  validarOperadora(@Body() validateOperatorDto: ValidateOperatorDto) {
    return this.authService.validateOperator(validateOperatorDto);
  }

  @Post('find-by-number')
  async findByNumber(@Body('number') number: string) {
    return this.authService.findByNumber(number);
  }

  //Método para iniciar sesión por número de teléfono
  //Método para iniciar sesión por número de teléfono
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginByPhoneNumber(loginDto);
  }
}
