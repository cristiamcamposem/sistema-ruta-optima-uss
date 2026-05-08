# 🗺️ Sistema de Ruta Óptima hacia la USS

**Universidad Señor de Sipán — Chiclayo, Perú**  
Curso: Taller de Programación de Aplicaciones | Ciclo IV | 2026-I

---

## 📋 Descripción

Aplicación multiplataforma (web y móvil) que calcula la ruta más corta y eficiente desde la ubicación del usuario hasta el campus de la USS, usando el **Algoritmo de Dijkstra** sobre un grafo vial.

---

## 📁 Estructura del Proyecto

```
sistema-ruta-optima-uss/
├── README.md
├── docs/
│   ├── RA1_Informe_Tecnico.docx      ← Informe completo del proyecto
│   └── diagramas/                    ← Diagramas de flujo y UML
├── src/
│   ├── presentation/
│   │   └── app.js                    ← Simulación de la interfaz / pantallas
│   ├── domain/
│   │   ├── dijkstra.js               ← Algoritmo de Dijkstra
│   │   └── routeService.js           ← Lógica de negocio (calcular ruta, tiempo, costo)
│   └── data/
│       └── routeRepository.js        ← Pila (historial), Cola (solicitudes), Favoritos
└── tests/
    └── dijkstra.test.js              ← Pruebas del algoritmo
```

---

## 🚀 Cómo ejecutar

### Requisitos
- Node.js instalado ([descargar aquí](https://nodejs.org))

### Ejecutar la app
```bash
node src/presentation/app.js
```

### Ejecutar las pruebas
```bash
node tests/dijkstra.test.js
```

---

## 🧠 Estructuras de datos usadas

| Estructura | Dónde se usa | Por qué |
|-----------|-------------|---------|
| **Grafo (Map)** | `dijkstra.js` | Representa la red vial de Chiclayo |
| **Pila (Stack)** | `routeRepository.js` | Historial de rutas (última usada = primera visible) |
| **Cola (Queue)** | `routeRepository.js` | Solicitudes de ruta (el primero en pedir = primero en ser atendido) |
| **Objeto (Object)** | `routeService.js` | Representa cada ruta con sus atributos |

---

## 👥 Integrantes

| Nombre | Rol |
|--------|-----|
| [Angel Jeampier Hoyos Toro|
|Daniel Heiner Delgado Guillermo|
|cristian benitez|
|Diego Giampiere Sánchez Chunga|

]

---

## 📚 Tecnologías

- **Lenguaje:** JavaScript (Node.js)
- **Frontend (app real):** React / Flutter
- **Control de versiones:** GitHub
- **Algoritmo principal:** Dijkstra
