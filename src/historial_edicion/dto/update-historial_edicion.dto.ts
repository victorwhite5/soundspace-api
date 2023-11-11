import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialEdicionDto } from './create-historial_edicion.dto';

export class UpdateHistorialEdicionDto extends PartialType(CreateHistorialEdicionDto) {}
