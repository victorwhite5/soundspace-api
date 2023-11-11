import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Artista } from './artista.entity';

@Entity('playlist_creador')
export class PlaylistCreador {
  @PrimaryColumn()
  playlistId: number;

  @PrimaryColumn('uuid')
  codigo_artista: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @ManyToOne(() => Playlist, playlist => playlist.creadores)
  @JoinColumn({ name: "playlistId" })
  playlist: Playlist;

  @ManyToOne(() => Artista, artista => artista.playlistCreadores)
  @JoinColumn({ name: "codigo_artista" })
  artista: Artista;
}
