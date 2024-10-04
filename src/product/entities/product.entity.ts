import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
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
  new: boolean;

  @Column({ nullable: false })
  negotiable: boolean;

  @Column('text', { array: true, nullable: false, default: '{}' })
  images: string[];

  @ManyToOne(() => User, (user) => user.id, {
    eager: true
  })
  created_by: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  last_update: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;
}
