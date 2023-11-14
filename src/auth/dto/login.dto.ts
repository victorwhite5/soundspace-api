import { Type } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(10)
  @MaxLength(12)
  @Type(() => String)
  number: string;
}
