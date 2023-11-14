import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { LoginDto } from './login.dto';

export class ValidateOperatorDto extends LoginDto{

  @IsUUID()
  @Type(() => String)
  operadoraId: string;
}
