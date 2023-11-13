import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseUUIDPipe, Headers, BadRequestException } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { HeaderDto } from './dto/header-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res, @Headers() headerDto: HeaderDto) {
    const song = await this.songsService.findOne(id, headerDto);
    return song.pipe(res);
  }

  @Get('link/:id')
  async findLink(@Param('id', ParseUUIDPipe) id: string,  @Headers() headerDto: HeaderDto) {
    if(!headerDto.user){
      throw new BadRequestException('An user is required for this request');
    }
      
    return await this.songsService.findLink(id, headerDto);
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }
}
