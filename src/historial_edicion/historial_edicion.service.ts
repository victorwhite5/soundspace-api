import { Injectable } from '@nestjs/common';
import { CreateHistorialEdicionDto } from './dto/create-historial_edicion.dto';
import { UpdateHistorialEdicionDto } from './dto/update-historial_edicion.dto';

@Injectable()
export class HistorialEdicionService {
  create(createHistorialEdicionDto: CreateHistorialEdicionDto) {
    return 'This action adds a new historialEdicion';
  }

  findAll() {
    return `This action returns all historialEdicion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialEdicion`;
  }

  update(id: number, updateHistorialEdicionDto: UpdateHistorialEdicionDto) {
    return `This action updates a #${id} historialEdicion`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialEdicion`;
  }
}
