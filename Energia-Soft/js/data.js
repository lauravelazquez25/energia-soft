// ============================================================
//  DATOS DEL JUEGO - 10 Actividades con recursos energéticos
// ============================================================

const ACTIVIDADES = [
  {
    id: 1,
    titulo: "Campo Solar",
    emoji: "☀️",
    escena: "solar",
    descripcion: "Estás en un gran campo abierto donde se instalan diferentes tecnologías energéticas.",
    fondo: "linear-gradient(180deg, #FFF176 0%, #FFEE58 40%, #A5D6A7 40%, #66BB6A 100%)",
    recursos: [
      {
        nombre: "Panel Solar",
        emoji: "🟨",
        tipo: "renovable",
        explicacion: "Los paneles solares captan la energía del Sol, que es inagotable y no contamina."
      },
      {
        nombre: "Carbón Mineral",
        emoji: "⬛",
        tipo: "no-renovable",
        explicacion: "El carbón es un combustible fósil que tardó millones de años en formarse y se agota al usarse."
      },
      {
        nombre: "Turbina Eólica",
        emoji: "💨",
        tipo: "renovable",
        explicacion: "La energía del viento es renovable porque el viento seguirá soplando naturalmente."
      },
      {
        nombre: "Petróleo",
        emoji: "🛢️",
        tipo: "no-renovable",
        explicacion: "El petróleo es un recurso fósil limitado que tomó millones de años en formarse."
      }
    ]
  },
  {
    id: 2,
    titulo: "Costa Marina",
    emoji: "🌊",
    escena: "marina",
    descripcion: "La costa está llena de energía: las olas, las mareas y también plataformas de extracción.",
    fondo: "linear-gradient(180deg, #87CEEB 0%, #4FC3F7 50%, #0288D1 50%, #01579B 100%)",
    recursos: [
      {
        nombre: "Energía Mareomotriz",
        emoji: "🌊",
        tipo: "renovable",
        explicacion: "Las mareas son causadas por la Luna y el Sol, son un recurso natural inagotable."
      },
      {
        nombre: "Gas Natural",
        emoji: "🔵",
        tipo: "no-renovable",
        explicacion: "El gas natural es un combustible fósil que se agota y produce CO₂ al quemarse."
      },
      {
        nombre: "Energía de las Olas",
        emoji: "〰️",
        tipo: "renovable",
        explicacion: "La energía undimotriz aprovecha el movimiento continuo de las olas del mar."
      },
      {
        nombre: "Fuel Oil (Marina)",
        emoji: "⛽",
        tipo: "no-renovable",
        explicacion: "El fuel oil es un derivado del petróleo, combustible fósil no renovable y contaminante."
      }
    ]
  },
  {
    id: 3,
    titulo: "Montaña y Volcán",
    emoji: "🏔️",
    escena: "montana",
    descripcion: "Las montañas guardan energía bajo tierra y también recursos que se extraen con minería.",
    fondo: "linear-gradient(180deg, #B0BEC5 0%, #78909C 35%, #5D4037 35%, #4E342E 100%)",
    recursos: [
      {
        nombre: "Energía Geotérmica",
        emoji: "♨️",
        tipo: "renovable",
        explicacion: "El calor interno de la Tierra es prácticamente inagotable y una fuente renovable."
      },
      {
        nombre: "Carbón (mina)",
        emoji: "⛏️",
        tipo: "no-renovable",
        explicacion: "El carbón extraído de minas es un combustible fósil con reservas limitadas."
      },
      {
        nombre: "Biomasa Forestal",
        emoji: "🪵",
        tipo: "renovable",
        explicacion: "La madera de bosques gestionados es renovable si se replanta lo que se consume."
      },
      {
        nombre: "Gas de Esquisto",
        emoji: "💥",
        tipo: "no-renovable",
        explicacion: "El gas de esquisto (fracking) es un combustible fósil no renovable y muy contaminante."
      }
    ]
  },
  {
    id: 4,
    titulo: "Parque Eólico",
    emoji: "🌬️",
    escena: "eolico",
    descripcion: "Un parque eólico offshore, pero cerca también hay barcos tanqueros de combustible.",
    fondo: "linear-gradient(180deg, #E1F5FE 0%, #B3E5FC 50%, #4FC3F7 50%, #0288D1 100%)",
    recursos: [
      {
        nombre: "Turbinas Offshore",
        emoji: "🌀",
        tipo: "renovable",
        explicacion: "Las turbinas eólicas marinas aprovechan vientos más intensos y constantes."
      },
      {
        nombre: "Gas Natural Licuado",
        emoji: "🚢",
        tipo: "no-renovable",
        explicacion: "El GNL (gas natural licuado) es un combustible fósil transportado en barcos tanqueros."
      },
      {
        nombre: "Hidrógeno Verde",
        emoji: "💧",
        tipo: "renovable",
        explicacion: "El hidrógeno verde se produce con energías renovables y no emite CO₂."
      },
      {
        nombre: "Petróleo Crudo",
        emoji: "🛢️",
        tipo: "no-renovable",
        explicacion: "El petróleo crudo es la base de los combustibles fósiles, un recurso no renovable."
      }
    ]
  },
  {
    id: 5,
    titulo: "Ciudad Industrial",
    emoji: "🏭",
    escena: "industrial",
    descripcion: "En esta ciudad conviven fábricas modernas con instalaciones de energía limpia.",
    fondo: "linear-gradient(180deg, #CFD8DC 0%, #90A4AE 45%, #607D8B 45%, #455A64 100%)",
    recursos: [
      {
        nombre: "Gas Natural",
        emoji: "🔵",
        tipo: "no-renovable",
        explicacion: "El gas natural, aunque menos contaminante que el carbón, sigue siendo un fósil no renovable."
      },
      {
        nombre: "Energía Solar Térmica",
        emoji: "🌡️",
        tipo: "renovable",
        explicacion: "Los colectores solares térmicos usan el Sol para calentar agua y procesos industriales."
      },
      {
        nombre: "Carbón de Coque",
        emoji: "⬛",
        tipo: "no-renovable",
        explicacion: "El carbón de coque se usa en industrias siderúrgicas; es un combustible fósil."
      },
      {
        nombre: "Biomasa Industrial",
        emoji: "♻️",
        tipo: "renovable",
        explicacion: "Los residuos orgánicos industriales pueden usarse como biomasa para generar energía."
      }
    ]
  },
  {
    id: 6,
    titulo: "Granja Ecológica",
    emoji: "🌾",
    escena: "granja",
    descripcion: "Una granja que mezcla prácticas tradicionales con tecnologías limpias.",
    fondo: "linear-gradient(180deg, #C8E6C9 0%, #81C784 40%, #558B2F 40%, #33691E 100%)",
    recursos: [
      {
        nombre: "Biogás (residuos)",
        emoji: "🐄",
        tipo: "renovable",
        explicacion: "El biogás se obtiene de residuos animales y vegetales. Es renovable y reduce desechos."
      },
      {
        nombre: "Gasoil / Diésel",
        emoji: "⛽",
        tipo: "no-renovable",
        explicacion: "El gasoil es un derivado del petróleo, utilizado en maquinaria agrícola. No es renovable."
      },
      {
        nombre: "Energía Solar (riego)",
        emoji: "☀️",
        tipo: "renovable",
        explicacion: "Los sistemas de bombeo solar usan energía fotovoltaica para regar sin combustibles."
      },
      {
        nombre: "Lubricantes Minerales",
        emoji: "🔧",
        tipo: "no-renovable",
        explicacion: "Los lubricantes derivados del petróleo son productos fósiles no renovables."
      }
    ]
  },
  {
    id: 7,
    titulo: "Río y Presa",
    emoji: "💧",
    escena: "presa",
    descripcion: "Una gran presa hidroeléctrica y zona de extracción de recursos fósiles cercana.",
    fondo: "linear-gradient(180deg, #B3E5FC 0%, #29B6F6 40%, #1B5E20 40%, #2E7D32 100%)",
    recursos: [
      {
        nombre: "Energía Hidroeléctrica",
        emoji: "🏗️",
        tipo: "renovable",
        explicacion: "Las presas aprovechan el ciclo del agua, que se renueva con la lluvia constantemente."
      },
      {
        nombre: "Carbón Lignito",
        emoji: "⬛",
        tipo: "no-renovable",
        explicacion: "El lignito es el carbón de menor calidad y mayor emisión de CO₂. Es un fósil no renovable."
      },
      {
        nombre: "Energía Minihidráulica",
        emoji: "💦",
        tipo: "renovable",
        explicacion: "Las pequeñas turbinas en ríos generan electricidad sin grandes represas."
      },
      {
        nombre: "Petróleo de Esquisto",
        emoji: "🪨",
        tipo: "no-renovable",
        explicacion: "El petróleo de esquisto requiere fracking, un proceso dañino para el medio ambiente."
      }
    ]
  },
  {
    id: 8,
    titulo: "Central Nuclear",
    emoji: "⚛️",
    escena: "nuclear",
    descripcion: "Una central de alta tecnología donde coexisten distintas fuentes de energía.",
    fondo: "linear-gradient(180deg, #E8EAF6 0%, #9FA8DA 45%, #3F51B5 45%, #283593 100%)",
    recursos: [
      {
        nombre: "Uranio (fisión)",
        emoji: "☢️",
        tipo: "no-renovable",
        explicacion: "El uranio es un mineral que se agota. La energía nuclear no es renovable aunque emite poco CO₂."
      },
      {
        nombre: "Hidrógeno Verde",
        emoji: "🟢",
        tipo: "renovable",
        explicacion: "Producido por electrólisis con energías renovables, el hidrógeno verde es limpio y renovable."
      },
      {
        nombre: "Gas Natural (central)",
        emoji: "🔥",
        tipo: "no-renovable",
        explicacion: "El gas natural como respaldo de centrales es un combustible fósil no renovable."
      },
      {
        nombre: "Energía Solar FV",
        emoji: "🌞",
        tipo: "renovable",
        explicacion: "Los paneles fotovoltaicos captan luz solar directamente para producir electricidad."
      }
    ]
  },
  {
    id: 9,
    titulo: "Ciudad del Futuro",
    emoji: "🏙️",
    escena: "futuro",
    descripcion: "Una ciudad inteligente donde transitan vehículos eléctricos y coexisten distintas energías.",
    fondo: "linear-gradient(180deg, #F3E5F5 0%, #CE93D8 40%, #7B1FA2 40%, #4A148C 100%)",
    recursos: [
      {
        nombre: "Auto Eléctrico Solar",
        emoji: "🚗",
        tipo: "renovable",
        explicacion: "Los vehículos eléctricos cargados con energía solar no emiten CO₂ ni usan fósiles."
      },
      {
        nombre: "Kerosene (aviación)",
        emoji: "✈️",
        tipo: "no-renovable",
        explicacion: "El kerosene es un derivado del petróleo usado en aviación. Es un combustible fósil."
      },
      {
        nombre: "Biocombustible (E85)",
        emoji: "🌽",
        tipo: "renovable",
        explicacion: "Los biocombustibles de cultivos energéticos son renovables, aunque su huella ambiental varía."
      },
      {
        nombre: "Diésel (transporte)",
        emoji: "🚛",
        tipo: "no-renovable",
        explicacion: "El diésel sigue siendo el combustible dominante en transporte pesado. No es renovable."
      }
    ]
  },
  {
    id: 10,
    titulo: "Reto Final: El Gran Clasificador",
    emoji: "🌍",
    escena: "final",
    descripcion: "¡El desafío definitivo! Demuestra todo lo que aprendiste clasificando estos recursos clave.",
    fondo: "linear-gradient(135deg, #1a237e 0%, #006064 25%, #1b5e20 50%, #e65100 75%, #880e4f 100%)",
    recursos: [
      {
        nombre: "Energía Geotérmica",
        emoji: "♨️",
        tipo: "renovable",
        explicacion: "El calor interno terrestre es prácticamente inagotable: recurso 100% renovable."
      },
      {
        nombre: "Carbón Mineral",
        emoji: "⬛",
        tipo: "no-renovable",
        explicacion: "El carbón mineral es el combustible fósil más contaminante y de reservas limitadas."
      },
      {
        nombre: "Energía Eólica",
        emoji: "💨",
        tipo: "renovable",
        explicacion: "El viento es un recurso natural que no se agota: energía renovable por excelencia."
      },
      {
        nombre: "Uranio",
        emoji: "☢️",
        tipo: "no-renovable",
        explicacion: "El uranio es un mineral finito. Aunque la nuclear tiene bajas emisiones, no es renovable."
      }
    ]
  }
];

