import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Operadora } from './operadora.entity';

@Entity()
export class Telefono {
  @PrimaryGeneratedColumn('uuid')
  codigo_numero: string;

  @Column()
  numero: string;

  @ManyToOne(() => Operadora, (operadora) => operadora.telefonos)
  @JoinColumn({ name: 'fk_operadora' }) // Personaliza el nombre de la columna de la clave foránea
  operadora: Operadora;
}
