import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Cancion } from './cancion.entity';
import { PlaylistCreador } from './playlist_creador.entity';
import { ArtistasTrending } from './artistas_trending.entity';

@Entity('artista')
export class Artista {
  @PrimaryGeneratedColumn('uuid')
  codigo_artista: string;

  @Column()
  nombre_artista: string;

  @Column()
  referencia_imagen: string;

  @ManyToMany(() => Cancion, cancion => cancion.artistas)
  canciones: Cancion[];

  @OneToMany(() => PlaylistCreador, playlistCreador => playlistCreador.artista)
  playlistCreadores: PlaylistCreador[];

  @OneToMany(() => ArtistasTrending, trending => trending.artista)
  trending: ArtistasTrending[];
}
