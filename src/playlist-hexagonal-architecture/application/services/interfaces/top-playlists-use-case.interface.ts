import { IPlaylistResponseDto } from "../dto/get-playlist-response.dto";


export interface ITopPlaylistUseCaseService{
    getTopPlaylist(type: string): Promise<IPlaylistResponseDto[]>;
}