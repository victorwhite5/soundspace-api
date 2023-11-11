import { Module } from '@nestjs/common';
import { PlaylistTrendingService } from './playlist_trending.service';
import { PlaylistTrendingController } from './playlist_trending.controller';

@Module({
  controllers: [PlaylistTrendingController],
  providers: [PlaylistTrendingService],
})
export class PlaylistTrendingModule {}
