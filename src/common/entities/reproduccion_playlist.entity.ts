import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Playlist } from './playlist.entity';

@Entity('reproduccion_playlist')
export class ReproduccionPlaylist {
  
  @PrimaryColumn()
  usuarioId: number;

  @PrimaryColumn()
  playlistId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_reproduccion: Date;

  @ManyToOne(() => User, usuario => usuario.reproducciones)
  @JoinColumn({ name: "usuarioId" })
  usuario: User;

  @ManyToOne(() => Playlist, playlist => playlist.reproducciones)
  @JoinColumn({ name: "playlistId" })
  playlist: Playlist;
}
