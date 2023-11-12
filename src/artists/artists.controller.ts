import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  // Método para crear un nuevo artista
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  // Método para obtener todos los artistas
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  // Método para obtener un artista por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(id);
  }

  // Método para actualizar un artista por su ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(id, updateArtistDto);
  }

  // Método para eliminar un artista por su ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.remove(id);
  }

  // Método para obtener los álbumes de un artista por su ID
  @Get('albums/:artistId')
  getAlbums(@Param('artistId') artistId: string) {
    return this.artistsService.getAlbums(artistId);
  }

  // Método para obtener las canciones de un artista por su ID
  @Get('songs/:artistId')
  getSongs(@Param('artistId') artistId: string) {
    return this.artistsService.getSongs(artistId);
  }
}