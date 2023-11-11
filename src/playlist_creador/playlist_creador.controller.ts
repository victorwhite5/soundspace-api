import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistCreadorService } from './playlist_creador.service';
import { CreatePlaylistCreadorDto } from './dto/create-playlist_creador.dto';
import { UpdatePlaylistCreadorDto } from './dto/update-playlist_creador.dto';

@Controller('playlist-creador')
export class PlaylistCreadorController {
  constructor(private readonly playlistCreadorService: PlaylistCreadorService) {}

  @Post()
  create(@Body() createPlaylistCreadorDto: CreatePlaylistCreadorDto) {
    return this.playlistCreadorService.create(createPlaylistCreadorDto);
  }

  @Get()
  findAll() {
    return this.playlistCreadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistCreadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistCreadorDto: UpdatePlaylistCreadorDto) {
    return this.playlistCreadorService.update(+id, updatePlaylistCreadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistCreadorService.remove(+id);
  }
}
