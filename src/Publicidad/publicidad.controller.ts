
import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { PublicidadService } from './publicidad.service';
import { Publicidad } from 'src/common/entities/publicidad.entity';

@Controller('publicidad')
export class PublicidadController {
    constructor(private publicidadservice: PublicidadService) { }


    @Get(':uuid')
    async ShowOneDeal(@Param('uuid') id: string): Promise<{url: string, imagen: string}> {
        try {
            const publi = await this.publicidadservice.ShowOneDeal(id);
            if (!publi) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return {
                url: publi.url_publicidad,
                imagen: publi.referencia_imagen,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
