import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancion } from 'src/common/entities/cancion.entity';
import { Artista } from 'src/common/entities/artista.entity';
import { QuerySearchDto } from './dto/querySearch.dto';
import { handleDBExceptions } from 'src/common/helpers/handleDBExceptions';

@Injectable()
export class SearchService {
  private readonly logger = new Logger('SearchService');
  
  constructor(
    @InjectRepository(Cancion)
    private readonly songRepository: Repository<Cancion>,
    @InjectRepository(Artista)
    private readonly artistRepository: Repository<Artista>,
  ) {}

  async findFew(term: string, querySearchDto: QuerySearchDto) {
    const { type = 'song' } = querySearchDto;
    
    let results = [];

    try {
      if (type === 'song') {
        results = await this.songRepository
          .createQueryBuilder('cancion')
          .where(' LOWER(cancion.nombre_cancion) LIKE :term', {
            term: `%${term.toLowerCase()}%`,
          })
          .select([
            'cancion.nombre_cancion',
            'cancion.codigo_cancion',
            'cancion.referencia_cancion',
            'cancion.referencia_imagen',
          ])
          .limit(5)
          .getMany();
  
      } else if (type === 'artist') {
        results = await this.artistRepository
          .createQueryBuilder('artista')
          .where(' LOWER(artista.nombre_artista) LIKE :term', {
            term: `%${term.toLowerCase()}%`,
          })
          .select([
            'artista.nombre_artista',
            'artista.codigo_artista',
            'artista.referencia_imagen',
          ])
          .limit(5)
          .getMany();
      }
    } catch (error) {
      handleDBExceptions('Unexpected error, check server logs', this.logger);
    }
    
    if(results.length === 0) {
      const error = {
        status: 404,
        response: {
          message: `The artist or song ${term} was not found`,
        }
      }
      handleDBExceptions(error, this.logger);
    }
    return {
      statusCode: 200,
      data: results
    }
  }
}
