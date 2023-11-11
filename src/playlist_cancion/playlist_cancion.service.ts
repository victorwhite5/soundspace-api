import { Injectable } from '@nestjs/common';
import { CreatePlaylistCancionDto } from './dto/create-playlist_cancion.dto';
import { UpdatePlaylistCancionDto } from './dto/update-playlist_cancion.dto';

@Injectable()
export class PlaylistCancionService {
  create(createPlaylistCancionDto: CreatePlaylistCancionDto) {
    return 'This action adds a new playlistCancion';
  }

  findAll() {
    return `This action returns all playlistCancion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlistCancion`;
  }

  update(id: number, updatePlaylistCancionDto: UpdatePlaylistCancionDto) {
    return `This action updates a #${id} playlistCancion`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlistCancion`;
  }
}
