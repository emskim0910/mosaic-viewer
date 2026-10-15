# MOSAIC Thruster

Source for [emskim0910.github.io/mosaic-viewer](https://emskim0910.github.io/mosaic-viewer/), the
project site for the **MOSAIC** (Monolithic, Optimized & Scalable Additively Integrated Cold-Gas)
CubeSat thruster by Anchor Space. The personal portfolio lives separately at
[emskim0910.github.io](https://emskim0910.github.io/).

## What ships where

| Path | Contents |
| --- | --- |
| `index.html` | The front page: overview, Rev 5 vessel, specifications and contact, with an exploded wireframe of the vessel in the hero that assembles as you scroll. |
| `assets/` | `style.css` (colors, type, layout) and `app.js` (the wireframe: loads `models/*.bin`, explode on scroll, drag to rotate). |
| `models/*.bin`, `models/manifest.json` | Exact CAD edges of the Rev 5 vessel, one Float32 file per region (x y z x y z per segment, mm), plus the part list and explode directions. Display edges only. |
| `models/*.stl` | The Rev 5 vessel as nine binary STL display meshes, used by the 3D viewer. |
| `viewer/index.html` | The interactive Three.js CAD viewer (assembled / exploded section, drag, zoom), served at [`/viewer/`](https://emskim0910.github.io/mosaic-viewer/viewer/). |
| `nozzle_sim.html` | Standalone isentropic nozzle flow simulation, zero dependencies, served at [`/nozzle_sim.html`](https://emskim0910.github.io/mosaic-viewer/nozzle_sim.html). |

No build step and no bundler. The front page and the viewer pull Three.js from a CDN via an import
map and fetch their geometry from `models/`, so they need to be served over HTTP:

```bash
python -m http.server 8123
```

then open http://localhost:8123/. `nozzle_sim.html` runs from `file://` as well.

The CAD source (STEP, SolidWorks, generator scripts) is not published; the repository holds display
geometry only.

## Nozzle simulation

Quasi-1D isentropic flow through the MOSAIC converging-diverging nozzle: Mach contour, animated
streamlines, axial profiles (`M`, `P/P₀`, `T/T₀`, `ρ/ρ₀`), live thrust, Isp, mass flow and exit
Mach, regime classification, and an Optimize Shape sweep over area ratio and length for maximum
thrust at the current back pressure. A Save HTML button in the page writes an edited copy back to
disk.
