import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistTrendingService } from './playlist_trending.service';
import { CreatePlaylistTrendingDto } from './dto/create-playlist_trending.dto';
import { UpdatePlaylistTrendingDto } from './dto/update-playlist_trending.dto';

@Controller('playlist-trending')
export class PlaylistTrendingController {
  constructor(private readonly playlistTrendingService: PlaylistTrendingService) {}

  @Post()
  create(@Body() createPlaylistTrendingDto: CreatePlaylistTrendingDto) {
    return this.playlistTrendingService.create(createPlaylistTrendingDto);
  }

  @Get()
  findAll() {
    return this.playlistTrendingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistTrendingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistTrendingDto: UpdatePlaylistTrendingDto) {
    return this.playlistTrendingService.update(+id, updatePlaylistTrendingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistTrendingService.remove(+id);
  }
}
