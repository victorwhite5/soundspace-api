import { Module } from '@nestjs/common';
import { HistorialEdicionService } from './historial_edicion.service';
import { HistorialEdicionController } from './historial_edicion.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [HistorialEdicionController],
  providers: [HistorialEdicionService],
  imports: [CommonModule],
})
export class HistorialEdicionModule {}
