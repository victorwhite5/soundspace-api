import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { PlaylistCreador } from 'src/common/entities/playlist_creador.entity';
import { Cancion } from 'src/common/entities/cancion.entity';

@Injectable()
export class ArtistsService {
  // Inyectamos los repositorios de TypeORM para cada entidad
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
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
  
  // Método para obtener los álbumes de un artista por su ID
  async getAlbums(artistId: string) {
    return await this.playlistCreadorRepository.createQueryBuilder('playlistCreador')
      //se une a la tabla artista en la tabla playlistCreador y filtra los PlaylistCreador para incluir solo aquellos cuyo artista coincide con el "artistId"
      .innerJoin('playlistCreador.artista', 'artista', 'artista.codigo_artista = :artistId', { artistId })
      //luego seleccionamos solo los que coincidan en la union anterior con el tipo "album"
      .innerJoinAndSelect('playlistCreador.playlist', 'playlist', 'playlist.tipo = :tipo', { tipo: 'album' })
      .getMany();
  }
  

  // Método para obtener las canciones de un artista por su ID
  async getSongs(artistId: string) {
    //retornamos la canciones del artirta haciendo "innerJoin"  de tabla cancion con tabla artista, "createQueryBuilder" es utilizado para hacer una consulta personalizada
    return await this.cancionRepository.createQueryBuilder('cancion')
      .innerJoin('cancion.artistas', 'artista', 'artista.codigo_artista = :artistId', { artistId })
      //Se utiliza el método getMany para ejecutar la consulta y devolver los resultados
      .getMany();
  }  
}