import { Injectable } from '@nestjs/common';
import { CreateArtistasTrendingDto } from './dto/create-artistas_trending.dto';
import { UpdateArtistasTrendingDto } from './dto/update-artistas_trending.dto';

@Injectable()
export class ArtistasTrendingService {
  create(createArtistasTrendingDto: CreateArtistasTrendingDto) {
    return 'This action adds a new artistasTrending';
  }

  findAll() {
    return `This action returns all artistasTrending`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artistasTrending`;
  }

  update(id: number, updateArtistasTrendingDto: UpdateArtistasTrendingDto) {
    return `This action updates a #${id} artistasTrending`;
  }

  remove(id: number) {
    return `This action removes a #${id} artistasTrending`;
  }
}
