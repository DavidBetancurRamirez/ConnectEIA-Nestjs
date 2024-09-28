import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  location: string;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column("text", { array: true })
  images: string[];

  @Column({ type: 'timestamp', nullable: false })
  last_update: Date;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true
  })
  created_by: User;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;
}
