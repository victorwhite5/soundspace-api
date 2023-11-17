import { IsIn, IsOptional } from "class-validator";

export class TopPlaylistDto {
    @IsOptional()
    @IsIn(['playlist', 'album'])
    type?: string;
}