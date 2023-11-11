import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistCreadorController } from './playlist_creador.controller';
import { PlaylistCreadorService } from './playlist_creador.service';

describe('PlaylistCreadorController', () => {
  let controller: PlaylistCreadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistCreadorController],
      providers: [PlaylistCreadorService],
    }).compile();

    controller = module.get<PlaylistCreadorController>(PlaylistCreadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
