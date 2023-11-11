import { PartialType } from '@nestjs/mapped-types';
import { CreateReproduccionPlaylistDto } from './create-reproduccion_playlist.dto';

export class UpdateReproduccionPlaylistDto extends PartialType(CreateReproduccionPlaylistDto) {}
