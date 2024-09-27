import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enums/rol.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'simple-enum', enum: Role, default: [Role.USER], array: true })
  roles: Role[];

  @DeleteDateColumn({ type: 'timestamp',  select: false })
  deletedAt: Date;
}
