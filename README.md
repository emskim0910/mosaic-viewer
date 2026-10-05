# Engineering Portfolio — Ethan M. Kim

Source for [emskim0910.github.io/mosaic-viewer](https://emskim0910.github.io/mosaic-viewer/) — an
engineering portfolio built around the **MOSAIC** (Monolithic, Optimized & Scalable Additively
Integrated Cold-Gas) CubeSat thruster.

The site opens on a live WebGL model of the thruster, then scrolls into the portfolio proper:
background, capabilities, projects, and contact.

## What ships where

| File | Contents |
| --- | --- |
| `index.html` | The portfolio. Interactive Three.js CAD viewer as the hero (fetches the part meshes from `models/`), followed by the About / Capabilities / Work / Contact sections. |
| `models/` | The Rev5 containment vessel: `MOSAIC_Vessel_Rev5_Isogrid.step` (one solid, 33 MB) and nine binary STL meshes, one per named body, that the viewer loads. |
| `nozzle_sim.html` | Standalone isentropic nozzle flow simulation, linked from the Work section and served live at [`/nozzle_sim.html`](https://emskim0910.github.io/mosaic-viewer/nozzle_sim.html). |

No build step and no bundler. `index.html` pulls Three.js from a CDN via an import map and fetches
its meshes from `models/`, so it needs to be served over HTTP; `nozzle_sim.html` has zero dependencies
of any kind and runs from `file://`.

## Page structure — `index.html`

- **Hero** — full-viewport CAD viewer. Drag to rotate, scroll to zoom, plus explode, auto-spin and
  reset controls. The left panel carries Overview / Specs / Roadmap tabs for the thruster itself.
- **About** — the program, its funding, and its advisors.
- **Capabilities** — design and structural analysis, fluids and thermodynamics, manufacturing and
  materials, systems and test. Each entry maps to actual MOSAIC work rather than a generic list.
- **Work** — MOSAIC (links back up into the 3D viewer and its spec tabs) and the nozzle simulator.
- **Contact** — email and GitHub.

The viewer chrome retires itself once you scroll past the hero, and the canvas releases pointer
events so the page scrolls normally over it.

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
validation of Rev5 is pending. The STEP in `models/` is the print and FEA solid; the STL meshes are
coarse tessellations for display only.

## MOSAIC — the project

A 1U cold-gas propulsion module that prints the pressure vessel, feed manifolds and nozzle as a
single AlSi10Mg structure, so the tank doubles as the CubeSat's load-bearing chassis. Target cost is
US$3,000 per unit against a US$100,000+ state of the art.

Principal investigator: Ethan M. Kim (Brown University, Mechanical Engineering). Advised by
Rick D. Fleeter, Ph.D., with Jeanue Chung (LUNR Aerospace) as subject-matter expert. Supported by a
NASA Space Grant and a Brown University Engineering Grant.
