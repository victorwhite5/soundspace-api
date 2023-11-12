import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistPaginationDto } from './dto/pagination-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistTrending } from 'src/common/entities/playlist_trending.entity';
import { Playlist } from 'src/common/entities/playlist.entity';
import { Repository } from 'typeorm';
import { convertSeconds } from 'src/common/helpers/convertSeconds.helper';

@Injectable()
export class PlaylistService {
  private readonly logger = new Logger('PlaylistService');

  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,

    @InjectRepository(PlaylistTrending)
    private readonly playlistTrendingRepository: Repository<PlaylistTrending>,
  ) {}

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    
    if (error.code === '23505') {
      throw new BadRequestException(`Product already exists ${error.detail}`);
    }
    
    if (error.status === 500) {
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }

    if (error.status === 400) {
      throw new BadRequestException(
        error.response.message || 'Unexpected error, check server logs',
      );
    }
    
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  create(createPlaylistDto: CreatePlaylistDto) {
    return 'This action adds a new playlist';
  }

  findAll() {
    return `This action returns all playlist`;
  }

  async findOne(id: string) {
    try {
      const playlist = await this.playlistRepository
        .createQueryBuilder('p')
        .select(['p.nombre', 'p.referencia_imagen', 'p.tipo'])
        .leftJoinAndSelect('p.creadores', 'pc')
        .addSelect('artists.nombre_artista')
        .leftJoin('pc.artista', 'artists')
        .leftJoinAndSelect('p.canciones', 'ps')
        .addSelect([
          'songs.codigo_cancion',
          'songs.nombre_cancion',
          'songs.duracion',
        ])
        .leftJoin('ps.cancion', 'songs')
        .where('p.codigo_playlist = :id', { id })
        .getOne();
      
      if(!playlist){
        throw new BadRequestException(`Playlist/Album with id: ${id} not found`);
      }  

      let duracion: number = 0;
      playlist.canciones.forEach((c) => (duracion += c.cancion.duracion));

      return {
        statusCode: 200,
        playlist: {
          ...playlist,
          creadores: playlist.creadores.map((c) => c.artista),
          canciones: playlist.canciones.map((c) => {
            const obj = {
              codigo_cancion: c.cancion.codigo_cancion,
              nombre_cancion: c.cancion.nombre_cancion,
              duracion: convertSeconds(c.cancion.duracion),
            };
            return obj;
          }),
          duracion: convertSeconds(duracion),
        },
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }

  async findTopPlaylists(paginationDto: PlaylistPaginationDto) {
    const { type = 'playlist' } = paginationDto;

    try {
      const playlist = await this.playlistRepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.trending', 'pt')
        .where('LOWER (p.tipo) = :tipo', { tipo: type.toLowerCase() })
        .select(['p.nombre', 'p.referencia_imagen', 'p.codigo_playlist'])
        .getMany();

      return {
        statusCode: 200,
        playlist,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
