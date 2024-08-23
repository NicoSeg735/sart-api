import { Request, Response } from 'express'

import EmployeeService from '../services/employee'

export default class EmployeeController {
  private employeeService = new EmployeeService()

  constructor() {
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const employee = await this.employeeService.create(req.body)

      return res.status(201).json(employee)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query
      const employee = await this.employeeService.get(Number(id))

      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' })
      }

      return res.status(200).json(employee)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const employee = await this.employeeService.update(req.body)

      return res.status(200).json(employee)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query

      await this.employeeService.delete(Number(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
