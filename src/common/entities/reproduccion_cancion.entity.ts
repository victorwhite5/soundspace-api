import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Cancion } from './cancion.entity';

@Entity('reproduccion_cancion')
export class ReproduccionCancion {

  @PrimaryColumn()
  codigo_usuario: string;

  @PrimaryColumn()
  codigo_cancion: string;

  @ManyToOne(() => User, user => user.reproduccionesCanciones)
  @JoinColumn({ name: 'codigo_usuario' })
  usuario: User;

  @ManyToOne(() => Cancion, cancion => cancion.reproduccionesCanciones)
  @JoinColumn({ name: 'codigo_cancion' })
  cancion: Cancion;

  @Column({ type: 'timestamp' })
  fecha_reproduccion: Date;

  @Column()
  Cantidad_reproducciones: number;
}
