import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { POS } from "./puntos.js";
import { CELULAS } from "./datos.js";

const $ = (s) => document.querySelector(s);
const escenaEl = $("#escena"), capaPuntos = $("#puntos"), estado = $("#estado");
const ventana = $("#ventana"), lista = $("#lista-estructuras");
const calibrando = new URLSearchParams(location.search).has("calibrar");
const reducirMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Escena 3D ----------
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
camara.position.set(0, 0.6, 5);
const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderizador.setPixelRatio(Math.min(devicePixelRatio, 2));
escenaEl.appendChild(renderizador.domElement);

escena.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.3));
const luz = new THREE.DirectionalLight(0xffffff, 2.2); luz.position.set(3, 5, 4); escena.add(luz);
const luzAtras = new THREE.DirectionalLight(0xffffff, 0.8); luzAtras.position.set(-3, -2, -4); escena.add(luzAtras);

const controles = new TrackballControls(camara, renderizador.domElement);
controles.noZoom = true; controles.noPan = true; controles.rotateSpeed = 3; controles.dynamicDampingFactor = 0.08;

new ResizeObserver(() => {
  const w = escenaEl.clientWidth, h = escenaEl.clientHeight;
  if (!w || !h) return;
  renderizador.setSize(w, h, false);
  camara.aspect = w / h; camara.updateProjectionMatrix(); controles.handleResize();
}).observe(escenaEl);

// ---------- Estado ----------
let actual = null;          // { clave, grupo, copia, puntos: [{id, boton, pos}] }
let pedida = null;          // evita que una carga lenta pise a otra
let tocando = false, ultimoToque = -Infinity, ventanaAbierta = false;
const cache = new Map();
const cargar = (ruta) => cache.get(ruta) ?? cache.set(ruta, new GLTFLoader().loadAsync(ruta)).get(ruta);

async function mostrar(clave) {
  pedida = clave;
  const datos = CELULAS[clave];
  cerrarVentana();
  if (actual) { escena.remove(actual.grupo); actual = null; }
  capaPuntos.replaceChildren(); lista.replaceChildren();
  estado.hidden = false; estado.textContent = "Cargando modelo 3D…";

  document.querySelectorAll("[role=tab]").forEach((t) => t.setAttribute("aria-selected", String(t.dataset.clave === clave)));
  $("#tipo-nombre").textContent = datos.nombre;
  $("#tipo-intro").textContent = datos.intro;
  history.replaceState(null, "", `${location.pathname}${location.search}#${clave}`);

  try {
    const gltf = await cargar(datos.modelo);
    if (pedida !== clave) return;
    const copia = gltf.scene.clone(true);
    copia.traverse((h) => { if (h.isMesh) [].concat(h.material).forEach((m) => { m.side = THREE.DoubleSide; }); });

    const caja = new THREE.Box3().setFromObject(copia);
    const centro = caja.getCenter(new THREE.Vector3()), tam = caja.getSize(new THREE.Vector3());
    copia.position.sub(centro);
    const grupo = new THREE.Group(); grupo.add(copia);
    grupo.scale.setScalar(2.7 / Math.max(tam.x, tam.y, tam.z));
    escena.add(grupo);

    const puntos = datos.puntos.map((p, i) => {
      const boton = document.createElement("button");
      boton.type = "button"; boton.className = "punto"; boton.dataset.id = p.id;
      boton.setAttribute("aria-label", p.nombre); boton.setAttribute("aria-pressed", "false");
      boton.innerHTML = `${i + 1}<span class="etiqueta">${p.nombre}</span>`;
      boton.addEventListener("click", () => abrir(p.id));
      capaPuntos.append(boton);

      const chip = document.createElement("button");
      chip.type = "button"; chip.className = "chip"; chip.dataset.id = p.id;
      chip.setAttribute("aria-pressed", "false");
      chip.innerHTML = `<b>${i + 1}</b> ${p.nombre}`;
      chip.addEventListener("click", () => abrir(p.id));
      lista.append(chip);

      return { id: p.id, boton, pos: new THREE.Vector3(...POS[clave][p.id]) };
    });

    actual = { clave, grupo, copia, puntos };
    estado.hidden = true;
    if (calibrando) prepararCalibracion();
  } catch {
    estado.textContent = "No se pudo cargar el modelo 3D. Abre la página con Live Server y revisa la ruta del archivo.";
  }
}

