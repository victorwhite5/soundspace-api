import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReproduccionPlaylistService } from './reproduccion_playlist.service';
import { CreateReproduccionPlaylistDto } from './dto/create-reproduccion_playlist.dto';
import { UpdateReproduccionPlaylistDto } from './dto/update-reproduccion_playlist.dto';

@Controller('reproduccion-playlist')
export class ReproduccionPlaylistController {
  constructor(private readonly reproduccionPlaylistService: ReproduccionPlaylistService) {}

  @Post()
  create(@Body() createReproduccionPlaylistDto: CreateReproduccionPlaylistDto) {
    return this.reproduccionPlaylistService.create(createReproduccionPlaylistDto);
  }

  @Get()
  findAll() {
    return this.reproduccionPlaylistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reproduccionPlaylistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReproduccionPlaylistDto: UpdateReproduccionPlaylistDto) {
    return this.reproduccionPlaylistService.update(+id, updateReproduccionPlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reproduccionPlaylistService.remove(+id);
  }
}
