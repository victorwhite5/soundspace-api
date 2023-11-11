import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Operadora } from './operadora.entity';

@Entity()
export class Telefono {
  @PrimaryGeneratedColumn('uuid')
  codigo_numero: string;

  @Column()
  numero: string;

  @ManyToOne(() => Operadora, (operadora) => operadora.telefonos)
  operadora: Operadora;
}
