import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ error: 'Configuración de JWT incompleta' });
    }

    const decoded = jwt.verify(token, secret);

    if (!decoded || !decoded.idUsuario) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.idUsuario = decoded.idUsuario;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    next(error);
  }
};
