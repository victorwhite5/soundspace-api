import { Test, TestingModule } from '@nestjs/testing';
import { ReproduccionPlaylistService } from './reproduccion_playlist.service';

describe('ReproduccionPlaylistService', () => {
  let service: ReproduccionPlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReproduccionPlaylistService],
    }).compile();

    service = module.get<ReproduccionPlaylistService>(ReproduccionPlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
