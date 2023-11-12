import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Artista } from '../common/entities/artist.entity';
import { PlaylistCreador } from 'src/common/entities/playlist_creador.entity';
import { Cancion } from 'src/common/entities/cancion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Artista, PlaylistCreador, Cancion])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
