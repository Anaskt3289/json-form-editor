# Dynamic JSON Form Editor

A React application that dynamically renders and edits JSON configuration files with automatic type inference and recursive form generation.

## Features

- **Dynamic Type Inference**: Automatically detects data types (string, number, boolean, object, array) at runtime
- **Recursive Rendering**: Uses recursive components to handle deeply nested JSON structures
- **Immutable Updates**: All state updates preserve the original JSON structure immutably
- **Collapsible Sections**: Nested objects and arrays can be collapsed/expanded
- **Array Management**: Add and remove items from arrays dynamically
- **Field Paths**: Display full field paths (e.g., `server.ssl.certificate`)
- **Read-only Mode**: Toggle read-only mode to prevent edits
- **No Hardcoded Fields**: Purely data-driven - no hardcoded JSX for specific keys

## Project Structure

```
json-form-editor/
├── src/
│   ├── components/
│   │   ├── JsonForm/
│   │   │   ├── JsonForm.jsx          # Recursive form renderer
│   │   │   └── JsonForm.module.css
│   │   └── FormField/
│   │       ├── FormField.jsx        # Individual field inputs
│   │       └── FormField.module.css
│   ├── utils/
│   │   ├── typeInference.js         # Type detection utilities
│   │   └── jsonUpdater.js           # Immutable JSON update utilities
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   ├── sampleConfig.js              # Sample JSON configuration
│   └── index.css                     # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## How It Works

### Type Inference

The `typeInference.js` utility examines values at runtime:
- `typeof value === 'string'` → text input
- `typeof value === 'number'` → number input
- `typeof value === 'boolean'` → checkbox
- `Array.isArray(value)` → array editor
- `typeof value === 'object'` → nested object section

### Recursive Rendering

The `JsonForm` component recursively renders itself:
1. **Primitives**: Renders `FormField` component
2. **Objects**: Renders collapsible section with nested `JsonForm` for each property
3. **Arrays**: Renders list editor with `JsonForm` for each item, plus add/remove controls

### Immutable Updates

The `jsonUpdater.js` utility provides `updateNestedPath()` which:
- Takes a path array (e.g., `['server', 'port']`)
- Creates a new object/array with the updated value
- Preserves all other values unchanged
- Handles nested updates recursively

### State Management

- Root state maintains the complete JSON structure
- Changes propagate up through callbacks
- Each update creates a new object (immutability)
- Original structure is always preserved

## Installation

```bash
cd json-form-editor
npm install
npm run dev
```

The application will be available at `http://localhost:5174`

## Usage

1. **Edit Fields**: Click on any field to edit its value
2. **Collapse Sections**: Click the arrow (▼/▶) to collapse/expand nested objects and arrays
3. **Add Array Items**: Click "+ Add Item" to add new items to arrays
4. **Remove Array Items**: Click "Remove" button on array items
5. **Toggle Read-only**: Use the checkbox to prevent edits
6. **Show Paths**: Toggle field path display
7. **Submit**: Click "Submit Configuration" to see the final JSON output

## Example JSON Structure

The sample config includes:
- Primitive values (strings, numbers, booleans)
- Nested objects (server, database, features)
- Arrays (integrations)
- Deeply nested structures (server.ssl)

## Code Quality

- **Clean Separation**: Utilities, components, and app logic are separated
- **Reusable Components**: `JsonForm` and `FormField` are fully reusable
- **Readable Logic**: Well-commented code explaining recursion and state updates
- **Scalable**: Handles JSON of any depth and complexity
- **Type Safety**: Runtime type checking ensures correct input rendering

## Technical Details

### Path-Based Updates

Updates use path arrays to target nested values:
```javascript
// Update server.port
updateNestedPath(config, ['server', 'port'], 8080)

// Update integrations[0].enabled
updateNestedPath(config, ['integrations', 0, 'enabled'], true)
```

### Recursion Pattern

The `JsonForm` component calls itself for nested structures:
```javascript
// For objects
keys.map(key => (
  <JsonForm data={data[key]} path={[...path, key]} />
))

// For arrays
items.map((item, index) => (
  <JsonForm data={item} path={[...path, index]} />
))
```

## Future Enhancements

- Validation rules and error messages
- Custom input types (date, color, etc.)
- JSON schema support
- Import/export JSON files
- Undo/redo functionality
- Search and filter fields
