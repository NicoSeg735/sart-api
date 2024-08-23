import 'reflect-metadata'

import express from 'express'

import { AppDataSource } from './db'
import routes from './routes'

const app = express()
const port = 4000

app.use(express.json())
app.use('/api', routes)

async function main() {
  try {
    await AppDataSource.initialize().then(() => {
      console.info('Database connected')
      app.listen(port)
      console.info(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main()
