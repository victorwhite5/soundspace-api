import { Module } from '@nestjs/common';
import { CancionService } from './cancion.service';
import { CancionController } from './cancion.controller';

@Module({
  controllers: [CancionController],
  providers: [CancionService],
})
export class CancionModule {}
