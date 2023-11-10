import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistCancionController } from './playlist_cancion.controller';
import { PlaylistCancionService } from './playlist_cancion.service';

describe('PlaylistCancionController', () => {
  let controller: PlaylistCancionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistCancionController],
      providers: [PlaylistCancionService],
    }).compile();

    controller = module.get<PlaylistCancionController>(PlaylistCancionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
