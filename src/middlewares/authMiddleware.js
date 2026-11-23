
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    // Obtener token desde la cookie
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No estás autenticado',
      })
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Guardar ID del usuario en la petición
    req.userId = decoded.id

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    })
  }
}
