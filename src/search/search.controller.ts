import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { QuerySearchDto } from './dto/querySearch.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':term')
  findFew(@Param('term') term: string, @Query() querySearchDto: QuerySearchDto) {
    return this.searchService.findFew(term, querySearchDto);
  }
}
