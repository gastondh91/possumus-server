import 'dotenv/config'
import express from 'express'
import path from 'path'
import routes from './routes'
import { clientDefaultPath } from './utils'

const cors = require('cors')

class App {
  public server

  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use(express.static(path.join(__dirname, clientDefaultPath)))
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
