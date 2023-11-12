import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [CommonModule],
})
export class ArtistsModule {}
