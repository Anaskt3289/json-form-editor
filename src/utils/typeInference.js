/**
 * Type inference utility
 * Infers the data type from a JavaScript value at runtime
 * Returns: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null'
 */

/**
 * Infers the type of a value
 * @param {*} value - The value to infer the type from
 * @returns {string} The inferred type
 */
export const inferType = (value) => {
  if (value === null || value === undefined) {
    return 'null';
  }

  if (Array.isArray(value)) {
    return 'array';
  }

  const jsType = typeof value;

  // Handle special cases
  if (jsType === 'object') {
    return 'object';
  }

  return jsType; // 'string' | 'number' | 'boolean'
};

/**
 * Checks if a value is a primitive type (string, number, boolean, null)
 * @param {*} value - The value to check
 * @returns {boolean}
 */
export const isPrimitive = (value) => {
  const type = inferType(value);
  return ['string', 'number', 'boolean', 'null'].includes(type);
};

/**
 * Checks if a value is a complex type (object or array)
 * @param {*} value - The value to check
 * @returns {boolean}
 */
export const isComplex = (value) => {
  const type = inferType(value);
  return ['object', 'array'].includes(type);
};
