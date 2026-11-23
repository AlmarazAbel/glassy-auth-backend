
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validar campos obligatorios
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios',
      })
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 8 caracteres',
      })
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'El correo electrónico ya está registrado',
      })
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear usuario
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    })

    // Responder al cliente
    return res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error('Error en registro:', error)

    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
