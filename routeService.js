// ============================================================
// SERVICIO DE RUTAS - Capa Lógica (Domain Layer)
// Maneja la lógica de negocio: calcular ruta, tiempo y costo
// ============================================================

const { dijkstra } = require('./dijkstra');

// Grafo vial de Chiclayo hacia la USS (nodos = intersecciones)
// Los pesos representan tiempo en minutos caminando
const grafoVial = new Map([
  ['Plaza_Mayor',     [{ nodo: 'Av_Balta', peso: 5 }, { nodo: 'Av_Grau', peso: 7 }]],
  ['Av_Balta',        [{ nodo: 'Plaza_Mayor', peso: 5 }, { nodo: 'Ovalo_Real', peso: 8 }]],
  ['Av_Grau',         [{ nodo: 'Plaza_Mayor', peso: 7 }, { nodo: 'Ovalo_Real', peso: 6 }, { nodo: 'Av_Chiclayo', peso: 4 }]],
  ['Ovalo_Real',      [{ nodo: 'Av_Balta', peso: 8 }, { nodo: 'Av_Grau', peso: 6 }, { nodo: 'USS', peso: 10 }]],
  ['Av_Chiclayo',     [{ nodo: 'Av_Grau', peso: 4 }, { nodo: 'USS', peso: 12 }]],
  ['USS',             [{ nodo: 'Ovalo_Real', peso: 10 }, { nodo: 'Av_Chiclayo', peso: 12 }]],
]);

// Velocidades promedio por transporte (km/h)
const velocidades = {
  caminando: 5,
  mototaxi:  25,
  bus:       20,
  auto:      40,
};

// Costos aproximados en soles
const costos = {
  caminando: 0,
  mototaxi:  3,
  bus:       1,
  auto:      5,
};

/**
 * Calcula la ruta óptima y estima tiempo y costo.
 * @param {string} origen - Nodo de origen del usuario
 * @param {string} transporte - Modo de transporte elegido
 * @returns {object} - Resultado con ruta, tiempo y costo
 */
function calcularRutaOptima(origen, transporte = 'caminando') {
  const destino = 'USS';

  // Validar que el origen exista en el grafo
  if (!grafoVial.has(origen)) {
    return { error: 'Ubicación de origen no reconocida. Ingrese manualmente.' };
  }

  const { distancia, camino } = dijkstra(grafoVial, origen, destino);

  if (camino.length === 0) {
    return { error: 'No se encontró ruta válida hacia la USS.' };
  }

  // Calcular tiempo según transporte (distancia en minutos a pie → convertir)
  const factorVelocidad = velocidades[transporte] / velocidades['caminando'];
  const tiempoEstimado = Math.ceil(distancia / factorVelocidad);
  const costoEstimado  = costos[transporte];

  return {
    origen,
    destino,
    transporte,
    ruta: camino,
    pasos: camino.length - 1,
    tiempoEstimado: `${tiempoEstimado} minutos`,
    costoEstimado:  `S/ ${costoEstimado}.00`,
    distanciaBase:  `${distancia} unidades`
  };
}

module.exports = { calcularRutaOptima, grafoVial };
