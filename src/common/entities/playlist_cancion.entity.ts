import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Cancion } from './cancion.entity';

@Entity('playlist_cancion')
export class PlaylistCancion {
  @PrimaryColumn()
  playlistId: number;

  @PrimaryColumn('uuid')
  codigo_cancion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_union: Date;

  @ManyToOne(() => Playlist, playlist => playlist.canciones)
  @JoinColumn({ name: "playlistId" })
  playlist: Playlist;

  @ManyToOne(() => Cancion, cancion => cancion.playlistCanciones)
  @JoinColumn({ name: "codigo_cancion" })
  cancion: Cancion;
}
