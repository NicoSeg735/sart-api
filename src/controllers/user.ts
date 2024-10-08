import { Request, Response } from 'express'

import UserService from '../services/user'

export default class UserController {
  private userService = new UserService()

  constructor() {
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.create(req.body)

      return res.status(201).json(user)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query
      const user = await this.userService.get(Number(id))
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.update(req.body)

      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.query

      await this.userService.delete(Number(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
