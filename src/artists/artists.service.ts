import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistCreador } from 'src/common/entities/playlist_creador.entity';
import { Cancion } from 'src/common/entities/cancion.entity';
import { Artista } from 'src/common/entities/artist.entity';

@Injectable()
export class ArtistsService {
  // Inyectamos los repositorios de TypeORM para cada entidad
  constructor(
    @InjectRepository(Artista)
    private artistRepository: Repository<Artista>,
    @InjectRepository(PlaylistCreador)
    private playlistCreadorRepository: Repository<PlaylistCreador>,
    @InjectRepository(Cancion)
    private cancionRepository: Repository<Cancion>,
  ) {}

  // Método para crear un nuevo artista
  async create(createArtistDto: CreateArtistDto) {
    // Creamos una nueva instancia de Artista con los datos del DTO
    const artist = this.artistRepository.create(createArtistDto);
    // Guardamos la nueva instancia de Artista en la base de datos
    await this.artistRepository.save(artist);
    // Devolvemos el Artista recién creado
    return artist;
  }

  // Método para obtener todos los artistas
  async findAll() {
    // Buscamos y devolvemos todos los Artistas en la base de datos
    return await this.artistRepository.find();
  }

  // Método para obtener un artista por su ID
  async findOne(id: string) {
    // Buscamos y devolvemos el Artista con el ID proporcionado
    return await this.artistRepository.findOne({ where: { codigo_artista: id } });
  }

  // Método para actualizar un artista por su ID
  async update(id: string, updateArtistDto: UpdateArtistDto) {
    // Actualizamos el Artista con el ID proporcionado con los datos del DTO
    await this.artistRepository.update(id, updateArtistDto);
    // Buscamos y devolvemos el Artista actualizado
    return await this.artistRepository.findOne({ where: { codigo_artista: id } });
  }

  // Método para eliminar un artista por su ID
  async remove(id: string) {
    // Buscamos el Artista con el ID proporcionado
    const artistToRemove = await this.artistRepository.findOne({ where: { codigo_artista: id } });
    // Eliminamos el Artista de la base de datos
    await this.artistRepository.remove(artistToRemove);
    // Devolvemos el Artista que se eliminó 
    //(revisar esto!!!!!!!!!!!)
    return artistToRemove;
  }
  
  // Método para obtener los albums de un artista por su ID
  async getAlbums(artistId: string) {
    // Primero, obtenemos el artista por su ID
    const artist = await this.artistRepository.findOne({ where: { codigo_artista: artistId } });
  
    // Luego, obtenemos todas las listas de reproducción asociadas a ese artista
    const playlists = await this.playlistCreadorRepository.createQueryBuilder('playlistCreador')
      .innerJoin('playlistCreador.artista', 'artista', 'artista.codigo_artista = :artistId', { artistId })
      .innerJoinAndSelect('playlistCreador.playlist', 'playlist', 'playlist.tipo = :tipo', { tipo: 'Album' })
      .getMany();
  
    // Finalmente, retornamos el objeto con la estructura deseada
    return {
      Codigo_artista:artist.codigo_artista,
      artista: artist.nombre_artista,
      playlists: playlists.map(playlistCreador => playlistCreador.playlist)
    };
  }
  

  // Método para obtener las canciones de un artista por su ID
  async getSongs(artistId: string) {
    // Primero, obtenemos el artista por su ID
    const artist = await this.artistRepository.findOne({ where: { codigo_artista: artistId } });
  
    // Luego, obtenemos todas las canciones asociadas a ese artista
    const songs = await this.cancionRepository.createQueryBuilder('cancion')
      .innerJoin('cancion.artistas', 'artista', 'artista.codigo_artista = :artistId', { artistId })
      .getMany();
  
    // Finalmente, retornamos el objeto con la estructura deseada
    return {
      Codigo_artista: artist.codigo_artista,
      artista: artist.nombre_artista,
      canciones: songs
    };
  }
  
  
}
