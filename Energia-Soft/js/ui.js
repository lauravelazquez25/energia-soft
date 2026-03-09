// ============================================================
//  UI - Renderizado de todas las pantallas
// ============================================================

const app = document.getElementById('app');

// ——— PANTALLA INICIO ———
function mostrarPantallaInicio() {
  app.innerHTML = `
    <div class="pantalla pantalla-inicio">
      <div class="inicio-header">
        <div class="titulo-emoji">🌍⚡</div>
        <h1 class="titulo-juego">EnergíaQuiz</h1>
        <p class="subtitulo">Taller de Energías Convencionales y Alternativas</p>
      </div>
      <div class="inicio-card">
        <p class="bienvenida-texto">
          Recorré 10 sectores del mundo y clasificá los recursos energéticos
          en <strong>Renovables</strong> y <strong>No Renovables</strong>.
        </p>
        <div class="stats-preview">
          <div class="stat-item"><span class="stat-num">10</span><span class="stat-label">Actividades</span></div>
          <div class="stat-item"><span class="stat-num">100</span><span class="stat-label">Puntos</span></div>
          <div class="stat-item"><span class="stat-num">40</span><span class="stat-label">Recursos</span></div>
        </div>
        <div class="form-grupo">
          <label for="nombre-input">¿Cuál es tu nombre?</label>
          <input
            type="text"
            id="nombre-input"
            placeholder="Ingresá tu nombre aquí..."
            maxlength="40"
            autocomplete="off"
          />
        </div>
        <button class="btn-primario" id="btn-comenzar" onclick="validarYComenzar()">
          ¡Comenzar Aventura! 🚀
        </button>
        <p class="nota-pie">Asegurate de leer cada recurso con atención antes de clasificarlo.</p>
      </div>
    </div>
  `;
  const input = document.getElementById('nombre-input');
  input.focus();
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') validarYComenzar();
  });
}

function validarYComenzar() {
  const input = document.getElementById('nombre-input');
  const nombre = input.value.trim();
  if (!nombre) {
    input.classList.add('error');
    input.placeholder = "¡Por favor ingresá tu nombre!";
    input.focus();
    setTimeout(() => input.classList.remove('error'), 1500);
    return;
  }
  iniciarJuego(nombre);
}

// ——— PANTALLA MAPA ———
function mostrarMapa() {
  const completadas = Estado.actividadesCompletadas.length;
  const siguiente = Estado.actividadActual;

  const itemsMapa = ACTIVIDADES.map((act, i) => {
    const completada = Estado.actividadesCompletadas.find(c => c.id === act.id);
    const esSiguiente = i === siguiente && !completada;
    const bloqueada = i > siguiente && !completada;

    let claseItem = 'mapa-item';
    let estadoIcon = '';
    let puntajeTexto = '';

    if (completada) {
      claseItem += ' completada';
      estadoIcon = '✅';
      puntajeTexto = `<span class="mapa-puntos">${completada.puntaje.toFixed(1)} pts</span>`;
    } else if (esSiguiente) {
      claseItem += ' siguiente';
      estadoIcon = '▶️';
    } else if (bloqueada) {
      claseItem += ' bloqueada';
      estadoIcon = '🔒';
    }

    const onclick = (completada || esSiguiente) ? `onclick="iniciarActividad(${i})"` : '';

    return `
      <div class="${claseItem}" ${onclick}>
        <div class="mapa-numero">${act.id}</div>
        <div class="mapa-emoji">${act.emoji}</div>
        <div class="mapa-titulo">${act.titulo}</div>
        ${puntajeTexto}
        <div class="mapa-estado">${estadoIcon}</div>
      </div>
    `;
  }).join('');

  const puntajeActual = Estado.puntajeTotal.toFixed(1);

  app.innerHTML = `
    <div class="pantalla pantalla-mapa">
      <div class="mapa-header">
        <div class="jugador-info">
          <span class="jugador-nombre">👤 ${Estado.nombreJugador}</span>
          <span class="jugador-puntaje">⭐ ${puntajeActual} / 100 pts</span>
        </div>
        <h2>Mapa de Sectores</h2>
        <div class="barra-progreso-container">
          <div class="barra-progreso-fill" style="width: ${getPorcentajeProgreso()}%"></div>
        </div>
        <p class="progreso-texto">${completadas} de ${ACTIVIDADES.length} actividades completadas</p>
      </div>
      <div class="mapa-grid">
        ${itemsMapa}
      </div>
    </div>
  `;
}

