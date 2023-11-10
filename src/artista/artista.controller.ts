import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';

@Controller('artista')
export class ArtistaController {
  constructor(private readonly artistaService: ArtistaService) {}

  @Post()
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistaService.create(createArtistaDto);
  }

  @Get()
  findAll() {
    return this.artistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistaDto: UpdateArtistaDto) {
    return this.artistaService.update(+id, updateArtistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistaService.remove(+id);
  }
}
