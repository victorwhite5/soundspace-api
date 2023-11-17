import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Playlist } from 'src/common/entities/playlist.entity';
import { IPlaylistRepository } from 'src/playlist-hexagonal-architecture/application/repository/playlist.repository.interface';
import { IPlaylistResponseDto } from 'src/playlist-hexagonal-architecture/application/services/dto/get-playlist-response.dto';


@Injectable()
export class OrmPlaylistRepository extends Repository<Playlist> implements IPlaylistRepository {
  
  constructor(dataSource: DataSource) {
		super(Playlist, dataSource.createEntityManager());
	}

  async getTopPlaylist(tipo: string): Promise<IPlaylistResponseDto[]> {
    try {
      console.log(tipo);
      
      const playlist = await this.createQueryBuilder('p')
        .leftJoinAndSelect('p.trending', 'pt')
        .where('LOWER (p.tipo) = :tipo', { tipo: tipo.toLowerCase() })
        .select(['p.nombre', 'p.referencia_imagen', 'p.codigo_playlist'])
        .getMany();

        const response: IPlaylistResponseDto[] = playlist.map((p) => {
          return {
            id: p.codigo_playlist,
            name: p.nombre,
            image: p.referencia_imagen,
          };
        });
      return response;
    } catch (error) {
      console.log(error);
      //handleDBExceptions(error, this.logger);
    }
  }
  getPlaylistInfo(playlistId: string): Promise<{}> {
    throw new Error('Method not implemented.');
  }
}
