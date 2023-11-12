
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class QuerySearchDto extends PartialType(PaginationDto) {

    @IsOptional()
    @Type(() => String)
    @IsIn(['artista', 'cancion'])
    type?: string
}