import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicidad } from 'src/common/entities/publicidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicidadService {
    
    constructor(
        @InjectRepository(Publicidad)
        private readonly publicidadRepository: Repository<Publicidad>,
      ) { }

    async ShowOneDeal(codigo_publicidad: string){
        const publcidadFound = await this.publicidadRepository.findOne({
          where: {
            codigo_publicidad,
          }
        })
        return publcidadFound;
}
}
