# AGENTS.md

## Cursor Cloud specific instructions

This is a static single-file web application (`index.html`) with no build system, no package manager, and no backend. Three.js is loaded from CDN at runtime.

### Running the dev server

```bash
python3 -m http.server 8080 --directory /workspace
```

Then open `http://localhost:8080` in a browser. Internet access is required for the Three.js CDN imports from `unpkg.com`.

### Linting / Testing / Building

There are no lint, test, or build scripts — the project has no `package.json`, `Makefile`, or CI configuration. Validation is done by serving the page and manually verifying the 3D viewer loads and interactive controls (explode slider, auto-spin toggle, tab navigation) work correctly.
