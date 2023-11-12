import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Artist } from './entities/artist.entity';
import { PlaylistCreador } from 'src/common/entities/playlist_creador.entity';
import { Cancion } from 'src/common/entities/cancion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, PlaylistCreador, Cancion])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
