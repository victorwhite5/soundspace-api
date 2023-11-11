import { Module } from '@nestjs/common';
import { ArtistasTrendingService } from './artistas_trending.service';
import { ArtistasTrendingController } from './artistas_trending.controller';

@Module({
  controllers: [ArtistasTrendingController],
  providers: [ArtistasTrendingService],
})
export class ArtistasTrendingModule {}
