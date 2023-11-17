import { Module } from '@nestjs/common';
import { PlaylistController } from './infraestructure/controllers/playlist.controller';
import { TopPlaylistsService } from './application/services/top-playlists.service';
import { OrmPlaylistRepository } from './infraestructure/repository/orm-playlist.repository';

@Module({
  controllers: [PlaylistController],
  providers: [TopPlaylistsService, OrmPlaylistRepository],
})
export class PlaylistHexagonalArchitectureModule {}
