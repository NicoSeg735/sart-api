import { Repository } from 'typeorm'

import { AppDataSource } from '../db'
import { Appointment } from '../entities/Appointment'
import EmployeeService from './employee'
import VehicleService from './vehicle'

type AppointmentData = Omit<Appointment, 'id'> & {
  vehicleId: number
  mechanicId: number
}

export default class AppointmentService {
  private appointmentRepository: Repository<Appointment>
  private vehicleService: VehicleService
  private employeeService: EmployeeService

  constructor() {
    this.appointmentRepository = AppDataSource.getRepository(Appointment)
    this.vehicleService = new VehicleService()
    this.employeeService = new EmployeeService()
  }

  async create(data: AppointmentData): Promise<Appointment> {
    const vehicle = await this.vehicleService.get(data.vehicleId)

    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    // const mechanic = await this.employeeService.get(data.mechanicId)

    const appointment = new Appointment()
    appointment.date = data.date ?? new Date()
    appointment.documentations = data.documentations !== undefined ? data.documentations : false
    appointment.estimatedPrice = data.estimatedPrice
    appointment.status = data.status ?? false
    appointment.vehicle = vehicle

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

    return await this.appointmentRepository.save(appointment)
  }

  async delete(id: number): Promise<void> {
    await this.appointmentRepository.delete(id)
  }
}
