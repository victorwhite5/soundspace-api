import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicidad } from 'src/common/entities/publicidad.entity';
import { handleDBExceptions } from 'src/common/helpers/handleDBExceptions';
import { Repository } from 'typeorm';

@Injectable()
export class PublicidadService {
  private readonly logger = new Logger(PublicidadService.name);
  constructor(
    @InjectRepository(Publicidad)
    private readonly publicidadRepository: Repository<Publicidad>,
  ) {}

  async ShowOneDeal() {
    try {
      const deal = await this.publicidadRepository
        .createQueryBuilder()
        .select()
        .orderBy('RANDOM()')
        .getOne();

      if (!deal) {
        throw new NotFoundException('There is no deals to show');
      }

      return {
        statusCode: 200,
        data: deal,
      }
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
}
