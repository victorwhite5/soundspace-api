import { Test, TestingModule } from '@nestjs/testing';
import { ReproduccionPlaylistController } from './reproduccion_playlist.controller';
import { ReproduccionPlaylistService } from './reproduccion_playlist.service';

describe('ReproduccionPlaylistController', () => {
  let controller: ReproduccionPlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReproduccionPlaylistController],
      providers: [ReproduccionPlaylistService],
    }).compile();

    controller = module.get<ReproduccionPlaylistController>(ReproduccionPlaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