// ---------- Ventanita de datos ----------
function abrir(id) {
  const p = CELULAS[actual.clave].puntos.find((x) => x.id === id);
  $("#v-titulo").textContent = p.nombre;
  $("#v-compuesto").textContent = p.compuesto;
  $("#v-sirve").textContent = p.sirve;
  $("#v-parecido").textContent = p.parecido;
  $("#v-dato").textContent = p.dato;
  const img = $("#v-img");
  img.hidden = !p.imagen;
  if (p.imagen) {
    img.onerror = () => { img.hidden = true; };   // si el archivo no existe, se oculta sin romper nada
    img.src = encodeURI(p.imagen);                // permite espacios y tildes en el nombre
  }
  ventana.scrollTop = 0;
  ventana.hidden = false; ventanaAbierta = true;
  ventana.style.animation = "none"; void ventana.offsetWidth; ventana.style.animation = ""; // reinicia la animación
  document.querySelectorAll(".punto, .chip").forEach((el) => el.setAttribute("aria-pressed", String(el.dataset.id === id)));
  $("#cerrar").focus({ preventScroll: true });
}
function cerrarVentana() {
  ventana.hidden = true; ventanaAbierta = false;
  document.querySelectorAll(".punto, .chip").forEach((el) => el.setAttribute("aria-pressed", "false"));
}
$("#cerrar").addEventListener("click", cerrarVentana);
addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarVentana(); });

document.querySelectorAll("[role=tab]").forEach((t) => t.addEventListener("click", () => mostrar(t.dataset.clave)));

// ---------- Interacción ----------
escenaEl.addEventListener("pointerdown", () => { tocando = true; });
addEventListener("pointerup", () => { tocando = false; ultimoToque = performance.now(); });
addEventListener("pointercancel", () => { tocando = false; ultimoToque = performance.now(); });

// ---------- Posicionar los puntos sobre el modelo ----------
const v = new THREE.Vector3(), dirCamara = new THREE.Vector3();
function colocarPuntos() {
  if (!actual) return;
  const w = escenaEl.clientWidth, h = escenaEl.clientHeight;
  actual.grupo.updateMatrixWorld(true);
  dirCamara.copy(camara.position).normalize();
  for (const { boton, pos } of actual.puntos) {
    v.copy(pos); actual.copia.localToWorld(v);
    boton.classList.toggle("oculto", v.dot(dirCamara) < -0.05); // quedó detrás del modelo
    v.project(camara);
    boton.style.transform = `translate(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px) translate(-50%, -50%)`;
  }
}

function bucle(ahora) {
  if (actual && !reducirMovimiento && !tocando && !ventanaAbierta && !calibrando && ahora - ultimoToque > 2500) {
    actual.grupo.rotation.y += 0.004;
  }
  controles.update();
  colocarPuntos();
  renderizador.render(escena, camara);
  requestAnimationFrame(bucle);
}
requestAnimationFrame(bucle);

// ---------- Modo calibrar (?calibrar) ----------
function prepararCalibracion() {
  const panel = $("#calibrar"), sel = $("#cal-punto"), salida = $("#cal-salida");
  panel.hidden = false;
  sel.replaceChildren(...CELULAS[actual.clave].puntos.map((p) => new Option(p.nombre, p.id)));
  const escribir = () => {
    const filas = actual.puntos.map(({ id, pos }) => `    ${id}: [${pos.toArray().map((n) => +n.toFixed(2)).join(", ")}],`);
    salida.value = `  ${actual.clave}: {\n${filas.join("\n")}\n  },`;
  };
  escribir();
  $("#cal-copiar").onclick = () => navigator.clipboard.writeText(salida.value).then(() => { $("#cal-copiar").textContent = "¡Copiado!"; });

  let inicio = null;
  escenaEl.onpointerdown = (e) => { tocando = true; inicio = { x: e.clientX, y: e.clientY, t: performance.now() }; };
  escenaEl.onpointerup = (e) => {
    if (!inicio || Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y) > 6 || performance.now() - inicio.t > 500) return;
    const r = escenaEl.getBoundingClientRect();
    const rc = new THREE.Raycaster();
    rc.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camara);
    const golpe = rc.intersectObject(actual.copia, true)[0];
    if (!golpe) return;
    actual.puntos.find((p) => p.id === sel.value).pos.copy(actual.copia.worldToLocal(golpe.point.clone()));
    const i = sel.selectedIndex; sel.selectedIndex = Math.min(i + 1, sel.options.length - 1); // pasa al siguiente
    $("#cal-copiar").textContent = "Copiar código";
    escribir();
  };
}

mostrar(location.hash === "#procariota" ? "procariota" : "eucariota");
