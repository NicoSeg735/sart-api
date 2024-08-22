import 'reflect-metadata'

import express from 'express'

import { AppDataSource } from './db'

const app = express()
const port = 4000

async function main() {
  try {
    await AppDataSource.initialize().then(() => {
      console.log('Database connected')
      app.listen(port)
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main()
