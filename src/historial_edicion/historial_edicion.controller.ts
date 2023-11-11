import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialEdicionService } from './historial_edicion.service';
import { CreateHistorialEdicionDto } from './dto/create-historial_edicion.dto';
import { UpdateHistorialEdicionDto } from './dto/update-historial_edicion.dto';

@Controller('historial-edicion')
export class HistorialEdicionController {
  constructor(private readonly historialEdicionService: HistorialEdicionService) {}

  @Post()
  create(@Body() createHistorialEdicionDto: CreateHistorialEdicionDto) {
    return this.historialEdicionService.create(createHistorialEdicionDto);
  }

  @Get()
  findAll() {
    return this.historialEdicionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialEdicionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialEdicionDto: UpdateHistorialEdicionDto) {
    return this.historialEdicionService.update(+id, updateHistorialEdicionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialEdicionService.remove(+id);
  }
}