// ——— PANTALLA ACTIVIDAD ———
function mostrarActividad(actividad) {
  const recursosHTML = Estado.recursosRestantes.map(recurso => `
    <div class="recurso-card" id="recurso-${sanitize(recurso.nombre)}">
      <div class="recurso-emoji">${recurso.emoji}</div>
      <div class="recurso-nombre">${recurso.nombre}</div>
      <div class="recurso-botones">
        <button class="btn-renovable" onclick="procesarRespuesta('${sanitize(recurso.nombre)}', 'renovable')">
          ♻️ Renovable
        </button>
        <button class="btn-no-renovable" onclick="procesarRespuesta('${sanitize(recurso.nombre)}', 'no-renovable')">
          🛢️ No Renovable
        </button>
      </div>
    </div>
  `).join('');

  const respondidosHTML = Estado.recursosRespondidos.map(r => `
    <div class="recurso-card respondido ${r.esCorrecta ? 'correcto' : 'incorrecto'}">
      <div class="recurso-emoji">${r.emoji}</div>
      <div class="recurso-nombre">${r.nombre}</div>
      <div class="recurso-resultado">${r.esCorrecta ? '✅ Correcto' : '❌ Incorrecto'}</div>
    </div>
  `).join('');

  app.innerHTML = `
    <div class="pantalla pantalla-actividad">
      <div class="actividad-header" style="background: ${actividad.fondo}">
        <button class="btn-volver" onclick="mostrarMapa()">← Volver al mapa</button>
        <div class="actividad-titulo-grupo">
          <span class="actividad-emoji-grande">${actividad.emoji}</span>
          <div>
            <div class="actividad-numero">Actividad ${actividad.id} / ${ACTIVIDADES.length}</div>
            <h2 class="actividad-titulo">${actividad.titulo}</h2>
          </div>
        </div>
        <p class="actividad-descripcion">${actividad.descripcion}</p>
        <div class="puntaje-header">
          ⭐ ${Estado.puntajeActividad.toFixed(1)} / ${PUNTOS_POR_ACTIVIDAD} pts en esta actividad
        </div>
      </div>

      <div class="actividad-cuerpo">
        <div id="zona-feedback"></div>

        ${respondidosHTML ? `<div class="recursos-respondidos">${respondidosHTML}</div>` : ''}

        ${recursosHTML ? `
          <h3 class="clasificar-titulo">Clasificá estos recursos:</h3>
          <div class="recursos-grid" id="recursos-grid">
            ${recursosHTML}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ——— PROCESAR RESPUESTA ———
function procesarRespuesta(nombreSanitizado, tipoElegido) {
  const recurso = Estado.recursosRestantes.find(r => sanitize(r.nombre) === nombreSanitizado);
  if (!recurso) return;

  // Deshabilitar todos los botones mientras se lee el feedback
  document.querySelectorAll('.btn-renovable, .btn-no-renovable').forEach(btn => {
    btn.disabled = true;
  });

  responder(recurso, tipoElegido);

  const esUltimo = Estado.recursosRestantes.length === 0;
  const esCorrecta = Estado.recursosRespondidos[Estado.recursosRespondidos.length - 1].esCorrecta;
  mostrarFeedbackRecurso(recurso, esCorrecta, PUNTOS_POR_RECURSO, esUltimo);
}

// ——— CONTINUAR DESDE FEEDBACK (llamado por el botón) ———
function continuarDesdeFeedback() {
  if (Estado.recursosRestantes.length === 0) {
    finalizarActividad();
  } else {
    mostrarActividad(ACTIVIDADES[Estado.actividadActual]);
  }
}

// ——— FEEDBACK DE RECURSO ———
function mostrarFeedbackRecurso(recurso, esCorrecta, puntos, esUltimo) {
  const zona = document.getElementById('zona-feedback');
  if (!zona) return;

  const tipo = recurso.tipo === 'renovable' ? '♻️ RENOVABLE' : '🛢️ NO RENOVABLE';
  const textoContinuar = esUltimo ? '📊 Ver resultado de la actividad' : '➡️ Siguiente recurso';

  zona.innerHTML = `
    <div class="feedback-recurso ${esCorrecta ? 'feedback-correcto' : 'feedback-incorrecto'}">
      <div class="feedback-icono">${esCorrecta ? '✅' : '❌'}</div>
      <div class="feedback-contenido">
        <strong>${esCorrecta ? '¡Correcto!' : 'Incorrecto'}</strong>
        <span>${recurso.nombre} es ${tipo}</span>
        <p class="feedback-explicacion">${recurso.explicacion}</p>
        ${esCorrecta ? `<span class="feedback-puntos">+${puntos} pts</span>` : `<span class="feedback-puntos">+0 pts</span>`}
      </div>
    </div>
    <button class="btn-continuar-feedback" onclick="continuarDesdeFeedback()">
      ${textoContinuar}
    </button>
  `;

  zona.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ——— RESULTADO DE ACTIVIDAD ———
function mostrarResultadoActividad(actividad, puntaje, respuestas) {
  const correctas = respuestas.filter(r => r.correcta).length;
  const total = respuestas.length;
  const esAprobado = puntaje >= PUNTOS_POR_ACTIVIDAD / 2;

  const detalle = respuestas.map(r => `
    <div class="resultado-item ${r.correcta ? 'correcto' : 'incorrecto'}">
      ${r.correcta ? '✅' : '❌'} ${r.nombre}
    </div>
  `).join('');

  const esUltima = Estado.actividadActual === ACTIVIDADES.length - 1;

  app.innerHTML = `
    <div class="pantalla pantalla-resultado">
      <div class="resultado-header" style="background: ${actividad.fondo}">
        <div class="resultado-emoji-grande">${actividad.emoji}</div>
        <h2>${actividad.titulo}</h2>
        <div class="resultado-puntaje ${esAprobado ? 'aprobado' : 'reprobado'}">
          ${puntaje.toFixed(1)} / ${PUNTOS_POR_ACTIVIDAD}
        </div>
        <div class="resultado-estado">${esAprobado ? '🎉 ¡Bien hecho!' : '📚 A repasar...'}</div>
      </div>
      <div class="resultado-cuerpo">
        <p><strong>${correctas} de ${total}</strong> respuestas correctas</p>
        <div class="resultado-detalle">
          ${detalle}
        </div>
        <div class="resultado-total">
          Puntaje acumulado: <strong>${Estado.puntajeTotal.toFixed(1)} / 100</strong>
        </div>
        <button class="btn-primario" onclick="siguienteActividad()">
          ${esUltima ? '🏁 Ver resultado final' : '▶️ Siguiente actividad'}
        </button>
      </div>
    </div>
  `;
}

// ——— PANTALLA FINAL ———
function mostrarPantallaFinal() {
  const puntaje = Estado.puntajeTotal;
  const { nota, mensaje, color } = calcularNota(puntaje);
  const correctasTotales = Estado.actividadesCompletadas.reduce((acc, a) =>
    acc + a.respuestas.filter(r => r.correcta).length, 0);

  const resumenActividades = Estado.actividadesCompletadas.map(a => `
    <div class="resumen-item">
      <span class="resumen-nombre">${ACTIVIDADES[a.id - 1].emoji} ${a.titulo}</span>
      <span class="resumen-puntos ${a.puntaje >= PUNTOS_POR_ACTIVIDAD / 2 ? 'bien' : 'mal'}">${a.puntaje.toFixed(1)} pts</span>
    </div>
  `).join('');

  const estrellas = getEstrellas(puntaje);

  app.innerHTML = `
    <div class="pantalla pantalla-final">
      <div class="final-header">
        <div class="final-confetti">🎊</div>
        <h1>¡Juego Completado!</h1>
        <div class="final-nombre">👤 ${Estado.nombreJugador}</div>
      </div>

      <div class="final-puntaje-grande" style="color: ${color}">
        ${puntaje.toFixed(1)}<span class="final-de-cien">/ 100</span>
      </div>

      <div class="final-estrellas">${estrellas}</div>

      <div class="final-nota" style="background: ${color}">
        Calificación: <strong>${nota} / 10</strong>
      </div>

      <div class="final-mensaje">${mensaje}</div>

      <div class="final-stats">
        <div class="final-stat">
          <span class="final-stat-num">${correctasTotales}</span>
          <span class="final-stat-label">de 40 correctas</span>
        </div>
        <div class="final-stat">
          <span class="final-stat-num">${Estado.actividadesCompletadas.length}</span>
          <span class="final-stat-label">actividades</span>
        </div>
        <div class="final-stat">
          <span class="final-stat-num">${Math.round((correctasTotales / 40) * 100)}%</span>
          <span class="final-stat-label">precisión</span>
        </div>
      </div>

      <div class="final-resumen">
        <h3>Resumen por actividad</h3>
        ${resumenActividades}
      </div>

      <div id="estado-envio" class="estado-envio estado-enviando">
        ⏳ Enviando resultado a la planilla...
      </div>

      <div class="final-botones">
        <button class="btn-primario" onclick="reiniciarJuego()">
          🔄 Jugar de nuevo
        </button>
        <button class="btn-secundario" onclick="imprimirResultado()">
          🖨️ Imprimir resultado
        </button>
      </div>
    </div>
  `;

  // Enviar resultados a Google Sheets
  enviarResultados(puntaje, nota, correctasTotales);
}

// ——— ENVIAR RESULTADOS A GOOGLE SHEETS ———
function enviarResultados(puntaje, nota, correctasTotales) {
  // Si no hay URL configurada, mostrar aviso discreto
  if (!CONFIG.GOOGLE_SCRIPT_URL) {
    actualizarEstadoEnvio('sin-configurar', '⚙️ Planilla no configurada aún.');
    return;
  }

  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-AR');
  const hora  = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  const detalleTexto = Estado.actividadesCompletadas
    .map(a => `${a.titulo}: ${a.puntaje.toFixed(1)}pts`)
    .join(' | ');

  const datos = {
    nombre:    Estado.nombreJugador,
    fecha:     fecha,
    hora:      hora,
    puntaje:   puntaje,
    nota:      nota,
    correctas: correctasTotales,
    detalle:   detalleTexto,
    actividades: Estado.actividadesCompletadas.map(a => ({ titulo: a.titulo, puntaje: a.puntaje }))
  };

  // Usar GET con parámetros para evitar problemas de CORS desde archivo local
  const params = new URLSearchParams({
    nombre:    datos.nombre,
    fecha:     datos.fecha,
    hora:      datos.hora,
    puntaje:   datos.puntaje,
    nota:      datos.nota,
    correctas: datos.correctas,
    detalle:   datos.detalle
  });

  fetch(CONFIG.GOOGLE_SCRIPT_URL + '?' + params.toString(), { mode: 'no-cors' })
    .then(() => {
      actualizarEstadoEnvio('enviado', '✅ Resultado enviado a la planilla de la profe.');
    })
    .catch(() => {
      actualizarEstadoEnvio('error', '⚠️ No se pudo enviar. Guardá una captura de pantalla.');
    });
}

function actualizarEstadoEnvio(estado, texto) {
  const div = document.getElementById('estado-envio');
  if (!div) return;
  div.className = 'estado-envio estado-' + estado;
  div.textContent = texto;
}

// ——— ESTRELLAS ———
function getEstrellas(puntaje) {
  const llenas = Math.round((puntaje / 100) * 5);
  let html = '';
  for (let i = 0; i < 5; i++) {
    html += `<span class="estrella ${i < llenas ? 'llena' : 'vacia'}">${i < llenas ? '⭐' : '☆'}</span>`;
  }
  return html;
}

// ——— IMPRIMIR ———
function imprimirResultado() {
  window.print();
}

// ——— UTILIDAD: Sanitizar nombre para ID ———
function sanitize(str) {
  return str.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '_');
}

// ——— INICIALIZACIÓN ———
document.addEventListener('DOMContentLoaded', () => {
  mostrarPantallaInicio();
});
