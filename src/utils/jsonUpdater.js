export const updateNestedPath = (obj, path, value) => {
  // Handle null/undefined root
  if (obj === null || obj === undefined) {
    return value;
  }

  // Base case: empty path means we're at the target
  if (path.length === 0) {
    return value;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    const newArray = [...obj];
    const [first, ...rest] = path;
    const index = parseInt(first, 10);

    if (isNaN(index)) {
      throw new Error(`Invalid array index: ${first}`);
    }

    if (rest.length === 0) {
      // Direct array element update
      newArray[index] = value;
    } else {
      // Nested update within array element
      newArray[index] = updateNestedPath(obj[index], rest, value);
    }

    return newArray;
  }

  // Handle objects
  if (typeof obj === 'object') {
    const [first, ...rest] = path;
    const newObj = { ...obj };

    if (rest.length === 0) {
      // Direct property update
      newObj[first] = value;
    } else {
      // Nested update
      newObj[first] = updateNestedPath(obj[first], rest, value);
    }

    return newObj;
  }

  // Primitive value - replace entirely
  return value;
};

/**
 * Deletes a nested value from a JSON object using a path array
 * @param {Object|Array} obj - The object/array to delete from
 * @param {Array<string|number>} path - Array of keys/indexes representing the path
 * @returns {Object|Array} A new object/array with the value removed
 */
export const deleteNestedPath = (obj, path) => {
  if (path.length === 0) {
    return undefined;
  }

  if (Array.isArray(obj)) {
    const newArray = [...obj];
    const [first, ...rest] = path;
    const index = parseInt(first, 10);

    if (isNaN(index)) {
      throw new Error(`Invalid array index: ${first}`);
    }

    if (rest.length === 0) {
      // Remove array element
      newArray.splice(index, 1);
      return newArray;
    } else {
      // Recursive delete within array element
      newArray[index] = deleteNestedPath(obj[index], rest);
      return newArray;
    }
  }

  if (typeof obj === 'object' && obj !== null) {
    const [first, ...rest] = path;
    const newObj = { ...obj };

    if (rest.length === 0) {
      // Remove property
      delete newObj[first];
      return newObj;
    } else {
      // Recursive delete
      newObj[first] = deleteNestedPath(obj[first], rest);
      return newObj;
    }
  }

  return obj;
};

/**
 * Gets a nested value from a JSON object using a path array
 * @param {Object|Array} obj - The object/array to read from
 * @param {Array<string|number>} path - Array of keys/indexes representing the path
 * @returns {*} The value at the path, or undefined if not found
 */
export const getNestedPath = (obj, path) => {
  if (path.length === 0) {
    return obj;
  }

  let current = obj;
  for (const key of path) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[key];
  }

  return current;
};

/**
 * Converts a path array to a readable string representation
 * @param {Array<string|number>} path - The path array
 * @returns {string} String representation (e.g., "server.port" or "items[0].name")
 */
export const pathToString = (path) => {
  if (path.length === 0) {
    return 'root';
  }

  return path
    .map((key, index) => {
      if (typeof key === 'number') {
        return `[${key}]`;
      }
      return index === 0 ? key : `.${key}`;
    })
    .join('');
};
