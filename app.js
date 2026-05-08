// ============================================================
// CAPA DE PRESENTACIÓN - Simulación de la App
// Representa cómo interactúa el usuario con el sistema
// (En React/Flutter esto serían pantallas y formularios)
// ============================================================

const { calcularRutaOptima }                          = require('../domain/routeService');
const { PilaHistorial, ColaSolicitudes, RepositorioFavoritos } = require('../data/routeRepository');

// Instanciar estructuras de datos
const historial   = new PilaHistorial();
const cola        = new ColaSolicitudes();
const favoritos   = new RepositorioFavoritos();

// -------------------------------------------------------
// FUNCIÓN PRINCIPAL: Simula el flujo completo de la app
// -------------------------------------------------------
function ejecutarApp() {
  console.log('==============================================');
  console.log('  SISTEMA DE RUTA ÓPTIMA HACIA LA USS');
  console.log('  Universidad Señor de Sipán — Chiclayo');
  console.log('==============================================\n');

  // --- PASO 1: Usuario solicita rutas (se agregan a la COLA) ---
  console.log('>> Nuevas solicitudes de ruta recibidas:\n');

  cola.encolar({ usuario: 'Estudiante_01', origen: 'Plaza_Mayor', transporte: 'mototaxi' });
  cola.encolar({ usuario: 'Estudiante_02', origen: 'Av_Grau',     transporte: 'bus' });
  cola.encolar({ usuario: 'Docente_01',    origen: 'Av_Balta',    transporte: 'auto' });

  console.log(`\nSolicitudes en cola: ${cola.tamaño()}\n`);
  console.log('----------------------------------------------');

  // --- PASO 2: Procesar cada solicitud de la COLA ---
  console.log('\n>> Procesando solicitudes:\n');

  while (!cola.estaVacia()) {
    const solicitud = cola.desencolar();

    console.log(`\n[Usuario: ${solicitud.usuario}]`);
    console.log(`  Origen: ${solicitud.origen} | Transporte: ${solicitud.transporte}`);

    const resultado = calcularRutaOptima(solicitud.origen, solicitud.transporte);

    if (resultado.error) {
      console.log(`  ERROR: ${resultado.error}`);
    } else {
      console.log(`  Ruta: ${resultado.ruta.join(' → ')}`);
      console.log(`  Tiempo estimado: ${resultado.tiempoEstimado}`);
      console.log(`  Costo estimado:  ${resultado.costoEstimado}`);

      // Guardar en historial (PILA)
      historial.push(resultado);
    }
  }

  console.log('\n----------------------------------------------');

  // --- PASO 3: Mostrar historial (PILA - más reciente primero) ---
  console.log('\n>> Historial de rutas calculadas:\n');

  const todasLasRutas = historial.verTodo();
  todasLasRutas.forEach((r, i) => {
    console.log(`  ${i + 1}. [${r.fecha} ${r.hora}] ${r.origen} → ${r.destino} (${r.transporte}) — ${r.tiempoEstimado}`);
  });

  console.log(`\nTotal rutas en historial: ${historial.tamaño()}`);
  console.log('\n----------------------------------------------');

  // --- PASO 4: Guardar ubicaciones favoritas ---
  console.log('\n>> Guardando ubicaciones favoritas:\n');

  favoritos.guardar('Mi Casa',    { lat: -6.7714, lng: -79.8409 });
  favoritos.guardar('Trabajo',    { lat: -6.7690, lng: -79.8350 });
  favoritos.guardar('Parada Bus', { lat: -6.7730, lng: -79.8420 });

  console.log('Favoritos guardados:');
  favoritos.listar().forEach(f => {
    console.log(`  - ${f.nombre} (lat: ${f.coordenadas.lat}, lng: ${f.coordenadas.lng})`);
  });

  console.log('\n==============================================');
  console.log('  App finalizada correctamente.');
  console.log('==============================================');
}

// Ejecutar la aplicación
ejecutarApp();
