import { Test, TestingModule } from '@nestjs/testing';
import { ReproduccionCancionService } from './reproduccion_cancion.service';

describe('ReproduccionCancionService', () => {
  let service: ReproduccionCancionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReproduccionCancionService],
    }).compile();

    service = module.get<ReproduccionCancionService>(ReproduccionCancionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
