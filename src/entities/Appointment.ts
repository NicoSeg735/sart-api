import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Mechanic } from './Mechanic'
import { Vehicle } from './Vehicle'

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: Date

  @Column()
  estimatedPrice: number

  @Column()
  status: boolean

  @Column()
  documentations: boolean

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle

  @ManyToOne(() => Mechanic)
  mechanic: Mechanic
}
