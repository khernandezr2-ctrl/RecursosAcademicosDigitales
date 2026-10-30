/* =========================================================
   MAPA DIDÁCTICO DE COLOMBIA · contenido de cada región
   ---------------------------------------------------------
   • Cambia las imágenes poniendo tus fotos en imagenes/mapa/
     con los mismos nombres (o edita las rutas de "imagenes").
   • Para el video, pega el enlace de YouTube en "video".
     Si lo dejas vacío, aparece un botón que busca en YouTube.
   ========================================================= */

window.REGIONES_DATOS = {

  caribe: {
    nombre: "Región Caribe",
    color: "#ffb02e",
    lema: "Mar, música y sol en el norte del país",
    centro: [9.7, -74.6],
    resumen: "Está al norte de Colombia, frente al mar Caribe. Tiene playas, la Sierra Nevada de Santa Marta y el desierto de La Guajira.",
    departamentos: [
      ["Atlántico", "Barranquilla"], ["Bolívar", "Cartagena de Indias"], ["Cesar", "Valledupar"],
      ["Córdoba", "Montería"], ["La Guajira", "Riohacha"], ["Magdalena", "Santa Marta"], ["Sucre", "Sincelejo"]
    ],
    imagenes: ["imagenes/Caribe1.jpg", "imagenes/Caribe2.jpg", "imagenes/Caribe3.jpg", "imagenes/Caribe4.jpg"],
    historia: "Aquí vivieron los pueblos tayrona, zenú y wayuu. Santa Marta (1525) es la ciudad más antigua de Colombia que aún existe, y Cartagena fue el puerto más importante de España en América. Cerca de Cartagena está San Basilio de Palenque, uno de los primeros pueblos libres fundados por personas africanas que escaparon de la esclavitud.",
    curiosos: [
      "La Sierra Nevada de Santa Marta es la montaña costera más alta del mundo (5.775 m).",
      "El sombrero vueltiao, hecho por el pueblo zenú con caña flecha, es símbolo del país.",
      "El Carnaval de Barranquilla es Patrimonio Cultural Inmaterial de la Humanidad (UNESCO)."
    ],
    vestimenta: "Las mujeres usan faldas amplias y coloridas con volantes, blusas blancas y flores en el cabello. Los hombres visten pantalón y camisa blancos, pañuelo rojo al cuello y sombrero vueltiao.",
    bailes: ["Cumbia", "Mapalé", "Porro", "Fandango", "Son de negro"],
    musica: "El vallenato se toca con acordeón, caja y guacharaca. La cumbia suena con gaitas y tambores. Cada año se celebra el Festival de la Leyenda Vallenata en Valledupar.",
    gente: "Los costeños son conocidos por su alegría y su forma de hablar. Aquí viven comunidades indígenas wayuu, arhuaco, kogui y zenú, y muchas familias afrocolombianas.",
    comida: [
      "Arroz de coco con pescado frito", "Sancocho de pescado", "Mote de queso",
      "Arepa de huevo", "Bollo de mazorca", "Butifarra soledeña", "Enyucado"
    ],
    festivales: ["Carnaval de Barranquilla (febrero)", "Festival de la Leyenda Vallenata (abril)", "Festival Internacional de Cine de Cartagena"],
    lugares: ["Cartagena y su ciudad amurallada", "Parque Tayrona", "Cabo de la Vela", "Mompox", "Islas del Rosario"],
    naturaleza: "Playas, manglares, la Ciénaga Grande, el desierto de La Guajira, flamencos rosados y tortugas marinas.",
    video: "https://www.youtube.com/watch?v=uSt74kYpRd8",
    videoBusqueda: "región caribe de colombia cultura para niños"
  },

  andina: {
    nombre: "Región Andina",
    color: "#e4572e",
    lema: "Tres cordilleras, cafetales y la capital del país",
    centro: [6.2, -74.6],
    resumen: "Es el centro del país, recorrido por tres cordilleras: Occidental, Central y Oriental. Aquí vive la mayor parte de los colombianos y está Bogotá, la capital.",
    departamentos: [
      ["Antioquia", "Medellín"], ["Boyacá", "Tunja"], ["Caldas", "Manizales"], ["Cundinamarca", "Bogotá"],
      ["Huila", "Neiva"], ["Norte de Santander", "Cúcuta"], ["Quindío", "Armenia"], ["Risaralda", "Pereira"],
      ["Santander", "Bucaramanga"], ["Tolima", "Ibagué"], ["Bogotá D.C.", "Bogotá"]
    ],
    imagenes: ["imagenes/Andina1.jpg", "imagenes/Andina2.jpg", "imagenes/Andina3.jpg", "imagenes/Andina4.jpg"],
    historia: "En esta región vivían los muiscas, que hacían ceremonias en la laguna de Guatavita y dieron origen a la leyenda de El Dorado. Bogotá fue fundada en 1538 por Gonzalo Jiménez de Quesada. El 7 de agosto de 1819, en la Batalla de Boyacá, el ejército de Simón Bolívar logró un triunfo decisivo para la independencia.",
    curiosos: [
      "El Paisaje Cultural Cafetero (Eje Cafetero) es Patrimonio de la Humanidad desde 2011.",
      "La Catedral de Sal de Zipaquirá está construida dentro de una mina.",
      "En el valle de Cocora crece la palma de cera, el árbol nacional de Colombia."
    ],
    vestimenta: "En el altiplano se usa la ruana de lana, el sombrero y las alpargatas. El paisa tradicional lleva carriel, poncho y sombrero aguadeño. Las mujeres usan vestidos largos con volantes y chal.",
    bailes: ["Bambuco", "Torbellino", "Guabina", "Pasillo", "Sanjuanero huilense"],
    musica: "Se toca con tiple, guitarra, bandola y requinto. En Neiva se celebra el Festival Folclórico y Reinado Nacional del Bambuco, y en Medellín el Desfile de Silleteros.",
    gente: "Paisas (Antioquia y Eje Cafetero), cachacos (Bogotá), boyacenses, santandereanos y opitas (Huila). Son personas trabajadoras, muy ligadas al campo y al café.",
    comida: [
      "Bandeja paisa", "Ajiaco santafereño", "Arepa paisa", "Tamal tolimense",
      "Lechona", "Cuchuco de trigo", "Obleas con arequipe", "Hormigas culonas (Santander)"
    ],
    festivales: ["Feria de las Flores (Medellín)", "Festival del Bambuco (Neiva)", "Carnaval de Riosucio", "Festival Iberoamericano de Teatro (Bogotá)"],
    lugares: ["Bogotá y Monserrate", "Medellín", "Villa de Leyva", "Cañón del Chicamocha", "Nevado del Ruiz", "Valle de Cocora"],
    naturaleza: "Páramos, nevados, bosques de niebla, cóndores andinos, osos de anteojos y miles de especies de orquídeas.",
    video: "https://www.youtube.com/watch?v=WXqANh9Jdbw",
    videoBusqueda: "región andina de colombia cultura para niños"
  },

  pacifica: {
    nombre: "Región Pacífica",
    color: "#2ec4b6",
    lema: "Selva lluviosa, marimba y ballenas jorobadas",
    centro: [5.2, -76.9],
    resumen: "Se extiende a lo largo del océano Pacífico. Es una de las zonas más lluviosas del planeta y tiene selvas muy húmedas, ríos y costas con ballenas.",
    departamentos: [
      ["Chocó", "Quibdó"], ["Valle del Cauca", "Cali"], ["Cauca", "Popayán"], ["Nariño", "Pasto"]
    ],
    imagenes: ["imagenes/Pacifico1.png", "imagenes/Pacifico2.png", "imagenes/Pacifico3.jpg", "imagenes/Pacifico4.jpg"],
    historia: "Pueblos indígenas como los emberá, wounaan y awá habitan estas selvas desde hace siglos. Muchas personas africanas esclavizadas fueron traídas a trabajar en las minas de oro, y sus descendientes mantienen vivas sus tradiciones. Cali fue fundada en 1536 y Popayán en 1537 por Sebastián de Belalcázar. Buenaventura es el puerto más importante del Pacífico colombiano.",
    curiosos: [
      "Entre julio y octubre llegan ballenas jorobadas a Nuquí, Bahía Solano y Gorgona para tener a sus crías.",
      "La música de marimba del Pacífico sur es Patrimonio de la Humanidad (UNESCO).",
      "Cali es conocida como la capital mundial de la salsa."
    ],
    vestimenta: "Las mujeres afrocolombianas usan faldas amplias y de colores vivos, blusas y turbantes en la cabeza. Las mujeres emberá llevan la paruma (una falda) y collares de chaquiras de muchos colores.",
    bailes: ["Currulao", "Abozao", "Jota chocoana", "Contradanza", "Salsa caleña"],
    musica: "Se toca con marimba de chonta, cununos, bombo y guasá. El Festival de Música del Pacífico Petronio Álvarez, en Cali, reúne a cantadoras y músicos de toda la región.",
    gente: "Predomina la población afrocolombiana, junto a pueblos indígenas emberá, wounaan, awá, nasa y misak. Son comunidades muy unidas, con cantos y relatos que pasan de abuelos a nietos.",
    comida: [
      "Encocado de pescado", "Arroz con coco", "Sancocho de pescado", "Tapao",
      "Empanadas de cambray", "Cocadas", "Borojó (fruta)", "Chontaduro"
    ],
    festivales: ["Festival Petronio Álvarez (Cali)", "Carnaval de Negros y Blancos (Pasto)", "Semana Santa de Popayán", "Feria de Cali"],
    lugares: ["Bahía Solano y Nuquí", "Parque Gorgona", "Popayán, la ciudad blanca", "Laguna de la Cocha", "Santuario de Las Lajas"],
    naturaleza: "Selva húmeda tropical, manglares, ballenas jorobadas, ranas de colores y aves como el tucán.",
    video: "https://www.youtube.com/watch?v=NbupVGKEdRg",
    videoBusqueda: "región pacífica de colombia cultura para niños"
  },

  orinoquia: {
    nombre: "Región Orinoquía",
    color: "#c9e265",
    lema: "Llanos infinitos, joropo y vaqueros",
    centro: [5.2, -71.0],
    resumen: "También se llama Llanos Orientales. Son grandes sabanas planas al oriente de la cordillera, recorridas por ríos que van hacia el Orinoco.",
    departamentos: [
      ["Arauca", "Arauca"], ["Casanare", "Yopal"], ["Meta", "Villavicencio"], ["Vichada", "Puerto Carreño"]
    ],
    imagenes: ["imagenes/Orinoco1.jpg", "imagenes/Orinoco2.jpg", "imagenes/Orinoco3.jpg", "imagenes/Orinoco4.jpg"],
    historia: "Los pueblos sikuani y achagua vivían aquí antes de la llegada de los españoles. Con el tiempo, el ganado se volvió la base de la vida en los Llanos y nació el oficio del llanero. En 1819 los llaneros y lanceros, como los de Juan José Rondón en el Pantano de Vargas, fueron claves para la independencia.",
    curiosos: [
      "Caño Cristales, en la Serranía de La Macarena, es llamado el «río de los cinco colores».",
      "El chigüiro o capibara, el roedor más grande del mundo, vive en estas sabanas.",
      "El coleo, derribar un toro tomándolo de la cola, es el deporte más típico."
    ],
    vestimenta: "El hombre lleva el liquiliqui (camisa y pantalón del mismo tejido, casi siempre blanco o crema), sombrero llanero y alpargatas. La mujer usa un vestido amplio, de colores vivos y con volantes.",
    bailes: ["Joropo", "Galerón", "Pasaje", "Zumba que zumba"],
    musica: "Se interpreta con arpa llanera, cuatro y maracas. El Torneo Internacional del Joropo, en Villavicencio, reúne a los mejores bailarines y cantantes de la región.",
    gente: "Los llaneros son recordados por su valentía, su hospitalidad y sus coplas improvisadas. También viven pueblos indígenas como los sikuani, piapoco y cuiva.",
    comida: [
      "Carne a la llanera", "Mamona (ternera a la llanera)", "Hayacas", "Pisillo de chigüiro",
      "Cachama frita", "Tungos", "Arepa llanera"
    ],
    festivales: ["Torneo Internacional del Joropo", "Mundial de Coleo", "Festival de Verano de Yopal", "Festival Internacional de la Cachama"],
    lugares: ["Caño Cristales", "Parque Nacional El Tuparro", "Río Orinoco", "Villavicencio, puerta del Llano"],
    naturaleza: "Sabanas, ríos, esteros, delfines rosados, chigüiros, caimanes, garzas y miles de aves migratorias.",
    video: "https://www.youtube.com/watch?v=zAridlSBQBM",
    videoBusqueda: "región orinoquía llanos orientales colombia cultura para niños"
  },

  amazonia: {
    nombre: "Región Amazonía",
    color: "#2e9e57",
    lema: "La selva más grande del país",
    centro: [-0.3, -72.4],
    resumen: "Ocupa casi el 40 % del territorio colombiano. Es una selva tropical atravesada por grandes ríos y con una enorme variedad de plantas y animales.",
    departamentos: [
      ["Amazonas", "Leticia"], ["Caquetá", "Florencia"], ["Guainía", "Inírida"],
      ["Guaviare", "San José del Guaviare"], ["Putumayo", "Mocoa"], ["Vaupés", "Mitú"]
    ],
    imagenes: ["imagenes/Amazona1.jpg", "imagenes/Amazon2.jpg", "imagenes/Amazona3.jpg", "imagenes/Amazona4.jpg"],
    historia: "Es la región con más pueblos indígenas del país: ticuna, murui-muinane (huitoto), tukano, yagua, nukak y muchos más. A comienzos del siglo XX la explotación del caucho trajo mucho sufrimiento a las comunidades. Hoy esos pueblos protegen la selva y mantienen vivas sus lenguas, sus mitos y su conocimiento de las plantas.",
    curiosos: [
      "El Parque Nacional Chiribiquete es Patrimonio Mundial de la UNESCO y guarda miles de pinturas rupestres.",
      "En el río Amazonas viven delfines rosados y la flor victoria regia.",
      "Desde Leticia se puede llegar a Brasil y Perú caminando o en lancha."
    ],
    vestimenta: "Los trajes tradicionales se hacen con fibras vegetales, plumas, semillas y pintura corporal. Los ticuna elaboran telas y máscaras con la corteza del árbol llanchama.",
    bailes: ["Danzas rituales indígenas", "Danza de la Pelazón", "Carnaval del Perdón (Sibundoy)"],
    musica: "Se usan flautas, maracas, tambores y el maguaré, un tambor que se escucha a muchos kilómetros y sirve para «hablar» entre malocas.",
    gente: "Predominan los pueblos indígenas, con sus lenguas propias y sus malocas (casas comunales). También viven colonos y familias de la región andina.",
    comida: [
      "Pescado con casabe", "Maito de pescado", "Mañoco y fariña (de yuca)", "Tucupí",
      "Pirarucú", "Asaí", "Arazá y copoazú (frutas)", "Chontaduro"
    ],
    festivales: ["Carnaval del Perdón (Sibundoy, Putumayo)", "Festival de la Confraternidad Amazónica (Leticia)", "Festival Internacional del Retorno (Guaviare)"],
    lugares: ["Leticia y Puerto Nariño", "Parque Chiribiquete", "Serranía de la Lindosa", "Cerros de Mavecure", "Río Amazonas"],
    naturaleza: "Jaguares, delfines rosados, guacamayas, perezosos, anacondas, pirañas y árboles gigantes como la ceiba.",
    video: "https://www.youtube.com/watch?v=XM1TzDktc5g",
    videoBusqueda: "región amazonía de colombia cultura para niños"
  },

  insular: {
    nombre: "Región Insular",
    color: "#b388eb",
    lema: "Islas, corales y el mar de siete colores",
    centro: [13.2, -80.6],
    resumen: "Son las islas del país. La más conocida es el archipiélago de San Andrés, Providencia y Santa Catalina, en el mar Caribe, a más de 700 km de la costa colombiana.",
    departamentos: [
      ["San Andrés, Providencia y Santa Catalina", "San Andrés"]
    ],
    imagenes: ["imagenes/Región Insular.jpg", "imagenes/Insular1.png", "imagenes/Insular2.jpg", "imagenes/Insular3.jpg"],
    historia: "En 1629 llegaron colonos ingleses puritanos a Providencia y trajeron personas africanas esclavizadas. De esa mezcla nació el pueblo raizal, que habla creole sanandresano, además de inglés y español. Por estas aguas pasaron piratas como Henry Morgan. En 2012 la Corte Internacional de Justicia confirmó la soberanía de Colombia sobre las islas.",
    curiosos: [
      "Se le llama el «mar de los siete colores» por los tonos de azul y verde del agua.",
      "Es Reserva de Biosfera de la UNESCO (Seaflower).",
      "En Providencia está una de las barreras de coral más grandes del mundo."
    ],
    vestimenta: "Se usa ropa fresca y clara. En las fiestas, las mujeres raizales llevan vestidos largos de falda amplia y sombreros de paja, y los hombres camisa clara y pantalón oscuro.",
    bailes: ["Calipso", "Mento", "Schottische", "Polka", "Mazurca", "Quadrille"],
    musica: "Suenan el calipso, el reggae, el soca y el mento, con guitarra, mandolina, quijada de caballo y bote. En Providencia se celebra el Green Moon Festival.",
    gente: "Los raizales son un pueblo afrocaribeño y anglófono, de religión bautista en su mayoría. También viven isleños de otras partes del país.",
    comida: [
      "Rondón (sopa de pescado, caracol, yuca y leche de coco)", "Cangrejo negro guisado", "Pescado frito con patacón",
      "Arroz de coco", "Pan de coco", "Cake de ron"
    ],
    festivales: ["Green Moon Festival", "Festival del Cangrejo (Providencia)", "Semana Cultural Raizal"],
    lugares: ["Johnny Cay", "Acuario y Haynes Cay", "Hoyo Soplador", "Cueva de Morgan", "Providencia y Santa Catalina"],
    naturaleza: "Arrecifes de coral, peces loro, tortugas, rayas, cangrejos negros y manglares.",
    video: "https://www.youtube.com/watch?v=5WepJRFcI4I",
    videoBusqueda: "región insular san andrés y providencia cultura para niños"
  }
};

