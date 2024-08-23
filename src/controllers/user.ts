import { Request, Response } from 'express'

import UserService from '../services/user'

export default class UserController {
  private userService = new UserService()

  constructor() {
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
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
      const user = await this.userService.get(Number(req.params.id))
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
