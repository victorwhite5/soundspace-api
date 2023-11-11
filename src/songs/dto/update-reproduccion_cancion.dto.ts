import { PartialType } from '@nestjs/mapped-types';
import { CreateReproduccionCancionDto } from './create-reproduccion_cancion.dto';

export class UpdateReproduccionCancionDto extends PartialType(CreateReproduccionCancionDto) {}
