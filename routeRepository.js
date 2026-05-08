// ============================================================
// REPOSITORIO DE RUTAS - Capa de Datos (Data Layer)
// Usa PILA para historial y COLA para solicitudes pendientes
// ============================================================

// -----------------------------
// PILA (Stack) — Historial de rutas
// La última ruta usada es la primera en verse (LIFO)
// Máximo 10 rutas guardadas
// -----------------------------
class PilaHistorial {
  constructor() {
    this.pila = [];
    this.MAX = 10;
  }

  // Agregar ruta al historial
  push(ruta) {
    if (this.pila.length >= this.MAX) {
      this.pila.shift(); // Eliminar la más antigua si ya hay 10
    }
    const entrada = {
      ...ruta,
      fecha: new Date().toLocaleDateString('es-PE'),
      hora:  new Date().toLocaleTimeString('es-PE'),
    };
    this.pila.push(entrada);
    console.log(`[Historial] Ruta guardada: ${ruta.origen} → ${ruta.destino}`);
  }

  // Ver la ruta más reciente (sin eliminar)
  peek() {
    if (this.estaVacia()) return null;
    return this.pila[this.pila.length - 1];
  }

  // Sacar la ruta más reciente
  pop() {
    return this.pila.pop() || null;
  }

  // Ver todo el historial (más reciente primero)
  verTodo() {
    return [...this.pila].reverse();
  }

  estaVacia() {
    return this.pila.length === 0;
  }

  tamaño() {
    return this.pila.length;
  }
}

// -----------------------------
// COLA (Queue) — Solicitudes de ruta pendientes
// El primero que solicita es el primero en ser procesado (FIFO)
// -----------------------------
class ColaSolicitudes {
  constructor() {
    this.cola = [];
  }

  // Agregar solicitud al final de la cola
  encolar(solicitud) {
    const entrada = {
      id: Date.now(),
      ...solicitud,
      timestamp: new Date().toISOString(),
    };
    this.cola.push(entrada);
    console.log(`[Cola] Solicitud agregada. Posición: ${this.cola.length}`);
    return entrada.id;
  }

  // Procesar y sacar la primera solicitud
  desencolar() {
    return this.cola.shift() || null;
  }

  // Ver la siguiente en la cola sin procesarla
  frente() {
    return this.cola[0] || null;
  }

  estaVacia() {
    return this.cola.length === 0;
  }

  tamaño() {
    return this.cola.length;
  }
}

// -----------------------------
// REPOSITORIO DE UBICACIONES FAVORITAS
// Máximo 5 ubicaciones guardadas
// -----------------------------
class RepositorioFavoritos {
  constructor() {
    this.favoritos = [];
    this.MAX = 5;
  }

  guardar(nombre, coordenadas) {
    if (this.favoritos.length >= this.MAX) {
      return { error: 'Límite de 5 favoritos alcanzado. Elimine uno para continuar.' };
    }
    const ubicacion = { id: Date.now(), nombre, coordenadas };
    this.favoritos.push(ubicacion);
    return { exito: true, ubicacion };
  }

  eliminar(id) {
    const index = this.favoritos.findIndex(f => f.id === id);
    if (index === -1) return { error: 'Favorito no encontrado.' };
    this.favoritos.splice(index, 1);
    return { exito: true };
  }

  listar() {
    return this.favoritos;
  }
}

module.exports = { PilaHistorial, ColaSolicitudes, RepositorioFavoritos };
