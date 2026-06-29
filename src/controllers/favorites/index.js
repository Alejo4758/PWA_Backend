import prisma from "../../../prisma/prismaClient.js"

export const getFavorites = async (req, res, next) => {
  try {
    const idUsuario = req.idUsuario;

    const favoritos = await prisma.favorito.findMany({
      where: { idUsuario },
      include: {
        reloj: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      mensaje: 'Favoritos obtenidos correctamente',
      favoritos,
    });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const idProducto = parseInt(req.params.id);
    const idUsuario = req.idUsuario;

    const reloj = await prisma.reloj.findUnique({
      where: { id: idProducto },
    });

    if (!reloj) {
      return res.status(404).json({ error: 'Reloj no encontrado' });
    }

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
    const idProducto = parseInt(req.params.id);
    const idUsuario = req.idUsuario;

    if (isNaN(idProducto)) {
      return res.status(400).json({ error: 'El ID del producto es inválido' });
    }

    const favoritosExistente = await prisma.favorito.findFirst({
      where: {
        idUsuario: idUsuario,
        idProducto: idProducto
      }
    });

    if (!favoritosExistente) {
      return res.status(404).json({
        error: 'No Encontrado',
        message: 'El Favorito no Existe para este Usuario'
      });
    }

    await prisma.favorito.delete({
      where: {
        id: favoritosExistente.id
      }
    });

    return res.status(200).json({
      mensaje: 'Favorito Eliminado Correctamente'
    })

  } catch (error) {
    next(error);
  }
};
