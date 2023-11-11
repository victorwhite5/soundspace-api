import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistModule } from './playlist/playlist.module';
import { HistorialEdicionModule } from './historial_edicion/historial_edicion.module';
// import { ReproduccionPlaylistModule } from './reproduccion_playlist/reproduccion_playlist.module';
// import { PlaylistCancionModule } from './playlist_cancion/playlist_cancion.module';
// import { PlaylistCreadorModule } from './playlist_creador/playlist_creador.module';
// import { CancionModule } from './cancion/cancion.module';
// import { GeneroModule } from './genero/genero.module';
// import { ReproduccionCancionModule } from './reproduccion_cancion/reproduccion_cancion.module';
// import { ArtistaModule } from './artista/artista.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { GendersModule } from './genders/genders.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    AuthModule,
    UsersModule,
    CommonModule,
    SeedModule,
    PlaylistModule,
    HistorialEdicionModule,
    // ReproduccionPlaylistModule,
    // PlaylistCancionModule,
    // PlaylistCreadorModule,
    // CancionModule,
    // GeneroModule,
    // ArtistaModule,
    // ReproduccionCancionModule,
    ArtistsModule,
    SongsModule,
    GendersModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
