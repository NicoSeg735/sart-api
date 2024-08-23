import { Repository } from 'typeorm'

import { AppDataSource } from '../db'
import { User } from '../entities/User'

export default class UserService {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async create(data: Partial<User>): Promise<User> {
    const user = new User()
    user.email = data.email
    user.password = data.password

    return await this.userRepository.save(user)
  }

  async get(id: number): Promise<User> {
    return this.userRepository.findOneBy({
      id,
    })
  }
}
