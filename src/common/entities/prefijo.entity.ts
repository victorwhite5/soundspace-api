import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Operadora } from './operadora.entity';

@Entity()
export class Prefijo {
  @PrimaryGeneratedColumn('uuid')
  codigo_prefijo: number;

  @Column()
  prefijo: string;

  @ManyToOne(() => Operadora, (operadora) => operadora.prefijos)
  operadora: Operadora;
}
