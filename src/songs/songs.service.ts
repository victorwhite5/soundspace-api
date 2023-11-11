import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { getFile } from 'src/common/helpers/getBlobFile.helper';

@Injectable()
export class SongsService {
  create(createSongDto: CreateSongDto) {
    return 'This action adds a new song';
  }

  findAll() {
    return `This action returns all songs`;
  }

  async findOne(id: string) {
    try {
      const song = await getFile(id, process.env.IMAGES_CONTAINER);
      console.log(typeof song);
      
      return { song: song, name: 'Hola, aca viene el resto de la info' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
