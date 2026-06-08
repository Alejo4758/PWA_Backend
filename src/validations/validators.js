/**
 * Funciones helper para validación - Lógica reutilizable
 */

/**
 * Crea un objeto error estandarizado
 */
export const createError = (field, message) => ({
  field,
  message
});

/**
 * Valida que el tipo de dato sea correcto
 */
export const isValidType = (value, expectedType) => {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
};

/**
 * Valida un campo obligatorio
 */
export const validateRequired = (field, value) => {
  if (value === undefined || value === null) {
    return createError(field, `El campo ${field} es obligatorio`);
  }

  if (typeof value === 'string' && value.trim() === '') {
    return createError(field, `El campo ${field} no puede ser un string vacío`);
  }

  return null;
};

/**
 * Valida tipo de dato
 */
export const validateType = (field, value, expectedType) => {
  if (!isValidType(value, expectedType)) {
    return createError(field, `El campo ${field} debe ser de tipo ${expectedType}`);
  }
  return null;
};

/**
 * Valida valores permitidos (enum)
 */
export const validateEnum = (field, value, allowedValues) => {
  if (!allowedValues.includes(value)) {
    return createError(
      field,
      `El campo ${field} solo acepta los siguientes valores: ${allowedValues.join(', ')}`
    );
  }
  return null;
};

/**
 * Valida longitud mínima de string
 */
export const validateMinLength = (field, value, minLength) => {
  if (typeof value === 'string' && value.length < minLength) {
    return createError(
      field,
      `El campo ${field} debe tener al menos ${minLength} caracteres`
    );
  }
  return null;
};

/**
 * Valida longitud máxima de string
 */
export const validateMaxLength = (field, value, maxLength) => {
  if (typeof value === 'string' && value.length > maxLength) {
    return createError(
      field,
      `El campo ${field} no puede tener más de ${maxLength} caracteres`
    );
  }
  return null;
};

/**
 * Valida valor mínimo de número
 */
export const validateMin = (field, value, minValue) => {
  if (typeof value === 'number' && value < minValue) {
    return createError(
      field,
      `El campo ${field} debe ser mayor o igual a ${minValue}`
    );
  }
  return null;
};

/**
 * Valida valor máximo de número
 */
export const validateMax = (field, value, maxValue) => {
  if (typeof value === 'number' && value > maxValue) {
    return createError(
      field,
      `El campo ${field} debe ser menor o igual a ${maxValue}`
    );
  }
  return null;
};

/**
 * Valida patrón regex
 */
export const validatePattern = (field, value, pattern, customMessage) => {
  if (typeof value === 'string' && !pattern.test(value)) {
    return createError(
      field,
      customMessage || `El formato del campo ${field} no es válido`
    );
  }
  return null;
};

/**
 * Valida con función personalizada
 */
export const validateCustom = (field, value, validatorFn) => {
  if (typeof validatorFn !== 'function') return null;
  
  const errorMessage = validatorFn(value);
  return errorMessage ? createError(field, errorMessage) : null;
};
