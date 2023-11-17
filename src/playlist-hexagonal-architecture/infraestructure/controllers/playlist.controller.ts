import { Controller, Get, Inject, Query } from "@nestjs/common";

import {ITopPlaylistUseCaseService} from '../../application/services/interfaces/top-playlists-use-case.interface';
import { TopPlaylistDto } from "../dto/top-playlists.dto";
import { TopPlaylistsService } from "src/playlist-hexagonal-architecture/application/services/top-playlists.service";

@Controller('playlist-hexagonal')
export class PlaylistController {
    constructor(
       @Inject(TopPlaylistsService)
       private readonly topPlaylistUseCaseService: ITopPlaylistUseCaseService
    ){}

    @Get('top-playlist')
    async getTopPlaylist(@Query() topPlaylistDto: TopPlaylistDto):Promise<{}> {
        const {type = 'playlist'} = topPlaylistDto;
        const playlists = await this.topPlaylistUseCaseService.getTopPlaylist(type);
        
        return {
            statusCode: playlists.length > 0 ? 200 : 404,
            message: 'Top Playlist',
            data: playlists
        }
    }
}