// Puntos por actividad y por recurso correcto
const PUNTOS_POR_ACTIVIDAD = 10;
const RECURSOS_POR_ACTIVIDAD = 4;
const PUNTOS_POR_RECURSO = PUNTOS_POR_ACTIVIDAD / RECURSOS_POR_ACTIVIDAD; // 2.5

// Escala de calificación (0-10)
function calcularNota(puntaje) {
  const porcentaje = puntaje / 100;
  if (porcentaje >= 0.9) return { nota: 10, mensaje: "¡Sobresaliente! Eres un experto en energías.", color: "#2E7D32" };
  if (porcentaje >= 0.8) return { nota: 9, mensaje: "¡Excelente trabajo! Dominás el tema.", color: "#388E3C" };
  if (porcentaje >= 0.7) return { nota: 7, mensaje: "¡Muy bien! Seguí aprendiendo.", color: "#F57F17" };
  if (porcentaje >= 0.6) return { nota: 6, mensaje: "Bien. Hay cosas para repasar.", color: "#E65100" };
  if (porcentaje >= 0.5) return { nota: 5, mensaje: "Aprobado. Te recomiendo repasar el material.", color: "#BF360C" };
  return { nota: 4, mensaje: "Necesitás repasar los conceptos de energías.", color: "#B71C1C" };
}
