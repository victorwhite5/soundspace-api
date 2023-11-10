import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService],
  imports: [CommonModule],
})
export class PlaylistModule {}
