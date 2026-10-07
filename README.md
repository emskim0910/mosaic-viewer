# MOSAIC Thruster — Interactive CAD Viewer

Source for [emskim0910.github.io/mosaic-viewer](https://emskim0910.github.io/mosaic-viewer/) — the
project site for the **MOSAIC** (Monolithic, Optimized & Scalable Additively Integrated Cold-Gas)
CubeSat thruster: a live WebGL model of the Rev5 containment vessel with Overview, Specs and Roadmap
tabs. The personal portfolio lives separately at [emskim0910.github.io](https://emskim0910.github.io/).

## What ships where

| File | Contents |
| --- | --- |
| `index.html` | The viewer. Interactive Three.js model of the Rev5 vessel (meshes fetched from `models/`), with Overview / Specs / Roadmap cards and explode, auto-spin and reset controls. |
| `models/` | The Rev5 containment vessel as nine binary STL display meshes, one per named body, that the viewer loads. The CAD source is not published. |
| `nozzle_sim.html` | Standalone isentropic nozzle flow simulation, linked from the Work section and served live at [`/nozzle_sim.html`](https://emskim0910.github.io/mosaic-viewer/nozzle_sim.html). |

No build step and no bundler. `index.html` pulls Three.js from a CDN via an import map and fetches
its meshes from `models/`, so it needs to be served over HTTP; `nozzle_sim.html` has zero dependencies
of any kind and runs from `file://`.

## Page structure — `index.html`

- Full-viewport CAD viewer. Drag to rotate, scroll to zoom, plus explode, section cut, auto-spin
  and reset controls. The section cut clips every part on the same model plane (stencil-capped, so
  walls and webs read as solid) and follows the parts as they explode; `C` toggles it. The left card carries Overview / Specs / Roadmap tabs; the right panel lists the parts.
- Top bar links to the nozzle simulator and this repository.

## Nozzle simulation — `nozzle_sim.html`

Single-file, zero-dependency simulation of quasi-1D isentropic flow through the MOSAIC
converging-diverging nozzle. Mach contour visualization, animated streamlines, live axial-profile
charts (`M`, `P/P₀`, `T/T₀`, `ρ/ρ₀`), live performance stats (thrust, Isp, ṁ, exit Mach), regime
classification, and an **Optimize Shape** routine that sweeps `ε` and `L/L₁₅°` for max thrust at the
current back pressure.

It runs from the live site, or locally — double-click the file and it opens over `file://` with full
functionality. A green **⤓ Save HTML** button in the running page writes a fresh copy back to disk,
so you can re-export an edited copy at any time.

```bash
# grab a local copy
curl -O https://raw.githubusercontent.com/emskim0910/mosaic-viewer/main/nozzle_sim.html
```

## Running locally

`index.html` needs the network for its Three.js import map, so serve it over HTTP rather than
opening it directly:

```bash
python3 -m http.server 8000
# http://localhost:8000/
```

## The model in the viewer

Containment vessel Rev5 (2026-10-01): flat 1.5 mm AlSi10Mg skins with an external isogrid on all four
walls, a 5 × 5 internal web core that ties every wall, and 1.8 mm caps, printed as one body with no
internal supports. 613 g, 510 cm³, 96 × 86 × 96 mm. Design MEOP 500 psig; the Rev5 FEA puts proof
capability at 1,226 psig (governing peak 104 MPa at 750 psi, interconnect hole). SolidWorks
validation of Rev5 is pending. The STL meshes in `models/` are coarse tessellations for display only; the
CAD source is not published.

## MOSAIC — the project

A 1U cold-gas propulsion module that prints the pressure vessel, feed manifolds and nozzle as a
single AlSi10Mg structure, so the tank doubles as the CubeSat's load-bearing chassis. Target cost is
US$3,000 per unit against a US$100,000+ state of the art.

Principal investigator: Ethan M. Kim (Brown University, Mechanical Engineering). Advised by
Rick D. Fleeter, Ph.D., with Jeanue Chung (LUNR Aerospace) as subject-matter expert. Supported by a
NASA Space Grant and a Brown University Engineering Grant.
