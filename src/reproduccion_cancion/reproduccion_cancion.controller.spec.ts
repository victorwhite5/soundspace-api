import { Test, TestingModule } from '@nestjs/testing';
import { ReproduccionCancionController } from './reproduccion_cancion.controller';
import { ReproduccionCancionService } from './reproduccion_cancion.service';

describe('ReproduccionCancionController', () => {
  let controller: ReproduccionCancionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReproduccionCancionController],
      providers: [ReproduccionCancionService],
    }).compile();

    controller = module.get<ReproduccionCancionController>(ReproduccionCancionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
