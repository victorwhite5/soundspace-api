import { Injectable } from '@nestjs/common';
import { CreateReproduccionCancionDto } from './dto/create-reproduccion_cancion.dto';
import { UpdateReproduccionCancionDto } from './dto/update-reproduccion_cancion.dto';

@Injectable()
export class ReproduccionCancionService {
  create(createReproduccionCancionDto: CreateReproduccionCancionDto) {
    return 'This action adds a new reproduccionCancion';
  }

  findAll() {
    return `This action returns all reproduccionCancion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reproduccionCancion`;
  }

  update(id: number, updateReproduccionCancionDto: UpdateReproduccionCancionDto) {
    return `This action updates a #${id} reproduccionCancion`;
  }

  remove(id: number) {
    return `This action removes a #${id} reproduccionCancion`;
  }
}
