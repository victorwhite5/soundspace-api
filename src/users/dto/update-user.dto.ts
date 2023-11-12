import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import { genderOptions } from 'src/common/entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString({ message: 'The \"nombre\" attribute must be of type \"string\"' })
    @IsOptional()
    nombre?: string;

    @IsString({ message: 'The \"correo\" attribute must be of type \"string\"' })
    @IsOptional()
    correo?: string;

    @IsDate({ message: 'The \"fecha_nac\" attribute must be of type \"Date\"' })
    @IsOptional()
    fecha_nac?: Date;

    @IsString({ message: 'The \"genero\" attribute must be of type \"string\"' })
    @IsOptional()
    @IsIn([genderOptions.Male, genderOptions.Female,
    genderOptions.Polygender, genderOptions.Nonbinary,
    genderOptions.Agender, genderOptions.Genderfluid,
    genderOptions.Nodisplay, genderOptions.Other],
        { message: 'The \"genero\" attribute must be one of the following: Male, Female, Polygender, Nonbinary, Agender, Genderfluid, Other, Nodisplay' })
    genero?: string;
}
