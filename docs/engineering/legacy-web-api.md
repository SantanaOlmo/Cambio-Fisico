> [!WARNING]
> ## API del sistema heredado — no contrato futuro del producto
>
> Este documento describe los endpoints HTTP expuestos actualmente por el backend Express de la aplicación web heredada de CambioFísico.
>
> Es útil para mantener, depurar o migrar el sistema actual.
>
> No define cómo accederán a datos la aplicación móvil futura ni otros clientes futuros.
>
> La aplicación móvil prevista opera localmente sobre SQLite y no debe asumir la existencia de esta API HTTP.
>
> Para la dirección técnica vigente, consultar:
>
> - `docs/engineering/technology-direction.md`
> - `ai_context.md`
> - ADRs vigentes en `docs/adr/`

# Referencia API de la aplicación web heredada

Este documento recoge los endpoints HTTP expuestos actualmente por el backend Express de la aplicación web heredada de CambioFísico.

La API corre localmente durante el desarrollo y permite al frontend web consultar, crear, editar y eliminar datos del esquema heredado, incluyendo entradas diarias, recetas, fotos y exportaciones.

Los endpoints documentados aquí reflejan el sistema existente. No deben usarse para diseñar nuevos contratos de dominio ni para condicionar la arquitectura de la aplicación móvil.

**Base URL:** `http://localhost:3001`

El backend también expone `GET /api/health`, que responde `200 OK` con `{ "status": "ok", "timestamp": "<ISO-8601>" }` para comprobaciones de disponibilidad.

---

## `/api/entries`

### GET `/api/entries`

- **Propósito:** listar todas las entradas diarias, ordenadas por fecha descendente.
- **Parámetros:** ninguno.
- **Respuesta:** `200 OK` — array JSON de objetos `Entry` (ver esquema en `docs/engineering/legacy-web-schema.md`).

### GET `/api/entries/:id`

- **Propósito:** obtener una entrada por su ID numérico.
- **Parámetros de ruta:** `id` (entero).
- **Respuesta:** `200 OK` — objeto `Entry`.
- **Errores:** `404 Not Found` — `{ "error": "Entrada no encontrada" }`.

### POST `/api/entries`

- **Propósito:** crear una entrada diaria.
- **Content-Type:** `multipart/form-data`.
- **Campos de formulario aceptados** (todos opcionales salvo `date`):
  - `date` — `YYYY-MM-DD` (obligatorio, único por día)
  - `weight` — número (20–350 kg)
  - `sleep_hours` — número (0–24)
  - `sleep_quality` — entero (1–5)
  - `steps` — entero (≥ 0)
  - `workout_type` — texto
  - `workout_duration` — entero
  - `cardio_done` — `0`/`1`, `true`/`false` o equivalente
  - `food_description` — texto (campo heredado)
  - `carbs_amount` — número
  - `water_liters` — número (≥ 0)
  - `meal_breakfast`, `meal_lunch`, `meal_dinner`, `meal_other` — texto
  - `bloating`, `energy`, `hunger`, `mood` — enteros (1–5)
  - `notes` — texto
  - `photo_path` — nombre de archivo ya subido (alternativa a subir foto en la misma petición)
  - `photo` — archivo de imagen (JPEG, PNG o WebP; máx. 10 MB)
- **Respuesta:** `201 Created` — objeto `Entry` creado.
- **Errores:**
  - `400 Bad Request` — `{ "error": "Datos de entrada inválidos", "errors": [{ "field", "message" }] }`
  - `409 Conflict` — `{ "error": "Ya existe una entrada para la fecha YYYY-MM-DD" }`
- **Efectos secundarios:** si se envía `photo`, el archivo se guarda en `data/photos/` y se persiste `photo_path` en SQLite.

### PUT `/api/entries/:id`

- **Propósito:** actualizar una entrada existente.
- **Content-Type:** `multipart/form-data`.
- **Parámetros de ruta:** `id` (entero).
- **Campos:** mismos que en POST (se fusionan con la entrada existente).
- **Respuesta:** `200 OK` — objeto `Entry` actualizado.
- **Errores:** `404 Not Found`, `400 Bad Request` (validación).
- **Efectos secundarios:** si se envía una nueva `photo`, se guarda el nuevo archivo y se elimina del disco la foto anterior asociada a la entrada, si existía.

### DELETE `/api/entries/:id`

- **Propósito:** eliminar una entrada.
- **Parámetros de ruta:** `id` (entero).
- **Respuesta:** `204 No Content`.
- **Errores:** `404 Not Found`.
- **Efectos secundarios:** si la entrada tenía `photo_path`, el archivo se elimina de `data/photos/`.

---

## `/api/recipes`

### GET `/api/recipes`

- **Propósito:** listar recetas o buscar por texto.
- **Query params:** `q` (opcional) — filtra por coincidencia parcial en `name`, `slug` o `tags`.
- **Respuesta:** `200 OK` — array JSON de objetos `Recipe`.

