import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { IsIn, IsOptional } from 'class-validator';

export class PlaylistPaginationDto extends PartialType(PaginationDto) {
    @IsOptional()
    @IsIn(['playlist', 'album'])
    type?: string;
}