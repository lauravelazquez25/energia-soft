// ============================================================
//  LÓGICA DEL JUEGO - Estado, puntaje y progresión
// ============================================================

const Estado = {
  nombreJugador: "",
  actividadActual: 0,       // índice en ACTIVIDADES (0-9)
  puntajeTotal: 0,
  puntajeActividad: 0,
  respuestasActividad: [],  // {nombre, correcta: bool}
  actividadesCompletadas: [],
  enJuego: false,
  recursosRestantes: [],    // recursos de la actividad actual pendientes
  recursosRespondidos: [],  // recursos ya respondidos en esta actividad
};

// ——— Iniciar juego ———
function iniciarJuego(nombre) {
  Estado.nombreJugador = nombre.trim();
  Estado.actividadActual = 0;
  Estado.puntajeTotal = 0;
  Estado.actividadesCompletadas = [];
  Estado.enJuego = true;
  mostrarMapa();
}

// ——— Iniciar actividad ———
function iniciarActividad(indice) {
  Estado.actividadActual = indice;
  Estado.puntajeActividad = 0;
  Estado.respuestasActividad = [];
  // Mezclar recursos aleatoriamente
  Estado.recursosRestantes = shuffleArray([...ACTIVIDADES[indice].recursos]);
  Estado.recursosRespondidos = [];
  mostrarActividad(ACTIVIDADES[indice]);
}

// ——— Procesar respuesta del jugador ———
function responder(recurso, tipoElegido) {
  const esCorrecta = recurso.tipo === tipoElegido;
  const puntos = esCorrecta ? PUNTOS_POR_RECURSO : 0;

  Estado.puntajeActividad += puntos;
  Estado.puntajeTotal += puntos;
  Estado.respuestasActividad.push({ nombre: recurso.nombre, correcta: esCorrecta });

  // Mover el recurso a respondidos
  Estado.recursosRestantes = Estado.recursosRestantes.filter(r => r.nombre !== recurso.nombre);
  Estado.recursosRespondidos.push({ ...recurso, tipoElegido, esCorrecta });

  // El feedback lo muestra ui.js después de llamar a responder()
}

// ——— Finalizar actividad ———
function finalizarActividad() {
  const actividad = ACTIVIDADES[Estado.actividadActual];
  Estado.actividadesCompletadas.push({
    id: actividad.id,
    titulo: actividad.titulo,
    puntaje: Estado.puntajeActividad,
    respuestas: [...Estado.respuestasActividad]
  });
  mostrarResultadoActividad(actividad, Estado.puntajeActividad, Estado.respuestasActividad);
}

// ——— Ir a la siguiente actividad o al final ———
function siguienteActividad() {
  const siguiente = Estado.actividadActual + 1;
  if (siguiente >= ACTIVIDADES.length) {
    mostrarPantallaFinal();
  } else {
    Estado.actividadActual = siguiente;
    mostrarMapa();
  }
}

// ——— Reiniciar juego ———
function reiniciarJuego() {
  Estado.nombreJugador = "";
  Estado.actividadActual = 0;
  Estado.puntajeTotal = 0;
  Estado.puntajeActividad = 0;
  Estado.respuestasActividad = [];
  Estado.actividadesCompletadas = [];
  Estado.enJuego = false;
  Estado.recursosRestantes = [];
  Estado.recursosRespondidos = [];
  mostrarPantallaInicio();
}

// ——— Utilidad: mezclar array ———
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ——— Obtener porcentaje de progreso ———
function getPorcentajeProgreso() {
  return Math.round((Estado.actividadesCompletadas.length / ACTIVIDADES.length) * 100);
}
