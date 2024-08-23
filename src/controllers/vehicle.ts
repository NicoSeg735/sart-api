import { Request, Response } from 'express'

import VehicleService from '../services/vehicle'

export default class VehicleController {
  private vehicleService = new VehicleService()

  constructor() {
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const vehicle = await this.vehicleService.create(req.body)

      return res.status(201).json(vehicle)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query

      const vehicle = await this.vehicleService.get(Number(id))

      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' })
      }

      return res.status(200).json(vehicle)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const vehicle = await this.vehicleService.update(req.body)

      return res.status(200).json(vehicle)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query

      await this.vehicleService.delete(Number(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
