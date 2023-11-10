import { Injectable } from '@nestjs/common';
import { CreateReproduccionPlaylistDto } from './dto/create-reproduccion_playlist.dto';
import { UpdateReproduccionPlaylistDto } from './dto/update-reproduccion_playlist.dto';

@Injectable()
export class ReproduccionPlaylistService {
  create(createReproduccionPlaylistDto: CreateReproduccionPlaylistDto) {
    return 'This action adds a new reproduccionPlaylist';
  }

  findAll() {
    return `This action returns all reproduccionPlaylist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reproduccionPlaylist`;
  }

  update(id: number, updateReproduccionPlaylistDto: UpdateReproduccionPlaylistDto) {
    return `This action updates a #${id} reproduccionPlaylist`;
  }

  remove(id: number) {
    return `This action removes a #${id} reproduccionPlaylist`;
  }
}
