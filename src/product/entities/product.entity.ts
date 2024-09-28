import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  contact: string;

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
