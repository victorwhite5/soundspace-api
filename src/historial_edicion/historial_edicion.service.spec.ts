import { Test, TestingModule } from '@nestjs/testing';
import { HistorialEdicionService } from './historial_edicion.service';

describe('HistorialEdicionService', () => {
  let service: HistorialEdicionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialEdicionService],
    }).compile();

    service = module.get<HistorialEdicionService>(HistorialEdicionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
