// src/index.js
import express from 'express'
import http from 'http'
import bodyPaser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'

import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app = express()

app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://localhost:5173',
      'https://cba.pictusweb.sk',
      'https://pictusweb.sk',
      'https://cestazivota.sk',
      'https://ioana-illustrations.eu',
      'https://ecommerce.pictusweb.sk',
      'https://katolickaviera.sk',
      'https://svedkovia.sk',
      'https://duhovyrod.sk',
      'https://md.pictusweb.sk',
      'https://michaldovala.sk',
    ],
  })
)

app.use(compression())
app.use(cookieParser())
app.use(bodyPaser.json())

const server = http.createServer(app)

const PORT = process.env.PORT || 3010

server.listen(PORT, () => {
  console.log(`Server is really running on http://localhost:${PORT}/`)
})

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())

// app.use(express.json())
// app.use('/uploads', express.static(path.resolve('uploads')))

// app.use('/api/md')

// app.get('/', (req: Request, res: Response) => {
//   res.send('My super Express + TypeScript Server')
// })
