import {
  IsDate,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { genderOptions } from 'src/common/entities/user.entity';

export class CreateUserDto {
  @IsString({ message: 'The "nombre" attribute must be of type "string"' })
  @IsOptional()
  @MinLength(3)
  nombre?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsDate({ message: 'The "fecha_nac" attribute must be of type "Date"' })
  @IsOptional()
  fecha_nac?: Date;

  @IsString({ message: 'The "genero" attribute must be of type "string"' })
  @IsOptional()
  @IsIn(
    [
      genderOptions.Male,
      genderOptions.Female,
      genderOptions.Polygender,
      genderOptions.Nonbinary,
      genderOptions.Agender,
      genderOptions.Genderfluid,
      genderOptions.Nodisplay,
      genderOptions.Other,
    ],
    {
      message:
        'The "genero" attribute must be one of the following: Male, Female, Polygender, Nonbinary, Agender, Genderfluid, Other, Nodisplay',
    },
  )
  genero?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  telefono: string;
}
