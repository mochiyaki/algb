# Artificial Lazy Game Builder (algb)

One shot lazy game builder for saving labor cost!

## Project Structure
```
Artificial Lazy Game Builder/
├── .env (not shown)
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js

├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/ (processing)
│   ├── utils/ (processing)
│   └── asset/ (processing)
├── node_modules/ (not shown)
└── dist/ (not shown, generated during build)
```

## Detailed Component Structure

### Main Application
- Handles state management for messages, loading, theme, model mode, and language settings
- Manages the chat interface with user and assistant messages
- Implements dark/light mode toggle with localStorage persistence
- Controls model switching between local and agent API
- Manages language selection for code generation

### Components
  - Handles sending messages to the AI model
  - Integrates speech recognition for voice input
  - Displays individual chat messages
  - Renders assistant responses with syntax highlighting
  - Provides download functionality for generated code

### Utilities
  - Handles communication with local LLM and agent API
  - Manages different endpoints for local model vs agent API
  - Implements error handling for API calls
  - Provides functionality to download generated code as files
  - Supports various file formats (HTML, JS, Python, CSS)

### Assets
- Various PNG images used in the UI
