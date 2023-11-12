import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artista } from 'src/common/entities/artista.entity';
import { HandleDBExceptions } from '../common/helpers/handleDBExceptions';

@Injectable()
export class ArtistsService {
  private readonly logger = new Logger('ArtistsService')
  constructor(
    @InjectRepository(Artista)
    private readonly artistRepository: Repository<Artista>,
    private readonly handler: HandleDBExceptions,
    
  ) {}
  
  async findTopArtists() {
    try {
      const playlist = await this.artistRepository
        .createQueryBuilder('a')
        .innerJoinAndSelect('a.trending', 'at')
        .select(['a.codigo_artista', 'a.nombre_artista', 'a.referencia_imagen'])
        .getMany();

      return playlist;
    } catch (error) {
      this.handler.catchError(error, this.logger);
    }
  }
}

