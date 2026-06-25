# CambioFísico — Plataforma Modular Personal

Plataforma modular personal-first para registrar, analizar y optimizar el bienestar.
Todos los datos se almacenan **únicamente en tu ordenador** de forma local. Sin nube, sin anuncios.

---

## Requisitos previos

- **Node.js** v18 o superior → https://nodejs.org
- **pnpm** (gestor de paquetes para monorrepositorios)

Instala pnpm si no lo tienes:
```bash
npm install -g pnpm
```

---

## Instalación

En la raíz del proyecto `CambioFisico/` ejecuta:

```bash
pnpm install
```

---

## Ejecutar en desarrollo

Levanta el frontend y el backend concurrentemente desde la raíz del monorrepo:

```bash
pnpm dev
```

- **Frontend:** Servido en **http://localhost:5173** (Mapeado en `apps/web/`)
- **Backend (API Legacy):** Servido en **http://localhost:3001** (Mapeado en `apps/api-legacy/`)
- **Base de datos:** Generada automáticamente en `/data/fitness.sqlite` en la raíz.
- **Fotos de progreso:** Almacenadas en `/data/photos/` en la raíz.

---

## Estructura del proyecto (Monorrepo)

```
CambioFisico/
├── apps/               # Aplicaciones del producto
│   ├── web/            # Frontend (React + Vite + TypeScript)
│   └── api-legacy/     # Backend legacy (Node + Express + sql.js)
│
├── packages/           # Paquetes compartidos y configuraciones comunes (futuro shared)
│
├── docs/               # Documentación completa y ADRs de arquitectura
│
├── data/               # Generado automáticamente (Persistencia, ignorado por Git)
│   ├── fitness.sqlite  # Base de datos SQLite
│   └── photos/         # Fotos corporales de progreso
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
