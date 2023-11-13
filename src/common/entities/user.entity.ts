import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReproduccionPlaylist } from './reproduccion_playlist.entity';
import { HistorialEdicion } from './historial_edicion.entity';
import { ReproduccionCancion } from './reproduccion_cancion.entity';

export enum genderOptions {
  Male = 'Male',
  Female = 'Female',
  Polygender = 'Polygender',
  Nonbinary = 'Nonbinary',
  Agender = 'Agender',
  Genderfluid = 'Genderfluid',
  Other = 'Other',
  Nodisplay = 'Nodisplay'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  codigo_usuario: string;

  @Column({ nullable: true })
  nombre?: string;

  @Column({ nullable: true })
  correo?: string;

  @Column({ type: 'date', nullable: true })
  fecha_nac?: Date;

  @Column({ nullable: true })
  genero?: string;

  @Column({ unique: true })
  telefono: string;

  @OneToMany(() =>
    ReproduccionPlaylist,
    (reproduccion) => reproduccion.usuario)
  reproducciones: ReproduccionPlaylist[];

  @OneToMany(
    () => HistorialEdicion,
    (historialEdicion) => historialEdicion.usuario,
  )
  historialEdiciones: HistorialEdicion[];

  @OneToMany(
    () => ReproduccionCancion,
    (reproduccionCancion) => reproduccionCancion.usuario,
  )
  reproduccionesCanciones: ReproduccionCancion[];
}
