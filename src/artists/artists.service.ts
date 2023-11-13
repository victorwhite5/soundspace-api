import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { handleDBExceptions } from '../common/helpers/handleDBExceptions';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from 'src/common/entities/artista.entity';
import { PlaylistCreador } from 'src/common/entities/playlist_creador.entity';
import { Cancion } from 'src/common/entities/cancion.entity';
import { convertSeconds } from 'src/common/helpers/convertSeconds.helper';

@Injectable()
export class ArtistsService {
  private readonly logger = new Logger('ArtistsService');

  // Inyectamos los repositorios de TypeORM para cada entidad
  constructor(
    @InjectRepository(Artista)
    private artistRepository: Repository<Artista>,

    @InjectRepository(PlaylistCreador)
    private playlistCreadorRepository: Repository<PlaylistCreador>,

    @InjectRepository(Cancion)
    private cancionRepository: Repository<Cancion>,
  ) {}

  async findTopArtists() {
    try {
      const playlist = await this.artistRepository
        .createQueryBuilder('a')
        .innerJoinAndSelect('a.trending', 'at')
        .select(['a.codigo_artista', 'a.nombre_artista', 'a.referencia_imagen'])
        .getMany();

      return {
        statusCode: 200,
        data: playlist,
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  // Método para crear un nuevo artista
  async create(createArtistDto: CreateArtistDto) {
    try {
      // Creamos una nueva instancia de Artista con los datos del DTO
      const artist = this.artistRepository.create(createArtistDto);
      // Guardamos la nueva instancia de Artista en la base de datos
      await this.artistRepository.save(artist);
      // Devolvemos el Artista recién creado
      return { statudCode: 201, data: artist };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  // Método para obtener todos los artistas
  async findAll() {
    try {
      // Buscamos y devolvemos todos los Artistas en la base de datos
      const artists = await this.artistRepository.find();
      return { statusCode: 200, data: artists };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  // Método para obtener un artista por su ID
  async findOne(id: string) {
    try {
      // Buscamos y devolvemos el Artista con el ID proporcionado
      const artista = await this.artistRepository.findOne({
        where: { codigo_artista: id },
      });

      return {
        statusCode: 200,
        data: artista,
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  // Método para actualizar un artista por su ID
  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      // Actualizamos el Artista con el ID proporcionado con los datos del DTO
      await this.artistRepository.update(id, updateArtistDto);
      // Buscamos y devolvemos el Artista actualizado
      const updatedArtist = await this.artistRepository.findOne({
        where: { codigo_artista: id },
      });

      return {
        statusCode: 200,
        data: updatedArtist,
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  // Método para eliminar un artista por su ID
  async remove(id: string) {
    try {
      // Buscamos el Artista con el ID proporcionado
      const artistToRemove = await this.artistRepository.findOne({
        where: { codigo_artista: id },
      });
      // Eliminamos el Artista de la base de datos
      await this.artistRepository.remove(artistToRemove);
      // Devolvemos el Artista que se eliminó
      //(revisar esto!!!!!!!!!!!)
      return artistToRemove;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  // Método para obtener los albums de un artista por su ID
  async getAlbums(artistId: string) {
    try {
      // Primero, obtenemos el artista por su ID
      const artist = await this.artistRepository.findOne({
        where: { codigo_artista: artistId },
      });

      if (!artist) {
        throw new NotFoundException(`Artista con ID ${artistId} no encontrado`);
      }

      // Luego, obtenemos todas las listas de reproducción asociadas a ese artista
      const playlists = await this.playlistCreadorRepository
        .createQueryBuilder('playlistCreador')
        .innerJoin(
          'playlistCreador.artista',
          'artista',
          'artista.codigo_artista = :artistId',
          { artistId },
        )
        .innerJoinAndSelect(
          'playlistCreador.playlist',
          'playlist',
          'playlist.tipo = :tipo',
          { tipo: 'Album' },
        )
        .getMany();

      // Finalmente, retornamos el objeto con la estructura deseada
      return {
        statusCode: 200,
        data: {
          Codigo_artista: artist.codigo_artista,
          artista: artist.nombre_artista,
          playlists,
        },
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  // Método para obtener las canciones de un artista por su ID
  async getSongs(artistId: string) {
    try {
      // Primero, obtenemos el artista por su ID
      const artist = await this.artistRepository.findOne({
        where: { codigo_artista: artistId },
      });

      if (!artist) {
        throw new NotFoundException(`Artista con ID ${artistId} no encontrado`);
      }

      // Luego, obtenemos todas las canciones asociadas a ese artista
      const songs = await this.cancionRepository
        .createQueryBuilder('cancion')
        .innerJoin(
          'cancion.artistas',
          'artista',
          'artista.codigo_artista = :artistId',
          { artistId },
        )
        .getMany();

      // Finalmente, retornamos el objeto con la estructura deseada
      return {
        statusCode: 200,
        data: {
          Codigo_artista: artist.codigo_artista,
          artista: artist.nombre_artista,
          songs:
            songs.length > 0
              ? songs.map((song) => {
                  return {
                    codigo_cancion: song.codigo_cancion,
                    nombre: song.nombre_cancion,
                    duracion: convertSeconds(song.duracion),
                    referencia_imagen: song.referencia_imagen,
                  };
                })
              : [],
        },
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
}
