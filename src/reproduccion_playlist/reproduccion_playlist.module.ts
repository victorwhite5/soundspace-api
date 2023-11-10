import { Module } from '@nestjs/common';
import { ReproduccionPlaylistService } from './reproduccion_playlist.service';
import { ReproduccionPlaylistController } from './reproduccion_playlist.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ReproduccionPlaylistController],
  providers: [ReproduccionPlaylistService],
  imports: [CommonModule],
})
export class ReproduccionPlaylistModule {}
