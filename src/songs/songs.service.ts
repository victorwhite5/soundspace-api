import { Injectable, InternalServerErrorException, BadRequestException, Logger } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { getFile } from 'src/common/helpers/getBlobFile.helper';
import { HeaderDto } from './dto/header-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReproduccionCancion } from 'src/common/entities/reproduccion_cancion.entity';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user.entity';
import { Cancion } from 'src/common/entities/cancion.entity';

@Injectable()
export class SongsService {

  private readonly logger = new Logger('PlaylistService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,

    @InjectRepository(ReproduccionCancion)
    private readonly reproduccionCancionRepository: Repository<ReproduccionCancion>
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

  create(createSongDto: CreateSongDto) {
    return 'This action adds a new song';
  }

  findAll() {
    return `This action returns all songs`;
  }

  async findOne(id: string, headerDto: HeaderDto) {
    // const songId = id + '.mp3';
    try {

      const user = await this.userRepository.findOneBy({codigo_usuario: headerDto.user});
      
      const song = await this.cancionRepository.findOneBy({codigo_cancion: id});
      
      if (!user || !song) {
        throw new BadRequestException('User or song not found');
    }

      const reproduccionCancion = await this.reproduccionCancionRepository.create({
        fecha_reproduccion: new Date(),
        usuario: user,
        cancion: song
      })

      await this.reproduccionCancionRepository.save(reproduccionCancion);

      const blobSong = await getFile(song.referencia_cancion, process.env.SONGS_CONTAINER);
      
      return blobSong;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findLink(id: string, headerDto: HeaderDto) {
    try {

      const user = await this.userRepository.findOneBy({codigo_usuario: headerDto.user});
      
      const song = await this.cancionRepository.findOneBy({codigo_cancion: id});
      
      if (!user || !song) {
        throw new BadRequestException('User or song not found');
    }

      const reproduccionCancion = this.reproduccionCancionRepository.create({
        fecha_reproduccion: new Date(),
        usuario: user,
        cancion: song
      })

      await this.reproduccionCancionRepository.save(reproduccionCancion);

     return {statusCode: 200, link: song.referencia_cancion};
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