### GET `/api/recipes/:id`

- **Propósito:** obtener una receta por ID numérico.
- **Parámetros de ruta:** `id` (entero).
- **Respuesta:** `200 OK` — objeto `Recipe`.
- **Errores:** `404 Not Found` — `{ "error": "Receta no encontrada" }`.

### POST `/api/recipes`

- **Propósito:** crear una receta.
- **Content-Type:** `application/json`.
- **Body:**
  ```json
  {
    "name": "Arroz con curry",
    "slug": "arroz-con-curry",
    "content": "# Arroz con curry...",
    "tags": "almuerzo, arroz, pollo"
  }
  ```
  - `name` — obligatorio
  - `slug` — opcional; si falta, se genera a partir de `name`
  - `content` — Markdown (por defecto `""`)
  - `tags` — texto separado por comas (por defecto `""`)
- **Respuesta:** `201 Created` — objeto `Recipe`.
- **Errores:** `400 Bad Request` — `{ "error": "El nombre de la receta es obligatorio" }`.
- **Efectos secundarios:** si el `slug` ya existe, el backend le añade un sufijo con timestamp para evitar colisión.

### PUT `/api/recipes/:id`

- **Propósito:** actualizar una receta existente.
- **Content-Type:** `application/json`.
- **Parámetros de ruta:** `id` (entero).
- **Body:** campos parciales de `name`, `slug`, `content`, `tags`.
- **Respuesta:** `200 OK` — objeto `Recipe` actualizado.
- **Errores:** `404 Not Found`.
- **Efectos secundarios:** si el nuevo `slug` colisiona con otra receta, se añade sufijo con timestamp.

### DELETE `/api/recipes/:id`

- **Propósito:** eliminar una receta.
- **Parámetros de ruta:** `id` (entero).
- **Respuesta:** `204 No Content`.
- **Errores:** `404 Not Found`.

---

## `/api/photos`

### GET `/api/photos/:filename`

- **Propósito:** servir una foto almacenada en `data/photos/`.
- **Parámetros de ruta:** `filename` — nombre de archivo (se sanitiza con `path.basename` para evitar path traversal).
- **Respuesta:** `200 OK` — contenido binario de la imagen.
- **Errores:** `404 Not Found` — `{ "error": "Foto no encontrada" }`.

---

## `/api/uploads/photo`

### POST `/api/uploads/photo`

- **Propósito:** subir una foto de forma independiente, sin asociarla aún a una entrada.
- **Content-Type:** `multipart/form-data`.
- **Campo:** `photo` — archivo de imagen (JPEG, PNG o WebP; máx. 10 MB).
- **Respuesta:** `201 Created` — `{ "filename": "<nombre-generado>" }`.
- **Errores:** `400 Bad Request` — `{ "error": "No se recibió ninguna foto" }`.
- **Efectos secundarios:** el archivo se guarda en `data/photos/` con nombre `{fecha}-progreso-{id}.{ext}`.

---

## `/api/export/csv`

### GET `/api/export/csv`

- **Propósito:** descargar un CSV con todas las entradas diarias.
- **Respuesta:** `200 OK` — `text/csv; charset=utf-8` con cabecera `Content-Disposition: attachment; filename="cambiofisico-export.csv"`.
- **Contenido:** filas tabulares con columnas `id`, `date`, `weight`, `sleep_hours`, `sleep_quality`, `steps`, `workout_type`, `workout_duration`, `cardio_done`, `food_description`, `carbs_amount`, `water_liters`, `bloating`, `energy`, `hunger`, `mood`, `notes`, `photo_path`, `created_at`, `updated_at`. Prefijo BOM UTF-8 para compatibilidad con Excel.
- **Nota:** las columnas `meal_*` existen en SQLite pero **no** se incluyen actualmente en la exportación CSV.

---

## `/api/export/json`

### GET `/api/export/json`

- **Propósito:** descargar un volcado JSON de las entradas diarias.
- **Respuesta:** `200 OK` — JSON con cabecera `Content-Disposition: attachment; filename="cambiofisico-export.json"`.
- **Estructura:**
  ```json
  {
    "exportedAt": "<ISO-8601>",
    "totalEntries": 42,
    "entries": [ /* objetos Entry */ ]
  }
  ```
- **Nota:** la exportación JSON incluye únicamente la tabla `entries`, no recetas ni otras tablas.

---

## Límites de esta API

Esta API puede utilizarse para:

- mantener el frontend web heredado;
- depurar comunicación entre Vite y Express;
- revisar exportaciones actuales;
- conservar compatibilidad durante una futura migración;
- identificar datos y operaciones del sistema existente.

Esta API no debe utilizarse para:

- definir contratos futuros de dominio;
- diseñar la aplicación móvil;
- asumir que la app móvil requiere backend Express;
- añadir endpoints nuevos para funcionalidades futuras sin una necesidad de mantenimiento concreta;
- decidir el modelo futuro de datos.
