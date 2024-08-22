import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Client } from './Client'

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  brand: string

  @Column()
  model: string

  @Column()
  type: string

  @Column()
  category: string

  @Column()
  licensePlate: string

  @ManyToOne(() => Client)
  client: Client
}
