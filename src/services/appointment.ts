import { IsNull, MoreThanOrEqual, Repository } from 'typeorm'

import { AppDataSource } from '../db'
import { Mechanic } from '../entities'
import { Appointment } from '../entities/Appointment'
import MechanicService from './mechanic'
import VehicleService from './vehicle'

type AppointmentData = Omit<Appointment, 'id'> & {
  vehicleId: number
  mechanicId: number
}

export default class AppointmentService {
  private appointmentRepository: Repository<Appointment>
  private vehicleService: VehicleService
  private mechanicService: MechanicService

  constructor() {
    this.appointmentRepository = AppDataSource.getRepository(Appointment)
    this.vehicleService = new VehicleService()
    this.mechanicService = new MechanicService()
  }

  async create(data: AppointmentData): Promise<Appointment> {
    const vehicle = await this.vehicleService.get(data.vehicleId)

    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    let mechanic: Mechanic

    if (data.mechanicId) {
      mechanic = await this.mechanicService.get(data.mechanicId)
    }

    const appointment = new Appointment()
    appointment.date = data.date ?? new Date()
    appointment.documentations = data.documentations !== undefined ? data.documentations : false
    appointment.estimatedPrice = data.estimatedPrice
    appointment.status = data.status ?? false
    appointment.vehicle = vehicle
    appointment.mechanic = mechanic

    return await this.appointmentRepository.save(appointment)
  }

  async get(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOneBy({
      id,
    })
  }

  async update(data: Partial<Appointment>): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({
      id: data.id,
    })

    appointment.date = data.date
    appointment.documentations = data.documentations
    appointment.estimatedPrice = data.estimatedPrice
    appointment.status = data.status
    appointment.vehicle = data.vehicle
    appointment.mechanic = data.mechanic

    return await this.appointmentRepository.save(appointment)
  }

  async delete(id: number): Promise<void> {
    await this.appointmentRepository.delete(id)
  }

  async getList(params?: Record<string, any>): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: {
        date: MoreThanOrEqual(params.startDate),
        status: false,
        mechanic: params.mechanic === 'null' ? IsNull() : params.mechanic,
      },
      relations: ['vehicle', 'mechanic'],
    })
  }
}
