/**
 * Esquemas de validación para los diferentes modelos
 */

import {
  WATER_RESISTANCE_VALUES,
  WATCH_CATEGORY_VALUES,
  URL_PATTERN
} from './constants.js';

/**
 * Esquema de validación para Reloj
 * Define reglas para cada campo del modelo
 */
export const relojSchema = {
  nombre: {
    required: true,
    type: 'string',
    minLength: 3,
    maxLength: 100
  },
  marca: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 50
  },
  precio: {
    required: true,
    type: 'number',
    min: 0
  },
  materiales: {
    required: false,
    type: 'array'
  },
  imagen: {
    required: true,
    type: 'string',
    pattern: URL_PATTERN,
    patternMessage: 'La imagen debe ser una URL válida con extensión jpg, jpeg, png, gif o webp'
  },
  resistencia_agua: {
    required: false,
    type: 'string',
    enum: WATER_RESISTANCE_VALUES
  },
  categoria: {
    required: false,
    type: 'string',
    enum: WATCH_CATEGORY_VALUES
  },
  stock: {
    required: true,
    type: 'number',
    min: 0
  },
  destacado: {
    required: false,
    type: 'boolean'
  },
  detalles_breve: {
    required: true,
    type: 'string',
    minLength: 10,
    maxLength: 200
  },
  detalles: {
    required: true,
    type: 'string',
    minLength: 20,
    maxLength: 2000
  }
};
