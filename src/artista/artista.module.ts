import { Module } from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { ArtistaController } from './artista.controller';

@Module({
  controllers: [ArtistaController],
  providers: [ArtistaService],
})
export class ArtistaModule {}
