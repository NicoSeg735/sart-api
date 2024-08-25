import { ChildEntity, OneToMany } from 'typeorm'

import { Appointment } from './Appointment'
import { Employee } from './Employee'

@ChildEntity()
export class Mechanic extends Employee {
  @OneToMany(() => Appointment, appointment => appointment.mechanic)
  appointments: Appointment[]
}
