// ============================================================
// PRUEBAS - Algoritmo de Dijkstra
// Verifica que el algoritmo funcione correctamente
// ============================================================

const { dijkstra }          = require('../src/domain/dijkstra');
const { calcularRutaOptima } = require('../src/domain/routeService');

let pruebaspasadas = 0;
let pruebasfallidas = 0;

function assert(descripcion, condicion) {
  if (condicion) {
    console.log(`  ✅ PASÓ: ${descripcion}`);
    pruebaspasadas++;
  } else {
    console.log(`  ❌ FALLÓ: ${descripcion}`);
    pruebasfallidas++;
  }
}

// ---------------------------------------------------
// PRUEBA 1: Ruta simple entre dos nodos conectados
// ---------------------------------------------------
console.log('\n--- Prueba 1: Ruta directa Plaza_Mayor → USS ---');
const resultado1 = calcularRutaOptima('Plaza_Mayor', 'caminando');
assert('No hay error en el resultado',    !resultado1.error);
assert('La ruta termina en USS',          resultado1.ruta[resultado1.ruta.length - 1] === 'USS');
assert('La ruta empieza en Plaza_Mayor',  resultado1.ruta[0] === 'Plaza_Mayor');
assert('El tiempo estimado existe',       resultado1.tiempoEstimado !== undefined);

// ---------------------------------------------------
// PRUEBA 2: Ruta desde Av_Grau con bus
// ---------------------------------------------------
console.log('\n--- Prueba 2: Av_Grau → USS en bus ---');
const resultado2 = calcularRutaOptima('Av_Grau', 'bus');
assert('No hay error',        !resultado2.error);
assert('Llega a USS',         resultado2.ruta.includes('USS'));
assert('Transporte es bus',   resultado2.transporte === 'bus');

// ---------------------------------------------------
// PRUEBA 3: Origen inválido
// ---------------------------------------------------
console.log('\n--- Prueba 3: Origen inválido ---');
const resultado3 = calcularRutaOptima('LugarInventado', 'caminando');
assert('Retorna error por origen inválido', resultado3.error !== undefined);

// ---------------------------------------------------
// PRUEBA 4: El algoritmo Dijkstra en grafo simple
// ---------------------------------------------------
console.log('\n--- Prueba 4: Dijkstra en grafo de prueba ---');
const grafoTest = new Map([
  ['A', [{ nodo: 'B', peso: 1 }, { nodo: 'C', peso: 4 }]],
  ['B', [{ nodo: 'C', peso: 2 }, { nodo: 'D', peso: 5 }]],
  ['C', [{ nodo: 'D', peso: 1 }]],
  ['D', []],
]);
const { distancia, camino } = dijkstra(grafoTest, 'A', 'D');
assert('Distancia mínima A→D es 4',     distancia === 4);
assert('Camino correcto A→B→C→D',       camino.join('→') === 'A→B→C→D');

// ---------------------------------------------------
// RESUMEN
// ---------------------------------------------------
console.log('\n==============================================');
console.log(`  RESULTADO: ${pruebaspasadas} pasadas | ${pruebasfallidas} fallidas`);
console.log('==============================================\n');
