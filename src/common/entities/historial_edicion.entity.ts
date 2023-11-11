import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class HistorialEdicion {
  @PrimaryColumn()
  usuarioId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_edicion: Date;

  @Column()
  campo: string;

  @Column()
  valor_viejo: string;

  @Column()
  valor_nuevo: string;

  @ManyToOne(() => User, usuario => usuario.historialEdiciones)
  @JoinColumn({ name: "usuarioId" })
  usuario: User;
  
}
