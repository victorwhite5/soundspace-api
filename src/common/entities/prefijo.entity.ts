import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Operadora } from './operadora.entity';

@Entity()
export class Prefijo {
  @PrimaryGeneratedColumn('uuid')
  codigo_prefijo: number;

  @Column()
  prefijo: string;

  @ManyToOne(() => Operadora, (operadora) => operadora.prefijos)
  @JoinColumn({ name: 'fk_operadora' }) // Personaliza el nombre de la columna de la clave foránea
  operadora: Operadora;
}
