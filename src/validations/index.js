/**
 * Módulo de validación - Punto de entrada
 * Orquesta la validación de datos según esquemas definidos
 */

import { relojSchema } from './schemas.js';
import {
  createError,
  validateRequired,
  validateType,
  validateEnum,
  validateMinLength,
  validateMaxLength,
  validateMin,
  validateMax,
  validatePattern,
  validateCustom
} from './validators.js';

/**
 * Valida datos según un esquema de validación definido
 * @param {Object} data - Datos a validar (típicamente req.body)
 * @param {Object} schema - Esquema de validación
 * @param {boolean} strict - Si true, rechaza campos no definidos en el schema
 * @returns {Array} Array de errores con formato { field, message }
 */
export const validar = (data, schema, strict = true) => {
  const errors = [];

  // Validar que el objeto exista y no esté vacío
  if (!data || Object.keys(data).length === 0) {
    return [createError('general', 'El objeto no puede estar vacío')];
  }

  // Validar que no haya campos desconocidos (modo strict)
  if (strict) {
    const unknownFields = Object.keys(data).filter(field => !schema[field]);
    if (unknownFields.length > 0) {
      errors.push(
        createError('general', `Campos no permitidos: ${unknownFields.join(', ')}`)
      );
    }
  }

  // Validar cada campo según el esquema
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    // Validar campo obligatorio
    if (rules.required) {
      const requiredError = validateRequired(field, value);
      if (requiredError) {
        errors.push(requiredError);
        continue; // Skip remaining validations for this field
      }
    }

    // Si el valor no existe y no es obligatorio, pasar al siguiente campo
    if (value === undefined || value === null) {
      continue;
    }

    // Validar tipo de dato
    if (rules.type) {
      const typeError = validateType(field, value, rules.type);
      if (typeError) {
        errors.push(typeError);
        continue; // Skip remaining validations for this field
      }
    }

    // Validar valores permitidos (enum)
    if (rules.enum) {
      const enumError = validateEnum(field, value, rules.enum);
      if (enumError) {
        errors.push(enumError);
      }
    }

    // Validar longitud mínima (strings)
    if (rules.minLength !== undefined) {
      const minLengthError = validateMinLength(field, value, rules.minLength);
      if (minLengthError) {
        errors.push(minLengthError);
      }
    }

    // Validar longitud máxima (strings)
    if (rules.maxLength !== undefined) {
      const maxLengthError = validateMaxLength(field, value, rules.maxLength);
      if (maxLengthError) {
        errors.push(maxLengthError);
      }
    }

    // Validar valor mínimo (números)
    if (rules.min !== undefined) {
      const minError = validateMin(field, value, rules.min);
      if (minError) {
        errors.push(minError);
      }
    }

    // Validar valor máximo (números)
    if (rules.max !== undefined) {
      const maxError = validateMax(field, value, rules.max);
      if (maxError) {
        errors.push(maxError);
      }
    }

    // Validar patrón (regex)
    if (rules.pattern) {
      const patternError = validatePattern(
        field,
        value,
        rules.pattern,
        rules.patternMessage
      );
      if (patternError) {
        errors.push(patternError);
      }
    }

    // Validación personalizada
    if (rules.custom) {
      const customError = validateCustom(field, value, rules.custom);
      if (customError) {
        errors.push(customError);
      }
    }
  }

  return errors;
};

/**
 * Valida un objeto reloj
 * @param {Object} data - Datos del reloj a validar
 * @param {boolean} strict - Si true, rechaza campos no definidos
 * @returns {Array} Array de errores
 */
export const validarReloj = (data, strict = true) => {
  return validar(data, relojSchema, strict);
};

// Exportar esquemas y constantes para uso externo si es necesario
export { relojSchema } from './schemas.js';
export {
  WATER_RESISTANCE,
  WATCH_CATEGORY,
  WATER_RESISTANCE_VALUES,
  WATCH_CATEGORY_VALUES
} from './constants.js';
