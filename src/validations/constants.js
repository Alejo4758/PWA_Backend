/**
 * Constantes de validación - Enums y valores permitidos centralizados
 */

export const WATER_RESISTANCE = {
  NO_RESISTANT: 'No resistente',
  WATER_RESISTANT: 'Resistente al agua',
  ATM_3: 'Resistente 3ATM',
  ATM_5: 'Resistente 5ATM',
  ATM_10: 'Resistente 10ATM',
  SUBMERSIBLE: 'Sumergible'
};

export const WATCH_CATEGORY = {
  CASUAL: 'Casual',
  SPORTS: 'Deportivo',
  CLASSIC: 'Clásico',
  MODERN: 'Moderno',
  LUXURY: 'Lujo'
};

export const WATER_RESISTANCE_VALUES = Object.values(WATER_RESISTANCE);
export const WATCH_CATEGORY_VALUES = Object.values(WATCH_CATEGORY);

export const FIELD_TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  ARRAY: 'array'
};

export const URL_PATTERN = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
