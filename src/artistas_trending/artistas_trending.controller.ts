import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistasTrendingService } from './artistas_trending.service';
import { CreateArtistasTrendingDto } from './dto/create-artistas_trending.dto';
import { UpdateArtistasTrendingDto } from './dto/update-artistas_trending.dto';

@Controller('artistas-trending')
export class ArtistasTrendingController {
  constructor(private readonly artistasTrendingService: ArtistasTrendingService) {}

  @Post()
  create(@Body() createArtistasTrendingDto: CreateArtistasTrendingDto) {
    return this.artistasTrendingService.create(createArtistasTrendingDto);
  }

  @Get()
  findAll() {
    return this.artistasTrendingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistasTrendingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistasTrendingDto: UpdateArtistasTrendingDto) {
    return this.artistasTrendingService.update(+id, updateArtistasTrendingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistasTrendingService.remove(+id);
  }
}
