import { Repository } from 'typeorm'

import { AppDataSource } from '../db'
import { Employee } from '../entities/Employee'

export default class EmployeeService {
  private employeeRepository: Repository<Employee>

  constructor() {
    this.employeeRepository = AppDataSource.getRepository(Employee)
  }

  async create(data: Partial<Employee>): Promise<Employee> {
    const employee = new Employee()

    employee.name = data.name
    employee.dni = data.dni

    return await this.employeeRepository.save(employee)
  }

  async get(id: number): Promise<Employee> {
    return this.employeeRepository.findOneBy({
      id,
    })
  }

  async update(data: Partial<Employee>): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({
      id: data.id,
    })

    return await this.employeeRepository.save(employee)
  }

  async delete(id: number): Promise<void> {
    await this.employeeRepository.delete(id)
  }
}
