// MOSAIC hero wireframe: exact CAD edges of the Rev5 vessel drawn as thin lines, exploded by
// default, assembling as the page scrolls through the hero. Drag to rotate; otherwise it turns slowly.
import * as THREE from "three";

const canvas = document.getElementById("wire");
const stage = canvas.parentElement;
const hero = document.getElementById("hero");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setClearColor(0x000000, 0);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 10, 4000);
const rig = new THREE.Group();      // user rotation
const spin = new THREE.Group();     // slow idle rotation
scene.add(rig);
rig.add(spin);

const css = getComputedStyle(document.documentElement);
const WIRE = new THREE.Color(css.getPropertyValue("--wire").trim() || "#c5d0f2");
const BG = new THREE.Color(css.getPropertyValue("--bg").trim() || "#08090c");
// far edges fade toward the page color, so the near side of the lattice reads over the far side
scene.fog = new THREE.Fog(BG, 520, 900);
// denser regions are drawn lighter so the outline of the vessel stays legible
const OPACITY = { skin_walls: 0.9, roof_cap: 0.9, floor_cap: 0.9, well_and_port_bosses: 0.85, web_core: 0.42 };
const parts = [];
let explode = 1;                    // 0 assembled, 1 exploded
let targetExplode = 1;

async function load() {
  const manifest = await (await fetch("models/manifest.json")).json();
  await Promise.all(manifest.parts.map(async (p) => {
    const buf = await (await fetch(p.file)).arrayBuffer();
    const pos = new Float32Array(buf);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.LineBasicMaterial({ color: WIRE, transparent: true, opacity: OPACITY[p.name] ?? 0.55, fog: true });
    const lines = new THREE.LineSegments(geo, mat);
    lines.userData.explode = new THREE.Vector3(...p.explode);
    spin.add(lines);
    parts.push(lines);
  }));
  // tilt like an isometric: look from above the +X/+Z corner
  rig.rotation.set(0, 0, 0);
  spin.rotation.y = Math.PI / 4;
  stage.classList.add("ready");
  resize();
  animate();
}

function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  // frame the exploded model: ~300 mm tall at full explode
  const fit = 1.02 * 300 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
  const dist = Math.max(fit, fit / camera.aspect * 0.9);
  camera.position.set(0, 0, dist);
  camera.lookAt(0, 0, 0);
  scene.fog.near = dist - 40;
  scene.fog.far = dist + 260;
}
window.addEventListener("resize", resize);

// scroll in the hero drives assembly: top = exploded, end of hero = assembled
function onScroll() {
  const range = hero.offsetHeight - window.innerHeight;
  const t = range > 0 ? THREE.MathUtils.clamp(window.scrollY / range, 0, 1) : 0;
  targetExplode = 1 - THREE.MathUtils.smoothstep(t, 0.05, 0.85);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
explode = targetExplode;            // start at the state the page was opened in, no settling animation

// drag to rotate
let dragging = false, lastX = 0, lastY = 0, idle = 0;
const tiltBase = THREE.MathUtils.degToRad(26);
let yaw = 0, pitch = tiltBase;
canvas.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  yaw += (e.clientX - lastX) * 0.006;
  pitch = THREE.MathUtils.clamp(pitch + (e.clientY - lastY) * 0.006, -1.2, 1.2);
  lastX = e.clientX; lastY = e.clientY; idle = 0;
});
canvas.addEventListener("pointerup", () => { dragging = false; });
canvas.addEventListener("pointercancel", () => { dragging = false; });
canvas.style.touchAction = "pan-y";

let last = performance.now();
function animate(now = performance.now()) {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (!dragging) { idle += dt; if (idle > 2) yaw += dt * 0.12; }
  explode += (targetExplode - explode) * Math.min(1, dt * 4);
  rig.rotation.set(pitch, yaw, 0);
  for (const p of parts) p.position.copy(p.userData.explode).multiplyScalar(explode);
  renderer.render(scene, camera);
}

load().catch((err) => {
  document.getElementById("model-status").textContent = "Model failed to load: " + err.message;
});
