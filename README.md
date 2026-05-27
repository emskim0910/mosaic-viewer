# mosaic-viewer

3D viewer and tools for the **MOSAIC** (Monolithic, Optimized & Scalable Additively Integrated Cold-Gas) CubeSat thruster.

## What ships where

| Where | Contents |
| --- | --- |
| **GitHub Pages site** ([emskim0910.github.io/mosaic-viewer](https://emskim0910.github.io/mosaic-viewer/)) | Only the MOSAIC CAD viewer (`index.html`). No nozzle simulation is served from the website. |
| **Repository — local artifact** | `nozzle_sim.html` — a single-file, zero-dependency advanced isentropic nozzle flow simulation. Explicitly excluded from the Pages build via `_config.yml`. |

## Nozzle simulation — `nozzle_sim.html`

Single-file, zero-dependency simulation of quasi-1D isentropic flow through the MOSAIC converging-diverging nozzle. Mach contour visualization, animated streamlines, live axial-profile charts (`M`, `P/P₀`, `T/T₀`, `ρ/ρ₀`), live performance stats (thrust, Isp, ṁ, exit Mach), regime classification, and an **Optimize Shape** routine that sweeps `ε` and `L/L₁₅°` for max thrust at the current back pressure.

### Download (the file is only available from the repo)

```bash
# from the command line
curl -O https://raw.githubusercontent.com/emskim0910/mosaic-viewer/main/nozzle_sim.html
```

Or, in the GitHub web UI, open [`nozzle_sim.html`](./nozzle_sim.html) → press the **Download raw file** button at the top-right of the file view.

### Run

Double-click the saved file — it opens in any modern browser via `file://` with full functionality. No build step, no server, no internet, no CDN.

For a local HTTP server (optional):

```bash
python3 -m http.server 8000
# http://localhost:8000/nozzle_sim.html
```

A green **⤓ Save HTML** button in the running page also writes a fresh copy back to disk, so you can re-export an edited copy at any time.
