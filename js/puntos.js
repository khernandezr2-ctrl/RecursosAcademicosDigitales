// ============================================================
//  POSICIONES de los puntos sobre cada modelo 3D  [x, y, z]
//  Son aproximadas. Para dejarlas exactas abre la página con
//  celulas.html?calibrar  y sigue las instrucciones del panel.
//  Luego pega aquí el bloque que te entrega (reemplaza el de la célula).
// ============================================================
export const POS = {
  eucariota: {
    nucleo:       [0.0, 1.2, -0.05],
    rer:          [-0.15, 1.5, -0.2],
    golgi:        [0.3, 1.08, 0.25],
    mitocondria:  [-0.45, 1.35, -0.1],
    rel:          [0.55, 1.1, 0.0],
    membrana:     [0.0, 0.5, 0.88],
  },
  procariota: {
    pared:        [-0.42, 1.2, 0.0],
    membrana:     [-0.37, 1.0, 0.0],
    nucleoide:    [-0.28, 1.2, 0.0],
    ribosomas:    [-0.2, 1.05, 0.0],
    fimbrias:     [-0.62, 1.1, 0.0],
    flagelo:      [0.55, 0.45, 0.25],
  },
};

// ============================================================
//  TEXTOS de la ventanita de cada estructura
// ============================================================
export const CELULAS = {
  eucariota: {
    nombre: "Célula eucariota",
    modelo: "imagenes/Celula.glb",
    intro: "Células más complejas que tienen núcleo y organelos especializados. Se encuentran en animales, plantas, hongos y protozoarios.",
    puntos: [
      { id: "nucleo", nombre: "Núcleo",
        compuesto: "Una doble membrana con pequeños poros y, adentro, el ADN junto con proteínas.",
        sirve: "Controla las actividades de la célula y guarda el ADN, que tiene las instrucciones para vivir y reproducirse." },
      { id: "rer", nombre: "Retículo endoplásmico rugoso (RER)",
        compuesto: "Membranas en forma de tubos y sacos con ribosomas pegados; por eso se ve rugoso.",
        sirve: "Sintetiza proteínas gracias a los ribosomas adheridos." },
      { id: "golgi", nombre: "Aparato de Golgi",
        compuesto: "Sacos aplanados de membrana, apilados como una pila de panqueques.",
        sirve: "Empaca y distribuye sustancias, como la oficina de correos de la célula." },
      { id: "mitocondria", nombre: "Mitocondria",
        compuesto: "Dos membranas; la de adentro forma pliegues llamados crestas.",
        sirve: "Genera energía mediante la respiración celular. Es la central de energía." },
      { id: "rel", nombre: "Retículo endoplásmico liso (REL)",
        compuesto: "Membranas en forma de tubos, sin ribosomas; por eso se ve liso.",
        sirve: "Participa en la síntesis de lípidos (grasas) y en la detoxificación." },
      { id: "membrana", nombre: "Membrana plasmática",
        compuesto: "Dos capas de lípidos (grasas) con proteínas incrustadas.",
        sirve: "Regula el paso de sustancias hacia el interior y el exterior de la célula." },
    ],
  },
  procariota: {
    nombre: "Célula procariota",
    modelo: "imagenes/Proca.glb",
    intro: "Organismos simples y pequeños que carecen de núcleo, como las bacterias. Son las células más antiguas y resistentes del planeta.",
    puntos: [
      { id: "pared", nombre: "Pared celular",
        compuesto: "Una malla resistente hecha de azúcares y aminoácidos (en las bacterias, peptidoglucano).",
        sirve: "Brinda soporte y protección adicional." },
      { id: "membrana", nombre: "Membrana plasmática",
        compuesto: "Dos capas de lípidos (grasas) con proteínas incrustadas.",
        sirve: "Regula el paso de sustancias hacia el interior y el exterior." },
      { id: "nucleoide", nombre: "Nucleoide",
        compuesto: "Una molécula de ADN, casi siempre circular y enrollada, sin membrana que la rodee.",
        sirve: "Es la región donde se encuentra el ADN." },
      { id: "ribosomas", nombre: "Ribosomas",
        compuesto: "Ácido ribonucleico (ARN) y proteínas, en partículas diminutas.",
        sirve: "Son los responsables de la síntesis de proteínas." },
      { id: "fimbrias", nombre: "Fimbrias",
        compuesto: "Filamentos muy cortos y delgados hechos de proteínas.",
        sirve: "Permiten la adhesión a superficies." },
      { id: "flagelo", nombre: "Flagelo",
        compuesto: "Un filamento largo en forma de látigo, hecho de proteínas.",
        sirve: "Permite el desplazamiento de la célula." },
    ],
  },
};
