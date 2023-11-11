import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Genero } from './genero.entity';
import { Artista } from './artista.entity';
import { ReproduccionCancion } from './reproduccion_cancion.entity';
import { PlaylistCancion } from './playlist_cancion.entity';

@Entity('cancion')
export class Cancion {

  @PrimaryGeneratedColumn('uuid')
  codigo_cancion: string;

  @Column()
  nombre_cancion: string;

  @Column()
  duracion: number;

  @Column({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column('uuid')
  referencia_cancion: string;

  @Column('uuid')
  referencia_preview: string;

  @Column('uuid')
  referencia_imagen: string;

  @Column()
  reproducciones: number;

  @ManyToMany(() => Genero, genero => genero.canciones)
  @JoinTable({
    name: 'cancion_genero',
    joinColumn: {
      name: 'codigo_cancion',
      referencedColumnName: 'codigo_cancion'
    },
    inverseJoinColumn: {
      name: 'codigo_genero',
      referencedColumnName: 'codigo_genero'
    }
  })
  generos: Genero[];

  @ManyToMany(() => Artista, artista => artista.canciones)
  @JoinTable({
    name: 'cancion_artista',
    joinColumn: {
      name: 'codigo_cancion',
      referencedColumnName: 'codigo_cancion'
    },
    inverseJoinColumn: {
      name: 'codigo_artista',
      referencedColumnName: 'codigo_artista'
    }
  })
  artistas: Artista[];

  @OneToMany(() => ReproduccionCancion, reproduccionCancion => reproduccionCancion.cancion)
  reproduccionesCanciones: ReproduccionCancion[];

  @OneToMany(() => PlaylistCancion, playlistCancion => playlistCancion.cancion)
  playlistCanciones: PlaylistCancion[];
}
