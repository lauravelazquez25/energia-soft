// ============================================================
//  ENERGÍAQUIZ - Google Apps Script
//  Recibe los resultados del juego y los guarda en Google Sheets
//
//  INSTRUCCIONES DE INSTALACIÓN:
//  1. Abrí script.google.com con tu cuenta lauravelazquez@cet28-bariloche.edu.ar
//  2. Creá un nuevo proyecto → copiá y pegá este código
//  3. Menú: Implementar → Nueva implementación
//     - Tipo: Aplicación web
//     - Ejecutar como: Yo (lauravelazquez@...)
//     - Quién tiene acceso: Cualquier usuario
//  4. Copiá la URL que aparece y pegala en js/config.js
// ============================================================

// Nombre de la hoja donde se guardan los datos
var NOMBRE_HOJA = "Resultados EnergíaQuiz";

// ——— Recibe los datos del juego (POST) ———
function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents);
    guardarResultado(datos);
    return respuestaOK();
  } catch (err) {
    return respuestaError(err.message);
  }
}

// ——— También acepta GET (por compatibilidad con algunos navegadores) ———
function doGet(e) {
  try {
    var datos = {
      nombre:    e.parameter.nombre    || "Sin nombre",
      fecha:     e.parameter.fecha     || "",
      hora:      e.parameter.hora      || "",
      puntaje:   parseFloat(e.parameter.puntaje)  || 0,
      nota:      parseFloat(e.parameter.nota)      || 0,
      correctas: parseInt(e.parameter.correctas)   || 0,
      detalle:   e.parameter.detalle   || ""
    };
    guardarResultado(datos);
    return respuestaOK();
  } catch (err) {
    return respuestaError(err.message);
  }
}

// ——— Obtener o crear la planilla ———
function obtenerPlanilla() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SPREADSHEET_ID');

  if (id) {
    try {
      return SpreadsheetApp.openById(id);
    } catch(e) {
      // Si no se puede abrir, crear una nueva
    }
  }

  // Crear planilla nueva
  var nueva = SpreadsheetApp.create(NOMBRE_HOJA);
  props.setProperty('SPREADSHEET_ID', nueva.getId());
  return nueva;
}

// ——— Guarda una fila en la planilla ———
function guardarResultado(datos) {
  var spreadsheet = obtenerPlanilla();
  var hoja = spreadsheet.getSheetByName(NOMBRE_HOJA);

  // Crear la hoja si no existe
  if (!hoja) {
    hoja = spreadsheet.insertSheet(NOMBRE_HOJA);
    crearEncabezados(hoja);
  }

  // Si la hoja está vacía, crear encabezados
  if (hoja.getLastRow() === 0) {
    crearEncabezados(hoja);
  }

  // Armar la fila de datos
  var fila = [
    datos.fecha     || obtenerFechaHoy(),
    datos.hora      || "",
    datos.nombre    || "Sin nombre",
    datos.puntaje   || 0,
    datos.nota      || 0,
    datos.correctas || 0,
    datos.detalle   || ""
  ];

  // Si vienen puntajes por actividad, agregarlos
  if (datos.actividades && Array.isArray(datos.actividades)) {
    datos.actividades.forEach(function(act) {
      fila.push(act.puntaje || 0);
    });
  }

  hoja.appendRow(fila);

  // Formato: colorear según nota
  var ultimaFila = hoja.getLastRow();
  var celdaNota = hoja.getRange(ultimaFila, 5); // columna E = Nota
  var nota = datos.nota || 0;
  if (nota >= 8) {
    celdaNota.setBackground("#C8E6C9"); // verde claro
  } else if (nota >= 6) {
    celdaNota.setBackground("#FFF9C4"); // amarillo claro
  } else {
    celdaNota.setBackground("#FFCDD2"); // rojo claro
  }
}

// ——— Crea los encabezados de la tabla ———
function crearEncabezados(hoja) {
  var encabezados = [
    "Fecha", "Hora", "Nombre del alumno",
    "Puntaje (/100)", "Nota (/10)", "Respuestas correctas (/40)",
    "Detalle actividades",
    "Act.1", "Act.2", "Act.3", "Act.4", "Act.5",
    "Act.6", "Act.7", "Act.8", "Act.9", "Act.10"
  ];

  hoja.appendRow(encabezados);

  // Estilo del encabezado
  var rango = hoja.getRange(1, 1, 1, encabezados.length);
  rango.setBackground("#1565C0");
  rango.setFontColor("#FFFFFF");
  rango.setFontWeight("bold");
  rango.setFontSize(11);

  // Congelar primera fila
  hoja.setFrozenRows(1);

  // Ancho de columnas
  hoja.setColumnWidth(3, 200); // Nombre
  hoja.setColumnWidth(7, 300); // Detalle
}

// ——— Fecha de hoy formateada ———
function obtenerFechaHoy() {
  var hoy = new Date();
  return Utilities.formatDate(hoy, Session.getScriptTimeZone(), "dd/MM/yyyy");
}

// ——— Respuestas HTTP ———
function respuestaOK() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function respuestaError(mensaje) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "error", mensaje: mensaje }))
    .setMimeType(ContentService.MimeType.JSON);
}
