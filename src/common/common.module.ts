import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Playlist } from './entities/playlist.entity';
import { ReproduccionPlaylist } from './entities/reproduccion_playlist.entity';
import { HistorialEdicion } from './entities/historial_edicion.entity';
import { PlaylistCancion } from './entities/playlist_cancion.entity';
import { PlaylistCreador } from './entities/playlist_creador.entity';
import { Cancion } from './entities/cancion.entity';
import { Genero } from './entities/genero.entity';
import { Artista } from './entities/artista.entity';
import { ReproduccionCancion } from './entities/reproduccion_cancion.entity';
import { PlaylistTrending } from './entities/playlist_trending.entity';
import { ArtistasTrending } from './entities/artistas_trending.entity';
import { Operadora } from './entities/operadora.entity';
import { Telefono } from './entities/telefono.entity';
import { Prefijo } from './entities/prefijo.entity';
import { Publicidad } from './entities/publicidad.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Playlist,
      ReproduccionPlaylist,
      HistorialEdicion,
      PlaylistCancion,
      PlaylistCreador,
      Cancion,
      Genero,
      Artista,
      ReproduccionCancion,
      PlaylistTrending,
      ArtistasTrending,
      Operadora,
      Telefono,
      Prefijo,
      Publicidad
    ]),
  ],
  exports: [TypeOrmModule],
})
export class CommonModule {}
