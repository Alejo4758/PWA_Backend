import * as relojService from '../services/RelojService.js';
import { validarReloj } from '../validations/index.js';

export const obtenerRelojes = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    const nombre = req.query.nombre || '';

    const relojes = await relojService.obtenerTodos({ page, limit, nombre });
    res.status(200).json(relojes);
  } catch (error) {
    next(error);
  }
};

export const obtenerRelojPorId = async (req, res, next) => {
  try {
    const reloj = await relojService.obtenerPorId(req.params.id);
    res.status(200).json(reloj);
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Pieza no encontrada en la base de datos' });
    }
    next(error);
  }
};

export const crearReloj = async (req, res, next) => {
  try {
    const errors = validarReloj(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Datos inválidos', details: errors });
    }

    const nuevoReloj = await relojService.crear(req.body);
    res.status(201).json(nuevoReloj);
  } catch (error) {
    next(error);
  }
};

export const actualizarReloj = async (req, res, next) => {
  try {
    const errors = validarReloj(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Datos inválidos', details: errors });
    }

    const relojActualizado = await relojService.actualizar(req.params.id, req.body);
    res.status(200).json(relojActualizado);
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'No se puede actualizar: Pieza no encontrada' });
    }
    next(error);
  }
};

export const eliminarReloj = async (req, res, next) => {
  try {
    await relojService.eliminar(req.params.id);
    res.json({ mensaje: 'Reloj eliminado exitosamente del catálogo' });
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'No se puede eliminar: Pieza no encontrada' });
    }
    next(error);
  }
};