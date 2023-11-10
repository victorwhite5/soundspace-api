import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReproduccionPlaylist } from './reproduccion_playlist.entity';
import { PlaylistCancion } from './playlist_cancion.entity';
import { PlaylistCreador } from './playlist_creador.entity';

@Entity('playlist')
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  codigo_playlist: string;

  @Column()
  nombre: string;

  @Column()
  referencia_imagen: string; //lo puse como string hay q revisar

  @Column()
  Tipo: string; //Tipo de playlist
  /*
  @Column({ default: 0 })
  reproducciones: number; //duplicado en "ReproduccionPlaylist"
  */
  @OneToMany(() => ReproduccionPlaylist, reproduccion => reproduccion.playlistId)
  reproducciones: ReproduccionPlaylist[];

  @OneToMany(() => PlaylistCancion, playlistCancion => playlistCancion.playlist)
  canciones: PlaylistCancion[];

  @OneToMany(() => PlaylistCreador, playlistCreador => playlistCreador.playlist)
  creadores: PlaylistCreador[];
}


