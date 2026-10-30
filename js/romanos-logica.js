// Lógica pura de los números romanos (sin nada de la pantalla)
export const MAX = 3999;
const TABLA = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
               [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
const VALOR = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const VALIDO = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function aRomano(n) {
  let r = "";
  for (const [v, s] of TABLA) while (n >= v) { r += s; n -= v; }
  return r;
}

// Devuelve el número, o null si el texto no es un romano bien escrito
export function aNumero(s) {
  if (!s || !VALIDO.test(s)) return null;
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const a = VALOR[s[i]], b = VALOR[s[i + 1]] || 0;
    total += a < b ? -a : a;
  }
  return total;
}

// Explica por qué un texto no es un romano válido ("" si es válido)
export function explicar(s) {
  if (!s || aNumero(s) !== null) return "";
  if (/I{4,}|X{4,}|C{4,}|M{4,}/.test(s))
    return `${s} no es válido: I, X, C y M se repiten como máximo 3 veces seguidas. Para el 4 se usa IV, para el 40 XL y para el 400 CD.`;
  if (/V{2,}|L{2,}|D{2,}/.test(s))
    return `${s} no es válido: V, L y D nunca se repiten (dos V forman una X).`;
  return `${s} no es un número romano válido. Revisa las reglas de suma y resta más abajo.`;
}

// Hace la operación. Devuelve { ok, valor, resto } o { ok:false, error }
export function operar(a, op, b) {
  let v;
  if (op === "+") v = a + b;
  else if (op === "-") v = a - b;
  else if (op === "*") v = a * b;
  else {
    const q = Math.floor(a / b);
    if (q < 1) return { ok: false, error: `${aRomano(a)} ÷ ${aRomano(b)} da menos de uno, y con números romanos enteros no se puede escribir.` };
    return { ok: true, valor: q, resto: a % b };
  }
  if (v > MAX) return { ok: false, error: `El resultado es ${v}, mayor que MMMCMXCIX (3999), el número más grande que se escribe con estas reglas. Los romanos ponían una raya encima de la letra para multiplicarla por mil.` };
  if (v === 0) return { ok: false, error: "El resultado es cero, y los romanos no tenían ningún símbolo para el cero." };
  if (v < 0) return { ok: false, error: `El resultado sería ${v}, pero los romanos no usaban números negativos.` };
  return { ok: true, valor: v, resto: 0 };
}
