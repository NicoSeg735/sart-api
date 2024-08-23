import { Request, Response } from 'express'

import ClientService from '../services/client'

export default class ClientController {
  private clientService = new ClientService()

  constructor() {
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const client = await this.clientService.create(req.body)

      return res.status(201).json(client)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query
      const client = await this.clientService.get(Number(id))

      if (!client) {
        return res.status(404).json({ error: 'Client not found' })
      }

      return res.status(200).json(client)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const client = await this.clientService.update(req.body)

      return res.status(200).json(client)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query

      await this.clientService.delete(Number(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
