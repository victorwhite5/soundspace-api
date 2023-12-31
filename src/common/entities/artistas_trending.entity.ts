import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artista } from './artista.entity';

@Entity('artistas_trending')
export class ArtistasTrending {
  @PrimaryGeneratedColumn('uuid')
  codigo_trending: string;

  @Column()
  fecha: Date;

  @ManyToOne(() => Artista, artista => artista.trending)
  artista: Artista;
}
