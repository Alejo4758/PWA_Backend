import prisma from "../../../prisma/prismaClient.js"

export const getFavorites = async (req, res, next) => {
  try {
    return res.status(501).json({ message: 'Listado de favoritos aún no implementado.' });
  } catch (error) {
    next(error);
  }
};

// controllers/favorites/index.js
export const addFavorite = async (req, res, next) => {
  try {
    const idProducto = parseInt(req.params.id); // El ID del reloj viene en la URL
    const idUsuario = req.idUsuario;            // Del token

    // 1. Verificar que el reloj exista (usando el modelo Reloj)
    const reloj = await prisma.reloj.findUnique({
      where: { id: idProducto },
    });

    if (!reloj) {
      return res.status(404).json({ error: 'Reloj no encontrado' });
    }

    // 2. Crear el favorito usando connect para ambas relaciones
    const nuevoFavorito = await prisma.favorito.create({
      data: {
        usuario: { connect: { id: idUsuario } },
        reloj: { connect: { id: idProducto } },
      },
      include: { reloj: true },
    });

    return res.status(201).json({
      mensaje: 'Reloj agregado a favoritos',
      favorito: nuevoFavorito,
    });
  } catch (error) {
    // Si el favorito ya existe (viola la restricción unique)
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Conflicto',
        message: 'Este reloj ya está en tus favoritos',
      });
    }
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    return res.status(501).json({ message: 'Eliminar favorito aún no implementado.' });
  } catch (error) {
    next(error);
  }
};
