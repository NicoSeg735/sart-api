import { Request, Response } from 'express'

import MechanicService from '../services/mechanic'

export default class MechanicController {
  private mechanicService = new MechanicService()

  constructor() {
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getAvailableMechanics = this.getAvailableMechanics.bind(this)
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const mechanic = await this.mechanicService.create(req.body)

      return res.status(201).json(mechanic)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query
      const mechanic = await this.mechanicService.get(Number(id))

      if (!mechanic) {
        return res.status(404).json({ error: 'Mechanic not found' })
      }

      return res.status(200).json(mechanic)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const mechanic = await this.mechanicService.update(req.body)

      return res.status(200).json(mechanic)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query

      await this.mechanicService.delete(Number(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async getAvailableMechanics(req: Request, res: Response): Promise<Response> {
    const { dateTime } = req.query

    if (!dateTime) {
      return res.status(400).json({ message: 'dateTime is required' })
    }

    // Expresión regular para verificar formato ISO 8601
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?$/

    if (!iso8601Regex.test(dateTime as string)) {
      return res.status(400).json({ message: 'Invalid dateTime format' })
    }

    const parsedDate = new Date(dateTime as string)
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid dateTime value' })
    }

    try {
      const mechanics = await this.mechanicService.findAvailableMechanics(dateTime as string)
      return res.status(200).json(mechanics)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
