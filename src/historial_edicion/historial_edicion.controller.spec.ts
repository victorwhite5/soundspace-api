import { Test, TestingModule } from '@nestjs/testing';
import { HistorialEdicionController } from './historial_edicion.controller';
import { HistorialEdicionService } from './historial_edicion.service';

describe('HistorialEdicionController', () => {
  let controller: HistorialEdicionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialEdicionController],
      providers: [HistorialEdicionService],
    }).compile();

    controller = module.get<HistorialEdicionController>(HistorialEdicionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
