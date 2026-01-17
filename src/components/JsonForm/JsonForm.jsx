import React, { useState } from 'react';
import { inferType, isPrimitive } from '../../utils/typeInference.js';
import { updateNestedPath, deleteNestedPath, pathToString } from '../../utils/jsonUpdater.js';
import { FormField } from '../FormField/FormField.jsx';
import styles from './JsonForm.module.css';

export const JsonForm = ({
  data,
  onChange,
  path = [],
  readOnly = false,
  showPaths = true,
  label,
}) => {
  const [collapsed, setCollapsed] = useState({});
  const type = inferType(data);
  const fieldPath = pathToString(path);

  // Handle value changes - updates the nested path immutably
  const handleChange = (newValue) => {
    onChange(updateNestedPath(data, path, newValue));
  };

  // Handle nested object/array changes
  const handleNestedChange = (newValue) => {
    onChange(updateNestedPath(data, path, newValue));
  };

  // Toggle collapse state for objects/arrays
  const toggleCollapse = (key) => {
    setCollapsed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Render primitive values
  if (isPrimitive(data)) {
    return (
      <div className={styles.fieldWrapper}>
        {showPaths && <div className={styles.path}>{fieldPath}</div>}
        <FormField
          value={data}
          onChange={handleChange}
          path={path}
          readOnly={readOnly}
          label={label}
        />
      </div>
    );
  }

  // Render objects
  if (type === 'object') {
    const keys = Object.keys(data || {});
    const isCollapsed = collapsed[fieldPath];

    return (
      <div className={styles.objectContainer}>
        <div className={styles.objectHeader}>
          {label && <span className={styles.objectLabel}>{label}</span>}
          {showPaths && <span className={styles.path}>{fieldPath}</span>}
          <button
            type="button"
            onClick={() => toggleCollapse(fieldPath)}
            className={styles.collapseButton}
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? '▶' : '▼'}
          </button>
        </div>

        {!isCollapsed && (
          <div className={styles.objectContent}>
            {keys.length === 0 ? (
              <div className={styles.emptyObject}>Empty object</div>
            ) : (
              keys.map((key) => (
                <JsonForm
                  key={key}
                  data={data[key]}
                  onChange={handleNestedChange}
                  path={[...path, key]}
                  readOnly={readOnly}
                  showPaths={showPaths}
                  label={key}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // Render arrays
  if (type === 'array') {
    const items = data || [];
    const isCollapsed = collapsed[fieldPath];

    const handleItemChange = (index, newValue) => {
      const newArray = [...items];
      newArray[index] = newValue;
      handleNestedChange(newArray);
    };

    const handleAddItem = () => {
      // Infer type from existing items or default to empty object
      const itemType = items.length > 0 ? inferType(items[0]) : 'object';
      let newItem;

      switch (itemType) {
        case 'string':
          newItem = '';
          break;
        case 'number':
          newItem = 0;
          break;
        case 'boolean':
          newItem = false;
          break;
        case 'object':
          newItem = {};
          break;
        case 'array':
          newItem = [];
          break;
        default:
          newItem = null;
      }

      handleNestedChange([...items, newItem]);
    };

    const handleRemoveItem = (index) => {
      const newArray = items.filter((_, i) => i !== index);
      handleNestedChange(newArray);
    };

    return (
      <div className={styles.arrayContainer}>
        <div className={styles.arrayHeader}>
          {label && <span className={styles.arrayLabel}>{label}</span>}
          {showPaths && <span className={styles.path}>{fieldPath}</span>}
          <span className={styles.arrayCount}>({items.length} items)</span>
          <button
            type="button"
            onClick={() => toggleCollapse(fieldPath)}
            className={styles.collapseButton}
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? '▶' : '▼'}
          </button>
        </div>

        {!isCollapsed && (
          <div className={styles.arrayContent}>
            {items.length === 0 ? (
              <div className={styles.emptyArray}>Empty array</div>
            ) : (
              items.map((item, index) => (
                <div key={index} className={styles.arrayItem}>
                  <div className={styles.arrayItemHeader}>
                    <span className={styles.arrayIndex}>[{index}]</span>
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className={styles.removeButton}
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <JsonForm
                    data={item}
                    onChange={(newValue) => handleItemChange(index, newValue)}
                    path={[...path, index]}
                    readOnly={readOnly}
                    showPaths={showPaths}
                    label={`Item ${index + 1}`}
                  />
                </div>
              ))
            )}
            {!readOnly && (
              <button
                type="button"
                onClick={handleAddItem}
                className={styles.addButton}
              >
                + Add Item
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
};
