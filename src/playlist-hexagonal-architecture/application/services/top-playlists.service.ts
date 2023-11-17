import { Inject, Injectable } from '@nestjs/common';
import { ITopPlaylistUseCaseService } from './interfaces/top-playlists-use-case.interface';
import { IPlaylistResponseDto } from './dto/get-playlist-response.dto';
import { IPlaylistRepository } from '../repository/playlist.repository.interface';
import { OrmPlaylistRepository } from 'src/playlist-hexagonal-architecture/infraestructure/repository/orm-playlist.repository';

@Injectable()
export class TopPlaylistsService implements ITopPlaylistUseCaseService {
  constructor(
    @Inject(OrmPlaylistRepository)
    private readonly playlistRepository: IPlaylistRepository,
  ) {}

  async getTopPlaylist(type: string): Promise<IPlaylistResponseDto[]> {
    try {
      const playlist = await this.playlistRepository.getTopPlaylist(type);

      return playlist;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
