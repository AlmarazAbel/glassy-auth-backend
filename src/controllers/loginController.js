
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'El email y la contraseña son obligatorios',
      })
    }

    // Buscar usuario incluyendo su contraseña encriptada
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas',
      })
    }

    // Comparar contraseña
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas',
      })
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    )

    // Enviar token mediante cookie HttpOnly
   res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000,
})

    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Error en login:', error)

    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
