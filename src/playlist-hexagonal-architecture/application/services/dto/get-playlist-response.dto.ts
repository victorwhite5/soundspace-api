
export interface IPlaylistResponseDto {
    id: string;
    name: string;
    image: string;
}

export interface IGetPlaylistResponseDto {
    playlists: IPlaylistResponseDto[];
}