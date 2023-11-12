import { ArtistasTrending } from "src/common/entities/artistas_trending.entity";
import { Cancion } from "src/common/entities/cancion.entity";
import { PlaylistCreador } from "src/common/entities/playlist_creador.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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