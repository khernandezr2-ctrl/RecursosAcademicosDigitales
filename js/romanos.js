import { aRomano, aNumero, explicar, operar } from "./romanos-logica.js";

const $ = (s) => document.querySelector(s);
const SIMBOLO = { "+": "+", "-": "−", "*": "×", "/": "÷" };
const MAX_LETRAS = 15;

let izq = null, oper = null, entrada = "";
let resultado = null, recienCalculado = false, expresionFinal = "", notaFinal = "";

const elExpresion = $("#expresion"), elPrincipal = $("#principal"), elArabigo = $("#arabigo");
const elMensaje = $("#mensaje"), verArabigo = $("#ver-arabigo");

function mensaje(texto = "", tipo = "ayuda") {
  elMensaje.textContent = texto;
  elMensaje.className = `mensaje ${tipo}`;
}

function pintar() {
  const n = aNumero(entrada);
  // Línea de arriba: la operación en romanos
  if (recienCalculado) elExpresion.textContent = expresionFinal;
  else elExpresion.textContent = oper ? `${aRomano(izq)} ${SIMBOLO[oper]}` : "\u00a0";
  // Línea principal
  elPrincipal.textContent = recienCalculado ? aRomano(resultado) : (entrada || "_");
  // Línea de "números de hoy"
  let txt = "";
  if (verArabigo.checked) {
    if (recienCalculado) txt = notaFinal;
    else if (oper) txt = `${izq} ${SIMBOLO[oper]} ${n ?? ""}`;
    else if (n) txt = `${n}`;
  }
  elArabigo.textContent = txt || "\u00a0";
}

function animarResultado() {
  elPrincipal.classList.remove("nuevo"); void elPrincipal.offsetWidth; elPrincipal.classList.add("nuevo");
}

function letra(l) {
  if (recienCalculado) { recienCalculado = false; resultado = null; izq = null; oper = null; entrada = ""; }
  if (entrada.length >= MAX_LETRAS) return;
  entrada += l;
  mensaje(explicar(entrada), "error");
  pintar();
}

function operador(op) {
  if (recienCalculado) { izq = resultado; oper = op; entrada = ""; recienCalculado = false; mensaje(); return pintar(); }
  if (!entrada) {
    if (izq !== null) { oper = op; mensaje(); return pintar(); }   // cambiar de operación
    return mensaje("Escribe primero un número romano, por ejemplo XII.");
  }
  const n = aNumero(entrada);
  if (n === null) return mensaje(explicar(entrada), "error");
  if (izq !== null && oper) {                                        // operaciones encadenadas
    const r = operar(izq, oper, n);
    if (!r.ok) return mensaje(r.error, "error");
    if (r.resto) return mensaje("Esa división no es exacta. Pulsa = para ver el cociente y lo que sobra.", "error");
    izq = r.valor;
  } else izq = n;
  oper = op; entrada = ""; mensaje(); pintar();
}

function igual() {
  if (recienCalculado) return;
  const n = aNumero(entrada);
  if (!oper || !entrada) return mensaje("Escribe una operación completa, por ejemplo XII + VIII.");
  if (n === null) return mensaje(explicar(entrada), "error");
  const r = operar(izq, oper, n);
  if (!r.ok) return mensaje(r.error, "error");
  expresionFinal = `${aRomano(izq)} ${SIMBOLO[oper]} ${entrada} =`;
  notaFinal = `${izq} ${SIMBOLO[oper]} ${n} = ${r.valor}${r.resto ? ` (sobran ${r.resto})` : ""}`;
  resultado = r.valor; recienCalculado = true; entrada = "";
  mensaje(r.resto ? `Sobra ${aRomano(r.resto)}: ${aRomano(izq)} ÷ ${aRomano(n)} da ${aRomano(r.valor)} y sobra ${aRomano(r.resto)}.` : "");
  pintar(); animarResultado();
}

function borrar() {
  if (recienCalculado) return;
  entrada = entrada.slice(0, -1); mensaje(explicar(entrada), "error"); pintar();
}
function limpiar() {
  izq = null; oper = null; entrada = ""; resultado = null; recienCalculado = false;
  mensaje(); pintar();
}
function probar(a, op, b) {
  limpiar(); izq = aNumero(a); oper = op; entrada = b; igual();
  $("#calculadora").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
}

// ---------- Botones ----------
document.querySelectorAll("[data-letra]").forEach((b) => b.addEventListener("click", () => letra(b.dataset.letra)));
document.querySelectorAll("[data-op]").forEach((b) => b.addEventListener("click", () => operador(b.dataset.op)));
$("#igual").addEventListener("click", igual);
$("#borrar").addEventListener("click", borrar);
$("#limpiar").addEventListener("click", limpiar);
verArabigo.addEventListener("change", pintar);
document.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("click", () => probar(b.dataset.a, b.dataset.o, b.dataset.b)));

// ---------- Teclado ----------
addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (/^[ivxlcdm]$/i.test(k)) letra(k.toUpperCase());
  else if (k.length === 1 && "+-*/".includes(k)) { e.preventDefault(); operador(k); }
  else if (k === "=" || (k === "Enter" && !e.target.closest("button"))) { e.preventDefault(); igual(); }
  else if (k === "Backspace") borrar();
  else if (k === "Escape") limpiar();
});

pintar();
