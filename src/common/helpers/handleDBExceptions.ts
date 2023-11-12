import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";

@Injectable()
export class HandleDBExceptions  {

    catchError(error: any, logger: Logger) {
        logger.error(error);
    
        if (error.code === '23505') {
        throw new BadRequestException(`Product already exists ${error.detail}`);
        }
        
        if (error.status === 500) {
        throw new InternalServerErrorException(
            'Unexpected error, check server logs',
        );
        }
        if (error.status === 400) {
        throw new BadRequestException(
            error.response.message || 'Unexpected error, check server logs',
        );
        }

        throw new InternalServerErrorException(
        'Unexpected error, check server logs',
        );
  }
        
    }
