import { PartialType } from '@nestjs/mapped-types';
import { CreateCancionDto } from './create-cancion.dto';

export class UpdateCancionDto extends PartialType(CreateCancionDto) {}
