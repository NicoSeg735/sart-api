import { Repository } from 'typeorm'

import { AppDataSource } from '../db'
import { Mechanic } from '../entities/Mechanic'
import UserService from './user'

type MechanicData = Omit<Mechanic, 'id'>

export default class MechanicService {
  private mechanicRepository: Repository<Mechanic>
  private userService: UserService

  constructor() {
    this.mechanicRepository = AppDataSource.getRepository(Mechanic)
    this.userService = new UserService()
  }

  async create(data: MechanicData): Promise<Mechanic> {
    const mechanic = new Mechanic()

    mechanic.name = data.name
    mechanic.dni = data.dni

    const user = await this.userService.create({
      email: data.user.email,
      password: data.user.password,
    })

    if (!user) {
      throw new Error('User not created')
    }

    mechanic.user = user

    return await this.mechanicRepository.save(mechanic)
  }

  async get(id: number): Promise<Mechanic> {
    return this.mechanicRepository.findOneBy({
      id,
    })
  }

  async update(data: Partial<Mechanic>): Promise<Mechanic> {
    const mechanic = await this.mechanicRepository.findOne({
      where: {
        id: data.id,
      },
      relations: ['user'],
    })

    if (!mechanic) {
      throw new Error('Mechanic not found')
    }

    mechanic.name = data.name
    mechanic.dni = data.dni

    if (data.user) {
      mechanic.user.email = data.user.email
      mechanic.user.password = data.user.password
    }

    return await this.mechanicRepository.save(mechanic)
  }

  async delete(id: number): Promise<void> {
    const mechanic = await this.mechanicRepository.findOne({
      where: { id },
      relations: ['user'],
    })

    if (!mechanic) {
      throw new Error('Mechanic not found')
    }

    const user = await this.userService.get(mechanic.user.id)

    if (!user) {
      throw new Error('User not found')
    }

    await this.userService.delete(user.id)

    await this.mechanicRepository.delete(id)
  }

  async findAvailableMechanics(dateTime: string): Promise<Mechanic[]> {
    const availableMechanics = await this.mechanicRepository
      .createQueryBuilder('mechanic')
      .leftJoinAndSelect('mechanic.appointments', 'appointment')
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('Appointment', 'appointment')
          .where('appointment.mechanicId = mechanic.id')
          .andWhere('appointment.date = :dateTime', { dateTime })
          .getQuery()
        return `NOT EXISTS (${subQuery})`
      })
      .getMany()

    return availableMechanics
  }
}
