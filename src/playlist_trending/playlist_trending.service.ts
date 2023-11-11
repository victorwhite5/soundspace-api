import { Injectable } from '@nestjs/common';
import { CreatePlaylistTrendingDto } from './dto/create-playlist_trending.dto';
import { UpdatePlaylistTrendingDto } from './dto/update-playlist_trending.dto';

@Injectable()
export class PlaylistTrendingService {
  create(createPlaylistTrendingDto: CreatePlaylistTrendingDto) {
    return 'This action adds a new playlistTrending';
  }

  findAll() {
    return `This action returns all playlistTrending`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlistTrending`;
  }

  update(id: number, updatePlaylistTrendingDto: UpdatePlaylistTrendingDto) {
    return `This action updates a #${id} playlistTrending`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlistTrending`;
  }
}
