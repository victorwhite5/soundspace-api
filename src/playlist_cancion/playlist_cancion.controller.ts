import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistCancionService } from './playlist_cancion.service';
import { CreatePlaylistCancionDto } from './dto/create-playlist_cancion.dto';
import { UpdatePlaylistCancionDto } from './dto/update-playlist_cancion.dto';

@Controller('playlist-cancion')
export class PlaylistCancionController {
  constructor(private readonly playlistCancionService: PlaylistCancionService) {}

  @Post()
  create(@Body() createPlaylistCancionDto: CreatePlaylistCancionDto) {
    return this.playlistCancionService.create(createPlaylistCancionDto);
  }

  @Get()
  findAll() {
    return this.playlistCancionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistCancionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistCancionDto: UpdatePlaylistCancionDto) {
    return this.playlistCancionService.update(+id, updatePlaylistCancionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistCancionService.remove(+id);
  }
}
