import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistTrendingDto } from './create-playlist_trending.dto';

export class UpdatePlaylistTrendingDto extends PartialType(CreatePlaylistTrendingDto) {}
