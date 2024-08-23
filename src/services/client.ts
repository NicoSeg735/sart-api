import { Repository } from 'typeorm'

import { AppDataSource } from '../db'
import { Client } from '../entities/Client'

type ClientData = Omit<Client, 'id'>

export default class ClientService {
  private clientRepository: Repository<Client>

  constructor() {
    this.clientRepository = AppDataSource.getRepository(Client)
  }

  async create(data: ClientData): Promise<Client> {
    const client = new Client()
    client.email = data.email
    client.name = data.name
    client.phone = data.phone

    return await this.clientRepository.save(client)
  }

  async get(id: number): Promise<Client> {
    return this.clientRepository.findOneBy({
      id,
    })
  }

  async update(data: Partial<Client>): Promise<Client> {
    const client = await this.clientRepository.findOneBy({
      id: data.id,
    })

    if (!client) {
      throw new Error('Client not found')
    }

    client.email = data.email
    client.name = data.name
    client.phone = data.phone

    return await this.clientRepository.save(client)
  }

  async delete(id: number): Promise<void> {
    const client = await this.clientRepository.findOne({
      where: {
        id,
      },
      relations: ['vehicle'],
    })

    if (!client) {
      throw new Error('Client not found')
    }

    await this.clientRepository.remove(client)
  }
}
