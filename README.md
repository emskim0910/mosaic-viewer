# mosaic-viewer

3D viewer and tools for the **MOSAIC** (Monolithic, Optimized & Scalable Additively Integrated Cold-Gas) CubeSat thruster.

## Pages

| File | Description |
| --- | --- |
| [`index.html`](./index.html) | Interactive 3D CAD viewer of the MOSAIC thruster assembly (Three.js, embedded STL parts). |
| [`nozzle_sim.html`](./nozzle_sim.html) | **Standalone** advanced isentropic nozzle flow simulation with shape optimizer. Self-contained, no external dependencies. |

## Nozzle simulation — `nozzle_sim.html`

Single-file, zero-dependency simulation of quasi-1D isentropic flow through the MOSAIC converging-diverging nozzle. Features Mach contour visualization, animated streamlines, live axial-profile charts (`M`, `P/P₀`, `T/T₀`, `ρ/ρ₀`), live performance stats (thrust, Isp, ṁ, exit Mach), regime classification, and an **Optimize Shape** routine that sweeps `ε` and `L/L₁₅°` for max thrust at the current back pressure.

### Download

Three equivalent ways to grab the file:

1. **From the page itself** — click the green **⤓ Save HTML** button in the top-right of the Design Parameters panel. The file is saved as `nozzle_sim.html`. Works offline; the saved file is a complete copy.
2. **Direct raw download**:
   ```bash
   curl -O https://raw.githubusercontent.com/emskim0910/mosaic-viewer/main/nozzle_sim.html
   ```
3. **GitHub Pages link** (right-click → *Save Link As…*):
   `https://emskim0910.github.io/mosaic-viewer/nozzle_sim.html`

### Run

Double-click the saved file — it opens in any modern browser via `file://` with full functionality. No build step, no server, no internet.

For a local HTTP server (optional):

```bash
python3 -m http.server 8000
# http://localhost:8000/nozzle_sim.html
```
