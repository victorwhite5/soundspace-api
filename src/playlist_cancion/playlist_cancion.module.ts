import { Module } from '@nestjs/common';
import { PlaylistCancionService } from './playlist_cancion.service';
import { PlaylistCancionController } from './playlist_cancion.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PlaylistCancionController],
  providers: [PlaylistCancionService],
  imports: [CommonModule],
})
export class PlaylistCancionModule {}
