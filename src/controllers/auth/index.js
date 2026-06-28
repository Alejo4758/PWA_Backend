import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../../prisma/prismaClient.js';

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

export const register = async (req, res, next) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    const errors = [];

    if (!nombre || nombre.trim () === '') {
      errors.push({ field: 'nombre', message: 'El nombre es obligatorio' });
    }
    if (!apellido || apellido.trim () === '') {
      errors.push({ field: 'apellido', message: 'El apellido es obligatorio' });
    }
    if (!email || email.trim () === '') {
      errors.push({ field: 'email', message: 'El email es obligatorio' });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test (email)) {
        errors.push ({ field: 'email', message: 'Formato de email inválido' });
      }
    }
    if (!password || password.trim () === '') {
      errors.push ({ field: 'password', message: 'La contraseña es obligatoria' });
    } else if (password.length < 6) {
      errors.push ({ field: 'password', message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (errors.length > 0) {
      return res.status (400).json ({
        error: 'Datos inválidos',
        details: errors,
      });
    }

    const existingUser = await prisma.usuario.findUnique ({
      where: { email },
    });

    if (existingUser) {
      return res.status (409).json ({
        error: 'Conflict',
        message: 'El email ya está registrado',
      });
    }

    const hashedPassword = await bcrypt.hash (password, 10);

    const newUser = await prisma.usuario.create ({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status (201).json ({
      mensaje: 'Usuario registrado exitosamente',
      usuario: newUser,
    });
  } catch (error) {
    next (error);
  }
};