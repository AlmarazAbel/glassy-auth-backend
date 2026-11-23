
import mongoose from 'mongoose'
import dns from 'node:dns'

// Utilizar DNS de Google para resolver los registros de MongoDB Atlas
dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Base de datos conectada:', mongoose.connection.name)

    console.log('MongoDB conectado correctamente')
  } catch (error) {
    console.error('Error al conectar MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB
