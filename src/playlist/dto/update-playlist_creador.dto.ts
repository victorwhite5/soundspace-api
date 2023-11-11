import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistCreadorDto } from './create-playlist_creador.dto';

export class UpdatePlaylistCreadorDto extends PartialType(CreatePlaylistCreadorDto) {}
