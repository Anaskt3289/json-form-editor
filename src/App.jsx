import React, { useState } from 'react';
import { JsonForm } from './components/JsonForm/JsonForm.jsx';
import { sampleConfig } from './sampleConfig.js';
import styles from './App.module.css';

/**
 * Main App Component
 * 
 * Manages the root JSON state and provides controls for:
 * - Read-only mode toggle
 * - Show/hide field paths
 * - Form submission
 * 
 * The state maintains the exact JSON structure, and updates
 * are handled immutably through the JsonForm component.
 */
function App() {
  // Initialize state with sample config
  const [config, setConfig] = useState(sampleConfig);
  const [readOnly, setReadOnly] = useState(false);
  const [showPaths, setShowPaths] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(config);
    console.log('Submitted JSON Configuration:', JSON.stringify(config, null, 2));
  };

  // Reset to original sample config
  const handleReset = () => {
    setConfig(sampleConfig);
    setSubmittedData(null);
  };

  // Handle root-level changes
  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    setSubmittedData(null); // Clear submission when config changes
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dynamic JSON Form Editor</h1>
        <p className={styles.subtitle}>
          Edit nested JSON configuration with automatic type inference
        </p>
      </header>

      <div className={styles.controls}>
        <label className={styles.controlLabel}>
          <input
            type="checkbox"
            checked={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
          <span>Read-only mode</span>
        </label>

        <label className={styles.controlLabel}>
          <input
            type="checkbox"
            checked={showPaths}
            onChange={(e) => setShowPaths(e.target.checked)}
          />
          <span>Show field paths</span>
        </label>

        <button
          type="button"
          onClick={handleReset}
          className={styles.resetButton}
        >
          Reset to Sample
        </button>
      </div>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContainer}>
            <JsonForm
              data={config}
              onChange={handleConfigChange}
              path={[]}
              readOnly={readOnly}
              showPaths={showPaths}
              label="Configuration"
            />
          </div>

          {!readOnly && (
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Submit Configuration
              </button>
            </div>
          )}
        </form>

        {submittedData && (
          <div className={styles.output}>
            <h2 className={styles.outputTitle}>Submitted JSON:</h2>
            <pre className={styles.jsonOutput}>
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>
          This form dynamically renders based on JSON structure. All updates are
          handled immutably, preserving the original structure.
        </p>
      </footer>
    </div>
  );
}

export default App;
