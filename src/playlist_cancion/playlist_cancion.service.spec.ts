import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistCancionService } from './playlist_cancion.service';

describe('PlaylistCancionService', () => {
  let service: PlaylistCancionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistCancionService],
    }).compile();

    service = module.get<PlaylistCancionService>(PlaylistCancionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
