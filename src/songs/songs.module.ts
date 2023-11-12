import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SongsController],
  providers: [SongsService],
  imports: [CommonModule],
})
export class SongsModule {}
