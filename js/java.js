import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

// Modelo por defecto (el mismo en las 3 tarjetas). Acepta .glb, .gltf y .obj
const RUTA_MODELO = "imagenes/base_basic_pbr.glb";
const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Cada tarjeta puede tener su propio modelo con data-modelo="imagenes/otro.glb"
const escenarios = [...document.querySelectorAll(".escenario3d")].map(crearEscenario);

function crearEscenario(el) {
  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camara.position.set(0, 0.8, 5);

  const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  el.appendChild(renderizador.domElement);

  escena.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.3));
  const luz = new THREE.DirectionalLight(0xffffff, 2.2);
  luz.position.set(3, 5, 4);
  escena.add(luz);
  const luzAtras = new THREE.DirectionalLight(0xffffff, 0.8);
  luzAtras.position.set(-3, -2, -4);
  escena.add(luzAtras);

  // TrackballControls = giro libre de 360° en todas las direcciones
  const controles = new TrackballControls(camara, renderizador.domElement);
  controles.noZoom = true;
  controles.noPan = true;
  controles.rotateSpeed = 3;
  controles.dynamicDampingFactor = 0.08;

  const e = {
    el, escena, camara, renderizador, controles,
    color: el.dataset.color || "#5fd0a3", // solo se usa si el modelo NO trae colores
    ruta: el.dataset.modelo || RUTA_MODELO,
    grupo: null, visible: true, tocando: false, ultimoToque: -Infinity,
  };

  el.addEventListener("pointerdown", () => { e.tocando = true; });
  const soltar = () => { e.tocando = false; e.ultimoToque = performance.now(); };
  window.addEventListener("pointerup", soltar);
  window.addEventListener("pointercancel", soltar);

  new ResizeObserver(() => {
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    renderizador.setSize(w, h, false);
    camara.aspect = w / h;
    camara.updateProjectionMatrix();
    controles.handleResize();
  }).observe(el);

  new IntersectionObserver(([entrada]) => { e.visible = entrada.isIntersecting; }).observe(el);
  return e;
}

// --- Cargar cada modelo una sola vez por ruta y clonarlo en cada tarjeta ---
// Devuelve { objeto, tieneColores }: tieneColores = true si el archivo trae sus propios materiales
const cache = new Map();
function cargarModelo(ruta) {
  if (!cache.has(ruta)) cache.set(ruta, cargarSinCache(ruta));
  return cache.get(ruta);
}

async function cargarSinCache(ruta) {
  const extension = ruta.split(".").pop().toLowerCase();

  // GLB / GLTF: los colores y texturas vienen incluidos
  if (extension === "glb" || extension === "gltf") {
    const gltf = await new GLTFLoader().loadAsync(ruta);
    return { objeto: gltf.scene, tieneColores: true };
  }

  // OBJ: los colores viven en un archivo aparte (.mtl). Lo intentamos cargar.
  const carpeta = ruta.slice(0, ruta.lastIndexOf("/") + 1);
  const cargadorObj = new OBJLoader();
  let tieneColores = false;
  try {
    const mtlLoader = new MTLLoader();
    mtlLoader.setResourcePath(carpeta); // para las texturas
    const materiales = await mtlLoader.loadAsync(ruta.replace(/\.obj$/i, ".mtl"));
    materiales.preload();
    cargadorObj.setMaterials(materiales);
    tieneColores = true;
  } catch {
    /* no hay .mtl: seguimos sin él */
  }
  const objeto = await cargadorObj.loadAsync(ruta);
  objeto.traverse((h) => {
    if (!h.isMesh) return;
    if (!h.geometry.attributes.normal) h.geometry.computeVertexNormals();
    // Algunos .obj guardan el color en los vértices
    if (h.geometry.attributes.color) tieneColores = "vertices";
  });
  return { objeto, tieneColores };
}

escenarios.forEach(async (e) => {
  const estado = e.el.querySelector(".estado");
  try {
    const { objeto, tieneColores } = await cargarModelo(e.ruta);
    const copia = objeto.clone(true);

    copia.traverse((h) => {
      if (!h.isMesh) return;
      if (tieneColores === true) {
        // Respetar los materiales del archivo (.glb o .obj + .mtl)
        [].concat(h.material).forEach((m) => { m.side = THREE.DoubleSide; });
      } else {
        // Sin materiales: usar los colores de los vértices o un color liso de respaldo
        const conVertices = tieneColores === "vertices";
        h.material = new THREE.MeshStandardMaterial({
          color: conVertices ? 0xffffff : new THREE.Color(e.color),
          vertexColors: conVertices,
          roughness: 0.45,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
      }
    });

    // Centrar y escalar sin importar el tamaño original
    const caja = new THREE.Box3().setFromObject(objeto);
    const centro = caja.getCenter(new THREE.Vector3());
    const tam = caja.getSize(new THREE.Vector3());
    copia.position.sub(centro);

    const grupo = new THREE.Group();
    grupo.add(copia);
    grupo.scale.setScalar(2.6 / Math.max(tam.x, tam.y, tam.z));
    e.escena.add(grupo);
    e.grupo = grupo;
    estado?.remove();
  } catch {
    if (estado) estado.textContent =
      "No se pudo cargar el modelo 3D. Abre la página con Live Server y revisa la ruta del archivo.";
  }
});

// --- Un solo bucle para las 3 escenas ---
function bucle(ahora) {
  for (const e of escenarios) {
    if (!e.visible) continue;
    if (e.grupo && !reducirMovimiento && !e.tocando && ahora - e.ultimoToque > 2500) {
      e.grupo.rotation.y += 0.006;
    }
    e.controles.update();
    e.renderizador.render(e.escena, e.camara);
  }
  requestAnimationFrame(bucle);
}
requestAnimationFrame(bucle);