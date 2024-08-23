import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm'

import { User } from './User'

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  dni: number

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User
}
