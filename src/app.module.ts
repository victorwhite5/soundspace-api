import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './playlist/playlist.module';
import { PublicidadModule } from './Publicidad/publicidad.module';
import { SearchModule } from './search/search.module';
import { SeedModule } from './seed/seed.module';
import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';
import { PlaylistController } from './playlist-hexagonal-architecture/infraestructure/controllers/playlist.controller';
import { PlaylistHexagonalArchitectureModule } from './playlist-hexagonal-architecture/playlist-hexagonal-architecture.module';

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

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: +process.env.DB_PORT,
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    
    AuthModule,
    UsersModule,
    CommonModule,
    SeedModule,
    PlaylistModule,
    ArtistsModule,
    SongsModule,
    SearchModule,
    PublicidadModule,
    PlaylistHexagonalArchitectureModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
