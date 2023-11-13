import { Type } from 'class-transformer';
import { IsString, IsUUID, MinLength, IsOptional } from 'class-validator';

export class ValidateOperator {
  @IsString()
  @MinLength(3)
  @Type(() => String)
  number: string;

  @IsOptional()
  @IsUUID()
  @Type(() => String)
  operadoraId: string;
}
