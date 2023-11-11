import { Injectable } from '@nestjs/common';
import { CreatePlaylistCreadorDto } from './dto/create-playlist_creador.dto';
import { UpdatePlaylistCreadorDto } from './dto/update-playlist_creador.dto';

@Injectable()
export class PlaylistCreadorService {
  create(createPlaylistCreadorDto: CreatePlaylistCreadorDto) {
    return 'This action adds a new playlistCreador';
  }

  findAll() {
    return `This action returns all playlistCreador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlistCreador`;
  }

  update(id: number, updatePlaylistCreadorDto: UpdatePlaylistCreadorDto) {
    return `This action updates a #${id} playlistCreador`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlistCreador`;
  }
}
