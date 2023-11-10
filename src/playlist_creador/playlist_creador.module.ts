import { Module } from '@nestjs/common';
import { PlaylistCreadorService } from './playlist_creador.service';
import { PlaylistCreadorController } from './playlist_creador.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PlaylistCreadorController],
  providers: [PlaylistCreadorService],
  imports: [CommonModule],
})
export class PlaylistCreadorModule {}
