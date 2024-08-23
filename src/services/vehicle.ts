import { Repository } from 'typeorm'

import { AppDataSource } from '../db'
import { Vehicle } from '../entities/Vehicle'

export default class VehicleService {
  private vehicleRepository: Repository<Vehicle>

  constructor() {
    this.vehicleRepository = AppDataSource.getRepository(Vehicle)
  }

  async create(data: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = new Vehicle()
    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.type = data.type
    vehicle.category = data.category
    vehicle.licensePlate = data.licensePlate
    vehicle.client = data.client

    return await this.vehicleRepository.save(vehicle)
  }

  async get(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOneBy({
      id,
    })
  }

  async update(data: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOneBy({
      id: data.id,
    })

    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.type = data.type
    vehicle.category = data.category
    vehicle.licensePlate = data.licensePlate
    vehicle.client = data.client

    return await this.vehicleRepository.save(vehicle)
  }

  async delete(id: number): Promise<void> {
    await this.vehicleRepository.delete(id)
  }
}
