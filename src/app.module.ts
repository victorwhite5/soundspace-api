import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './playlist/playlist.module';
import { HistorialEdicionModule } from './historial_edicion/historial_edicion.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: +process.env.DB_PORT,
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    
    AuthModule,
    UsersModule,
    CommonModule,
    SeedModule,
    PlaylistModule,
    HistorialEdicionModule,
    ArtistsModule,
    SongsModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
