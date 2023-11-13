
import { Controller, Get } from '@nestjs/common';
import { PublicidadService } from './publicidad.service';

@Controller('publicidad')
export class PublicidadController {
    constructor(private publicidadservice: PublicidadService) { }


    @Get()
    ShowOneDeal(){
        return this.publicidadservice.ShowOneDeal();
    }
}
