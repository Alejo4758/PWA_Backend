import prisma from '../../prisma/prismaClient.js';

export const obtenerRelojes = async (req, res) => {
  try {
    const relojes = await prisma.reloj.findMany();
    res.json(relojes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el catálogo' });
  }
};

export const crearReloj = async (req, res) => {
  try {
    const nuevoReloj = await prisma.reloj.create({
      data: req.body
    });
    res.status(201).json(nuevoReloj);
  } catch (error) {
    console.error('Error al insertar pieza:', error);
    res.status(500).json({ error: 'Error al guardar el reloj en la base de datos' });
  }
};