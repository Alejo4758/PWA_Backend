import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'El email y la contraseña son obligatorios' 
      });
    }

    const usuario = await prisma.usuario.findUnique({ 
      where: { email } 
    });

    if (!usuario) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValida) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    const token = jwt.sign(
      { idUsuario: usuario.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    const { password: _, ...datosUsuario } = usuario;

    res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      usuario: datosUsuario
    });

  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.status(200).json({ 
    mensaje: 'Sesión cerrada exitosamente' 
  });
};
