import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistCreadorService } from './playlist_creador.service';

describe('PlaylistCreadorService', () => {
  let service: PlaylistCreadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistCreadorService],
    }).compile();

    service = module.get<PlaylistCreadorService>(PlaylistCreadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
