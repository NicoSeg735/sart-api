import { Request, Response } from 'express'

import AppointmentService from '../services/appointment'

export default class AppointmentController {
  private appointmentService = new AppointmentService()

  constructor() {
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const appointment = await this.appointmentService.create(req.body)

      return res.status(201).json(appointment)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query
      const appointment = await this.appointmentService.get(Number(id))

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' })
      }

      return res.status(200).json(appointment)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const appointment = await this.appointmentService.update(req.body)

      return res.status(200).json(appointment)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query

      await this.appointmentService.delete(Number(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
