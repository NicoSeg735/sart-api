import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string
}
