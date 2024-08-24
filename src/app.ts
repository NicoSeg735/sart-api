import 'reflect-metadata'

import cors from 'cors'
import express from 'express'

import { AppDataSource } from './db'
import routes from './routes'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())

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
