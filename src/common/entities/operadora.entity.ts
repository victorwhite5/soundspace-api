import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Telefono } from './telefono.entity';
import { Prefijo } from './prefijo.entity';

@Entity()
export class Operadora {
  @PrimaryGeneratedColumn('uuid')
  codigo_operadora: string;

  @Column()
  nombre_operadora: string;

  @OneToMany(() => Telefono, (telefono) => telefono.operadora)
  telefonos: Telefono[];

  @OneToMany(() => Prefijo, (prefijo) => prefijo.operadora)
  prefijos: Prefijo[];
}
