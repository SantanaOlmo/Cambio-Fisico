# CambioFísico — Seguimiento 90 Días

App web local para registrar y analizar tu progreso físico durante 90 días.
Todos los datos se almacenan **únicamente en tu ordenador**. Sin nube, sin cuentas.

---

## Requisitos previos

- **Node.js** v18 o superior → https://nodejs.org
- **npm** (incluido con Node.js)

Verifica que tienes Node instalado:
```bash
node --version   # debe mostrar v18 o superior
npm --version
```

---

## Instalación

Abre una terminal en la carpeta del proyecto `CambioFisico/`.

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

---

## Ejecutar en desarrollo

Necesitas **dos terminales** abiertas simultáneamente.

### Terminal 1 — Backend (API)

```bash
cd backend
npm run dev
```

El servidor arranca en **http://localhost:3001**
La base de datos se crea automáticamente en `../data/fitness.sqlite`
Las fotos se guardan en `../data/photos/`

Verifica que funciona:
```
http://localhost:3001/api/health
```

### Terminal 2 — Frontend (Interfaz)

```bash
cd frontend
npm run dev
```

La app abre en **http://localhost:5173**

---

## Estructura del proyecto

```
CambioFisico/
├── docs/               # Documentación completa del proyecto
│   ├── README.md       # Índice de documentación
│   ├── ARQUITECTURA.md # Arquitectura del sistema y flujo de datos
│   └── TECNOLOGIAS.md  # Stack tecnológico y dependencias
│
├── backend/            # Node.js + Express + sql.js (SQLite WASM)
│   ├── src/
│   │   ├── db/         # Conexión, schema y helpers SQLite
│   │   ├── repositories/ # Capa de datos pura (SQL)
│   │   ├── services/   # Lógica de negocio (parseo, validación)
│   │   ├── controllers/# Controladores HTTP
│   │   ├── routes/     # Enrutadores Express
│   │   └── middleware/ # Manejador de errores
│   └── server.ts
│
├── frontend/           # React + TypeScript + Tailwind CSS
│   └── src/
│       ├── api/        # Cliente fetch tipado
│       ├── components/ # Componentes (layout, entries, dashboard, recetas)
│       ├── hooks/      # Hooks de React (useEntries, useRecipes, etc.)
│       ├── pages/      # Páginas principales (Dashboard, recetas, etc.)
│       ├── types/      # Definición de tipos
│       └── utils/      # Funciones auxiliares
│
└── data/               # Generado automáticamente (Persistencia)
    ├── fitness.sqlite  # Base de datos SQLite
    └── photos/         # Fotos de progreso
```

---

## API Endpoints

### Entradas Diarias (`/api/entries`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/entries` | Todas las entradas |
| GET | `/api/entries/:id` | Entrada por ID |
| POST | `/api/entries` | Crear entrada (multipart) |
| PUT | `/api/entries/:id` | Editar entrada (multipart) |
| DELETE | `/api/entries/:id` | Borrar entrada + foto |

### Recetas (`/api/recipes`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/recipes` | Todas las recetas (filtro opcional por `?q=`) |
| GET | `/api/recipes/:id` | Detalle de receta por ID |
| POST | `/api/recipes` | Crear receta (JSON) |
| PUT | `/api/recipes/:id` | Editar receta (JSON) |
| DELETE | `/api/recipes/:id` | Eliminar receta |

### Multimedia y Exportación (`/api/photos` y `/api/export`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/photos/:filename` | Servir foto de progreso |
| POST | `/api/uploads/photo` | Subir foto independiente |
| GET | `/api/export/json` | Exportar datos a JSON |
| GET | `/api/export/csv` | Exportar datos a CSV |

---

## Backup de datos

Toda la información está en la carpeta `data/`:

```
CambioFisico/
└── data/
    ├── fitness.sqlite   ← base de datos completa (entradas y recetas)
    └── photos/          ← todas las fotos de progreso
```

**Para hacer backup:** copia la carpeta `data/` completa a un lugar seguro (disco externo, otra carpeta, etc.).

**Para restaurar:** pega la carpeta `data/` en la raíz del proyecto y ejecuta el backend normalmente.

---

## Exportar datos

Desde la sección **Exportar** de la app puedes descargar:

- **CSV** — compatible con Excel / Google Sheets (incluye BOM UTF-8)
- **JSON** — formato estructurado con todos los campos

O directamente desde el navegador:
- http://localhost:3001/api/export/csv
- http://localhost:3001/api/export/json

---

## Datos de seguimiento registrados

Cada entrada diaria incluye:

- **Básicos:** Fecha, peso (kg)
- **Sueño:** Horas de sueño y calidad (escala 1–5)
- **Actividad:** Tipo de entrenamiento (con autocompletado inteligente y deportes personalizados), duración (minutos) y cardio realizado (Sí/No)
- **Nutrición:** Desplegable e inputs de comida independientes para **Desayuno**, **Almuerzo**, **Cena** y **Otro / Snacks** (con soporte de hashtags de recetas y autocompletado mediante `#`)
- **Bienestar subjetivo:** Hinchazón abdominal, energía, hambre, estado de ánimo (escala 1–5)
- **Notas y Multimedia:** Notas libres y foto de progreso (JPEG/PNG/WebP, máx. 10 MB)

---

## Sistema de Recetas y Hashtags

La app incluye un **recetario local** en el que puedes:
- Crear y subir tus recetas favoritas en formato **Markdown**.
- Importar directamente ficheros `.md` locales mediante el lector integrado.
- Asignarles etiquetas (tags) y slugs amigables para hashtags (ej. `#pollo-al-curry`).
- En las entradas de comidas, al escribir `#` se desplegará una lista de sugerencias de autocompletado para vincular recetas.
- En la visualización de tus días, los hashtags válidos se renderizan como enlaces directos a sus correspondientes recetas.

---

## Datos iniciales configurados

- Altura: 1,72 m
- Peso inicial: 76,5 kg  
- Objetivo: 90 días
- Meta: reducir grasa abdominal, volver al gimnasio, mejorar postura y rutina
