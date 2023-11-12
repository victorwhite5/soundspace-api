import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

export const handleDBExceptions = (error: any, logger: Logger) => {
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

  if (error.status === 404) {
    throw new NotFoundException(
      error.response.message || 'Unexpected error, check server logs',
    );
  }

  throw new InternalServerErrorException('Unexpected error, check server logs');
};