/* Capitales: [nombre, departamento, latitud, longitud, región] */
window.CAPITALES = [
  ["Bogotá", "Bogotá D.C. (capital del país)", 4.711, -74.0721, "andina"],
  ["Medellín", "Antioquia", 6.2442, -75.5812, "andina"],
  ["Tunja", "Boyacá", 5.5353, -73.3678, "andina"],
  ["Manizales", "Caldas", 5.0703, -75.5138, "andina"],
  ["Neiva", "Huila", 2.9273, -75.2819, "andina"],
  ["Cúcuta", "Norte de Santander", 7.8939, -72.5078, "andina"],
  ["Armenia", "Quindío", 4.5339, -75.6811, "andina"],
  ["Pereira", "Risaralda", 4.8133, -75.6961, "andina"],
  ["Bucaramanga", "Santander", 7.1193, -73.1227, "andina"],
  ["Ibagué", "Tolima", 4.4389, -75.2322, "andina"],
  ["Barranquilla", "Atlántico", 10.9685, -74.7813, "caribe"],
  ["Cartagena", "Bolívar", 10.391, -75.4794, "caribe"],
  ["Valledupar", "Cesar", 10.4631, -73.2532, "caribe"],
  ["Montería", "Córdoba", 8.7479, -75.8814, "caribe"],
  ["Riohacha", "La Guajira", 11.5444, -72.9072, "caribe"],
  ["Santa Marta", "Magdalena", 11.2408, -74.199, "caribe"],
  ["Sincelejo", "Sucre", 9.3047, -75.3978, "caribe"],
  ["Quibdó", "Chocó", 5.6947, -76.6611, "pacifica"],
  ["Cali", "Valle del Cauca", 3.4516, -76.532, "pacifica"],
  ["Popayán", "Cauca", 2.4448, -76.6147, "pacifica"],
  ["Pasto", "Nariño", 1.2136, -77.2811, "pacifica"],
  ["Arauca", "Arauca", 7.0847, -70.7591, "orinoquia"],
  ["Yopal", "Casanare", 5.3378, -72.3959, "orinoquia"],
  ["Villavicencio", "Meta", 4.142, -73.6266, "orinoquia"],
  ["Puerto Carreño", "Vichada", 6.189, -67.4859, "orinoquia"],
  ["Leticia", "Amazonas", -4.2153, -69.9406, "amazonia"],
  ["Florencia", "Caquetá", 1.6144, -75.6062, "amazonia"],
  ["Inírida", "Guainía", 3.8653, -67.9239, "amazonia"],
  ["San José del Guaviare", "Guaviare", 2.5729, -72.6459, "amazonia"],
  ["Mocoa", "Putumayo", 1.1478, -76.6477, "amazonia"],
  ["Mitú", "Vaupés", 1.253, -70.234, "amazonia"],
  ["San Andrés", "San Andrés y Providencia", 12.5847, -81.7006, "insular"]
];
