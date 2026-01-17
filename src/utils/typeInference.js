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

export const isPrimitive = (value) => {
  const type = inferType(value);
  return ['string', 'number', 'boolean', 'null'].includes(type);
};

export const isComplex = (value) => {
  const type = inferType(value);
  return ['object', 'array'].includes(type);
};
