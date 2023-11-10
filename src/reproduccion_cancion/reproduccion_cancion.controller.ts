import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReproduccionCancionService } from './reproduccion_cancion.service';
import { CreateReproduccionCancionDto } from './dto/create-reproduccion_cancion.dto';
import { UpdateReproduccionCancionDto } from './dto/update-reproduccion_cancion.dto';

@Controller('reproduccion-cancion')
export class ReproduccionCancionController {
  constructor(private readonly reproduccionCancionService: ReproduccionCancionService) {}

  @Post()
  create(@Body() createReproduccionCancionDto: CreateReproduccionCancionDto) {
    return this.reproduccionCancionService.create(createReproduccionCancionDto);
  }

  @Get()
  findAll() {
    return this.reproduccionCancionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reproduccionCancionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReproduccionCancionDto: UpdateReproduccionCancionDto) {
    return this.reproduccionCancionService.update(+id, updateReproduccionCancionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reproduccionCancionService.remove(+id);
  }
}
