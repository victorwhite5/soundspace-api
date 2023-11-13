import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { getFile } from 'src/common/helpers/getBlobFile.helper';
import { HeaderDto } from './dto/header-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReproduccionCancion } from 'src/common/entities/reproduccion_cancion.entity';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user.entity';
import { Cancion } from 'src/common/entities/cancion.entity';
import { handleDBExceptions } from '../common/helpers/handleDBExceptions';
import { convertSeconds } from 'src/common/helpers/convertSeconds.helper';

@Injectable()
export class SongsService {
  private readonly logger = new Logger('PlaylistService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,

    @InjectRepository(ReproduccionCancion)
    private readonly reproduccionCancionRepository: Repository<ReproduccionCancion>,
  ) {}

  create(createSongDto: CreateSongDto) {
    return 'This action adds a new song';
  }

  async findFew() {
    try {
      const topsongs = await this.reproduccionCancionRepository
        .createQueryBuilder('h')
        .innerJoinAndSelect(
          Cancion,
          'cancion',
          'h.cancionCodigoCancion = cancion.codigo_cancion',
        )
        .select([
          'h.cancionCodigoCancion',
          'cancion.nombre_cancion',
          'cancion.duracion',
          'cancion.referencia_imagen',
        ])
        .groupBy('h.cancionCodigoCancion')
        .addGroupBy('cancion.nombre_cancion')
        .addGroupBy('cancion.duracion')
        .addGroupBy('cancion.referencia_imagen')
        .orderBy('COUNT(h.cancionCodigoCancion)', 'DESC')
        .limit(5)
        .getRawMany();

      const resp = topsongs.map((cancion) => ({
        codigo: cancion.cancionCodigoCancion,
        nombre: cancion.cancion_nombre_cancion,
        duracion: convertSeconds(cancion.cancion_duracion),
        referencia: cancion.cancion_referencia_imagen,
      }));

      return {
        statusCode: 200,
        data: resp,
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findOne(id: string, headerDto: HeaderDto) {
    // const songId = id + '.mp3';
    try {
      const user = await this.userRepository.findOneBy({
        codigo_usuario: headerDto.user,
      });

      const song = await this.cancionRepository.findOneBy({
        codigo_cancion: id,
      });

      if (!user || !song) {
        throw new BadRequestException('User or song not found');
      }

      const reproduccionCancion =
        await this.reproduccionCancionRepository.create({
          fecha_reproduccion: new Date(),
          usuario: user,
          cancion: song,
        });

      await this.reproduccionCancionRepository.save(reproduccionCancion);

      const blobSong = await getFile(
        song.referencia_cancion,
        process.env.SONGS_CONTAINER,
      );

      return blobSong;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findLink(id: string, headerDto: HeaderDto) {
    try {
      const user = await this.userRepository.findOneBy({
        codigo_usuario: headerDto.user,
      });

      const song = await this.cancionRepository.findOneBy({
        codigo_cancion: id,
      });

      if (!user || !song) {
        throw new BadRequestException('User or song not found');
      }

      const reproduccionCancion = this.reproduccionCancionRepository.create({
        fecha_reproduccion: new Date(),
        usuario: user,
        cancion: song,
      });

      await this.reproduccionCancionRepository.save(reproduccionCancion);

      return { statusCode: 200, data: song.referencia_cancion };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
