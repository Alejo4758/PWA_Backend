import * as relojService from '../services/RelojService.js';

export const obtenerRelojes = async (req, res) => {
  try {
    const relojes = await relojService.obtenerTodos();
    res.json(relojes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el catálogo' });
  }
};

export const obtenerRelojPorId = async (req, res) => {
  try {
    const reloj = await relojService.obtenerPorId(req.params.id);
    res.json(reloj);
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Pieza no encontrada en la base de datos' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const crearReloj = async (req, res) => {
  try {
    const nuevoReloj = await relojService.crear(req.body);
    res.status(201).json(nuevoReloj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el reloj' });
  }
};

export const actualizarReloj = async (req, res) => {
  try {
    const relojActualizado = await relojService.actualizar(req.params.id, req.body);
    res.json(relojActualizado);
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'No se puede actualizar: Pieza no encontrada' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el reloj' });
  }
};

export const eliminarReloj = async (req, res) => {
  try {
    await relojService.eliminar(req.params.id);
    res.json({ mensaje: 'Reloj eliminado exitosamente del catálogo' });
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'No se puede eliminar: Pieza no encontrada' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el reloj' });
  }
};