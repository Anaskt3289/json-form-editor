import React from 'react';
import { inferType } from '../../utils/typeInference.js';
import styles from './FormField.module.css';

/**
 * FormField Component
 * Renders the appropriate input component based on the inferred type
 * This is a pure component that doesn't handle state - parent manages it
 */
export const FormField = ({ value, onChange, path, readOnly = false, label }) => {
  const type = inferType(value);
  const fieldPath = path.join('.');

  const handleChange = (newValue) => {
    // Convert string inputs to appropriate types
    if (type === 'number' && typeof newValue === 'string') {
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        onChange(numValue);
      } else {
        onChange(newValue); // Keep as string if invalid number
      }
    } else {
      onChange(newValue);
    }
  };

  // Render based on inferred type
  switch (type) {
    case 'string':
      return (
        <div className={styles.fieldContainer}>
          {label && <label className={styles.label}>{label}</label>}
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={styles.input}
            disabled={readOnly}
            placeholder="Enter text..."
          />
        </div>
      );

    case 'number':
      return (
        <div className={styles.fieldContainer}>
          {label && <label className={styles.label}>{label}</label>}
          <input
            type="number"
            value={value ?? ''}
            onChange={(e) => handleChange(e.target.value)}
            className={styles.input}
            disabled={readOnly}
            placeholder="Enter number..."
          />
        </div>
      );

    case 'boolean':
      return (
        <div className={styles.fieldContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={value === true}
              onChange={(e) => handleChange(e.target.checked)}
              className={styles.checkbox}
              disabled={readOnly}
            />
            <span>{label || fieldPath}</span>
          </label>
        </div>
      );

    case 'null':
      return (
        <div className={styles.fieldContainer}>
          {label && <label className={styles.label}>{label}</label>}
          <div className={styles.nullValue}>null</div>
        </div>
      );

    default:
      return null;
  }
};
