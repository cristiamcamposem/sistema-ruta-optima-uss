// ============================================================
// ALGORITMO DE DIJKSTRA - Capa Lógica (Domain Layer)
// Calcula la ruta más corta desde un origen hasta la USS
// ============================================================

/**
 * Ejecuta el algoritmo de Dijkstra sobre un grafo vial.
 * @param {Map} grafo - Mapa de nodos con vecinos y pesos
 * @param {string} origen - Nodo de partida del usuario
 * @param {string} destino - Nodo destino (USS)
 * @returns {object} - { distancia, camino }
 */
function dijkstra(grafo, origen, destino) {
  // Distancias iniciales en infinito
  const distancias = {};
  const previo = {};
  const visitados = new Set();

  // Inicializar todas las distancias en Infinito
  for (let nodo of grafo.keys()) {
    distancias[nodo] = Infinity;
    previo[nodo] = null;
  }
  distancias[origen] = 0;

  while (true) {
    // Buscar el nodo no visitado con menor distancia
    let nodoActual = null;
    for (let nodo of grafo.keys()) {
      if (!visitados.has(nodo)) {
        if (nodoActual === null || distancias[nodo] < distancias[nodoActual]) {
          nodoActual = nodo;
        }
      }
    }

    // Si no hay más nodos o llegamos al destino, terminamos
    if (nodoActual === null || distancias[nodoActual] === Infinity) break;
    if (nodoActual === destino) break;

    visitados.add(nodoActual);

    // Actualizar distancias de los vecinos
    const vecinos = grafo.get(nodoActual) || [];
    for (let { nodo: vecino, peso } of vecinos) {
      const nuevaDistancia = distancias[nodoActual] + peso;
      if (nuevaDistancia < distancias[vecino]) {
        distancias[vecino] = nuevaDistancia;
        previo[vecino] = nodoActual;
      }
    }
  }

  // Reconstruir el camino desde destino hasta origen
  const camino = [];
  let actual = destino;
  while (actual !== null) {
    camino.unshift(actual);
    actual = previo[actual];
  }

  // Si el camino no empieza en el origen, no hay ruta válida
  if (camino[0] !== origen) {
    return { distancia: Infinity, camino: [] };
  }

  return {
    distancia: distancias[destino],
    camino: camino
  };
}

module.exports = { dijkstra };
