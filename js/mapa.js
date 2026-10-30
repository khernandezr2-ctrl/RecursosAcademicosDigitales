(() => {
  const DATOS = window.REGIONES_DATOS;
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- Mapa ---------- */
  const LIMITES = [[-4.5, -82.5], [13.8, -66.5]];
  const mapa = L.map("mapa", {
    minZoom: 5, maxZoom: 10, zoomSnap: 0.25, zoomDelta: 0.5,
    maxBounds: [[-9, -90], [18, -61]], maxBoundsViscosity: 1,
    worldCopyJump: false
  });
  mapa.fitBounds(LIMITES, { padding: [10, 10] });

  // Imagen satelital (Esri World Imagery)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Imágenes © Esri, Maxar, Earthstar Geographics",
    bounds: LIMITES, maxNativeZoom: 12
  }).addTo(mapa);

  // Capas ordenadas: mar -> orilla -> regiones
  [["mar", 405], ["orilla", 408], ["regiones", 430]].forEach(([n, z]) => {
    mapa.createPane(n).style.zIndex = z;
  });

  /* ---------- Mar realista: oculta todo lo que no sea Colombia ---------- */
  const mundo = [[-40, -120], [-40, -30], [45, -30], [45, -120]];
  const mar = L.polygon([mundo, ...window.COLOMBIA_CONTORNO], {
    pane: "mar", renderer: L.svg({ pane: "mar" }),
    stroke: false, fillColor: "#07426a", fillOpacity: 1, interactive: false
  }).addTo(mapa);

  const svgMar = mar._path.ownerSVGElement;
  svgMar.insertAdjacentHTML("afterbegin", `
    <defs>
      <filter id="mar-ruido" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="640">
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.026" numOctaves="4" seed="7" stitchTiles="stitch"/>
        <feColorMatrix values="0 0 0 0 .45  0 0 0 0 .80  0 0 0 0 .95  0 0 0 .9 -.34"/>
      </filter>
      <filter id="mar-espuma" filterUnits="userSpaceOnUse" x="0" y="0" width="640" height="640">
        <feTurbulence type="fractalNoise" baseFrequency="0.05 0.09" numOctaves="2" seed="3" stitchTiles="stitch"/>
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.4 -.78"/>
      </filter>
      <pattern id="mar-patron" width="640" height="640" patternUnits="userSpaceOnUse">
        <rect width="640" height="640" fill="#06385c"/>
        <rect width="640" height="640" filter="url(#mar-ruido)" opacity=".75"/>
        <rect width="640" height="640" filter="url(#mar-espuma)" opacity=".28"/>
      </pattern>
    </defs>`);
  mar._path.setAttribute("fill", "url(#mar-patron)");

  // Aguas poco profundas: brillo turquesa que se desvanece mar adentro
  const orilla = L.svg({ pane: "orilla" });
  window.COLOMBIA_CONTORNO.forEach(anillo => {
    [[46, 0.07], [30, 0.1], [18, 0.14], [8, 0.2]].forEach(([w, o]) => {
      L.polyline(anillo, {
        pane: "orilla", renderer: orilla, color: "#6fe3da", weight: w, opacity: o,
        lineJoin: "round", interactive: false
      }).addTo(mapa);
    });
  });

  /* ---------- Regiones ---------- */
  const capas = {};
  const estilo = id => ({ color: "#fff", weight: 1.8, fillColor: DATOS[id].color, fillOpacity: 0.24, opacity: 0.95 });
  const estiloHover = id => ({ weight: 3.2, fillOpacity: 0.52 });

  const geo = L.geoJSON(window.COLOMBIA_REGIONES, {
    pane: "regiones", renderer: L.svg({ pane: "regiones" }),
    style: f => estilo(f.properties.id),
    onEachFeature: (f, capa) => {
      const id = f.properties.id;
      capas[id] = capa;
      capa.on({
        mouseover: () => resaltar(id, true),
        mouseout: () => resaltar(id, false),
        click: () => abrirRegion(id)
      });
    }
  }).addTo(mapa);

  function resaltar(id, si) {
    capas[id].setStyle(si ? estiloHover(id) : estilo(id));
    document.querySelectorAll(`[data-chip="${id}"]`).forEach(c => c.classList.toggle("activa", si));
    if (si) capas[id].bringToFront();
  }

  // Etiquetas de región
  Object.entries(DATOS).forEach(([id, r]) => {
    L.marker(r.centro, {
      icon: L.divIcon({ className: "etq-region", html: `<span>${r.nombre.replace("Región ", "")}</span>`, iconSize: [0, 0] }),
      interactive: false, keyboard: false
    }).addTo(mapa);
  });

  // Las islas son pequeñas: un círculo clicable alrededor de San Andrés y Providencia
  [[12.55, -81.72], [13.36, -81.37]].forEach(p => {
    const c = L.circleMarker(p, {
      pane: "regiones", radius: 20, color: DATOS.insular.color, weight: 2, fillColor: DATOS.insular.color, fillOpacity: 0.18, className: "isla-pulso"
    }).addTo(mapa);
    c.on("click", () => abrirRegion("insular"));
    c.on("mouseover", () => resaltar("insular", true));
    c.on("mouseout", () => resaltar("insular", false));
  });

  /* ---------- Capitales ---------- */
  const capitales = L.layerGroup().addTo(mapa);
  window.CAPITALES.forEach(([nombre, depto, lat, lng, reg]) => {
    const esBogota = nombre === "Bogotá";
    const m = esBogota
      ? L.marker([lat, lng], { icon: L.divIcon({ className: "estrella", html: "★", iconSize: [26, 26] }) })
      : L.circleMarker([lat, lng], { radius: 5, color: DATOS[reg].color, weight: 3, fillColor: "#fff", fillOpacity: 1 });
    m.bindTooltip(nombre, {
      permanent: true, direction: "right", offset: [esBogota ? 10 : 6, 0],
      className: "etq-capital" + (esBogota ? " siempre" : "")
    });
    m.bindPopup(`<strong>${nombre}</strong><br>Capital de ${depto}<br>
      <button type="button" class="pop-btn" data-abrir="${reg}">Ver ${DATOS[reg].nombre}</button>`);
    capitales.addLayer(m);
  });

  const marcarZoom = () => mapa.getContainer().classList.toggle("zoom-alto", mapa.getZoom() >= 6.5);
  mapa.on("zoomend", marcarZoom); marcarZoom();

  $("#ver-capitales").addEventListener("change", e => {
    e.target.checked ? mapa.addLayer(capitales) : mapa.removeLayer(capitales);
  });

  /* ---------- Leyenda con las regiones ---------- */
  $("#leyenda").innerHTML = Object.entries(DATOS).map(([id, r]) => `
    <button type="button" class="chip" data-chip="${id}" data-abrir="${id}" style="--c:${r.color}">
      <i></i>${r.nombre}
    </button>`).join("");

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-abrir]");
    if (b) abrirRegion(b.dataset.abrir);
  });
  document.addEventListener("mouseover", e => {
    const c = e.target.closest(".chip"); if (c) resaltar(c.dataset.chip, true);
  });
  document.addEventListener("mouseout", e => {
    const c = e.target.closest(".chip"); if (c) resaltar(c.dataset.chip, false);
  });

  /* ---------- Ventana de información ---------- */
  const modal = $("#modal");
  const contenido = $("#modal-contenido");

  const placeholder = (ruta, color) => "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="${color}" opacity=".25"/>
     <rect x="20" y="20" width="760" height="460" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="14 10"/>
     <text x="400" y="235" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#33413b">Aquí va tu imagen</text>
     <text x="400" y="285" text-anchor="middle" font-family="monospace" font-size="22" fill="#33413b">${ruta}</text></svg>`);

  modal.addEventListener("error", e => {
    const img = e.target;
    if (img.tagName === "IMG" && !img.dataset.falla) {
      img.dataset.falla = "1";
      img.src = placeholder(img.dataset.ruta || "imagenes/…", img.dataset.color || "#888");
    }
  }, true);

  const lista = (arr, clase = "") => `<ul class="${clase}">${arr.map(x => `<li>${x}</li>`).join("")}</ul>`;
  const idVideo = url => {
    const m = (url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  };

  function bloqueVideo(r) {
    const id = idVideo(r.video);
    if (id) {
      return `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="Video sobre la ${r.nombre}"
        allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
        <a class="enlace-yt" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Ver el video en YouTube</a>`;
    }
    const q = encodeURIComponent(r.videoBusqueda || r.nombre + " Colombia");
    return `<div class="video vacio"><p>Pega el enlace de YouTube en <code>video</code> dentro de <code>js/mapa-datos.js</code> y el video aparecerá aquí.</p></div>
      <a class="enlace-yt" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Buscar videos de esta región en YouTube</a>`;
  }

  function abrirRegion(id) {
    const r = DATOS[id];
    mapa.closePopup();
    contenido.innerHTML = `
      <header class="m-cab" style="--c:${r.color}">
        <div>
          <h2 id="modal-titulo">${r.nombre}</h2>
          <p class="lema">${r.lema}</p>
        </div>
        <span class="grado">Ciencias Sociales · Grado 4</span>
      </header>

      <div class="m-cuerpo">
        <section class="galeria" aria-label="Imágenes de la región">
          <img id="foto" class="foto" src="${r.imagenes[0]}" data-ruta="${r.imagenes[0]}" data-color="${r.color}" alt="${r.nombre}: imagen 1">
          <div class="miniaturas">
            ${r.imagenes.map((src, i) => `<button type="button" class="mini ${i === 0 ? "on" : ""}" data-i="${i}" aria-label="Ver imagen ${i + 1}">
              <img src="${src}" data-ruta="${src}" data-color="${r.color}" alt=""></button>`).join("")}
          </div>
        </section>

        <p class="resumen">${r.resumen}</p>

        <div class="rejilla">
          <article class="tarjeta ancha"><h3>Historia</h3><p>${r.historia}</p></article>
          <article class="tarjeta"><h3>Vestimenta típica</h3><p>${r.vestimenta}</p></article>
          <article class="tarjeta"><h3>Bailes típicos</h3>${lista(r.bailes, "etiquetas")}</article>
          <article class="tarjeta"><h3>Música típica</h3><p>${r.musica}</p></article>
          <article class="tarjeta"><h3>Su gente</h3><p>${r.gente}</p></article>
          <article class="tarjeta"><h3>Comida típica</h3>${lista(r.comida)}</article>
          <article class="tarjeta"><h3>Fiestas y festivales</h3>${lista(r.festivales)}</article>
          <article class="tarjeta"><h3>Lugares para visitar</h3>${lista(r.lugares)}</article>
          <article class="tarjeta"><h3>Naturaleza</h3><p>${r.naturaleza}</p></article>
          <article class="tarjeta destacada ancha"><h3>¿Sabías que…?</h3>${lista(r.curiosos)}</article>
          <article class="tarjeta ancha"><h3>Departamentos y capitales</h3>
            <table><tbody>${r.departamentos.map(([d, c]) => `<tr><th scope="row">${d}</th><td>${c}</td></tr>`).join("")}</tbody></table>
          </article>
        </div>

        <section class="tarjeta ancha video-bloque"><h3>Mira el video</h3>${bloqueVideo(r)}</section>
      </div>`;

    contenido.querySelectorAll(".mini").forEach(b => b.addEventListener("click", () => {
      const foto = $("#foto"), src = r.imagenes[+b.dataset.i];
      foto.dataset.falla = ""; foto.dataset.ruta = src; foto.src = src; foto.alt = `${r.nombre}: imagen ${+b.dataset.i + 1}`;
      contenido.querySelectorAll(".mini").forEach(x => x.classList.toggle("on", x === b));
    }));

    modal.style.setProperty("--c", r.color);
    if (!modal.open) modal.showModal();
    modal.scrollTop = 0;
    $(".m-cuerpo", modal).scrollTop = 0;
  }

  const cerrar = () => { modal.close(); };
  $("#cerrar").addEventListener("click", cerrar);
  modal.addEventListener("click", e => { if (e.target === modal) cerrar(); }); // clic en el fondo
  modal.addEventListener("close", () => { contenido.innerHTML = ""; }); // detiene el video al cerrar
})();
