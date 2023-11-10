import { Module } from '@nestjs/common';
import { ReproduccionCancionService } from './reproduccion_cancion.service';
import { ReproduccionCancionController } from './reproduccion_cancion.controller';

@Module({
  controllers: [ReproduccionCancionController],
  providers: [ReproduccionCancionService],
})
export class ReproduccionCancionModule {}
