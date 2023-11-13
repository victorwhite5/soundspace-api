import { Module } from '@nestjs/common';
import { PublicidadController } from './publicidad.controller';
import { PublicidadService } from './publicidad.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PublicidadController],
  providers: [PublicidadService],
  imports: [CommonModule]
})
export class PublicidadModule {}
