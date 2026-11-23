
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/database.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

// Configuración de CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.CLIENT_URL,
  ].filter(Boolean),
  credentials: true,
}))

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Rutas
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Glassy Auth API funcionando correctamente',
  })
})

const PORT = process.env.PORT || 3000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
  })
}

startServer()
