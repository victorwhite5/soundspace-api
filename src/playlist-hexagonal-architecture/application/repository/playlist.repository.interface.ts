// import { Playlist } from "src/common/entities/playlist.entity";

import { IPlaylistResponseDto } from "../services/dto/get-playlist-response.dto";

export interface IPlaylistRepository{
    // getTopPlaylist(tipo: string): Promise<Playlist[]>;
    getTopPlaylist(tipo: string): Promise<IPlaylistResponseDto[]>;

}