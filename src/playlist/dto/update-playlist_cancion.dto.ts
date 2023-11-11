import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistCancionDto } from './create-playlist_cancion.dto';

export class UpdatePlaylistCancionDto extends PartialType(CreatePlaylistCancionDto) {}
