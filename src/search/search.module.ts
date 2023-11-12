import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [CommonModule],
})
export class SearchModule {}
