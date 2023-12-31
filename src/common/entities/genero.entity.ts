import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Cancion } from './cancion.entity';

@Entity('genero')
export class Genero {

  @PrimaryGeneratedColumn('uuid')
  codigo_genero: string;

  @Column()
  nombre_genero: string;

  @ManyToMany(() => Cancion, cancion => cancion.generos)
  canciones: Cancion[];
}
