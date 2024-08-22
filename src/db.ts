import { DataSource } from 'typeorm'

import {
  Appointment,
  Client,
  Employee,
  Mechanic,
  TechnicalDirector,
  User,
  Vehicle,
} from './entities'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [Appointment, Client, Employee, Mechanic, TechnicalDirector, User, Vehicle],
  migrations: [],
  subscribers: [],
})
