import { IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  readonly nombre_artista: string;

  @IsString()
  readonly referencia_imagen: string;
}
