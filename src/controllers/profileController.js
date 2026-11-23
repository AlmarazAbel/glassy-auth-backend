
import User from '../models/User.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil obtenido correctamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Error al obtener perfil:', error)

    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
}
