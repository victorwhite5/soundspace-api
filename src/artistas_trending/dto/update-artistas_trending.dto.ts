import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistasTrendingDto } from './create-artistas_trending.dto';

export class UpdateArtistasTrendingDto extends PartialType(CreateArtistasTrendingDto) {}
