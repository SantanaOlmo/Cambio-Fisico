# API Reference

Documentación de los endpoints HTTP expuestos por el backend local en `http://localhost:3001`.

---

## 1. Entradas Diarias (`/api/entries`)

### GET `/api/entries`
Lista todas las entradas físicas en orden cronológico inverso.
- **Respuesta:** `200 OK`
  ```json
  [
    {
      "id": 1,
      "date": "2026-06-25",
      "weight": 76.2,
      "sleep_hours": 7.5,
      ...
    }
  ]
  ```

### GET `/api/entries/:id`
Detalle de una entrada específica por su ID.
- **Respuesta:** `200 OK` o `404 Not Found`

### POST `/api/entries`
Crea una nueva entrada diaria. Acepta cabeceras `multipart/form-data` para incluir foto de progreso.
- **Parámetros (Form Fields):**
  - `date`: `YYYY-MM-DD` (obligatorio, único)
  - `weight`: REAL
  - `sleep_hours`: REAL
  - `sleep_quality`: INTEGER (1-5)
  - `workout_type`: TEXT
  - `workout_duration`: INTEGER
  - `cardio_done`: INTEGER (0 o 1)
  - `meal_breakfast`: TEXT
  - `meal_lunch`: TEXT
  - `meal_dinner`: TEXT
  - `meal_other`: TEXT
  - `bloating`/`energy`/`hunger`/`mood`: INTEGER (1-5)
  - `notes`: TEXT
  - `photo`: File (opcional, archivo de imagen)
- **Respuesta:** `201 Created`

### PUT `/api/entries/:id`
Actualiza una entrada existente. Acepta cabeceras `multipart/form-data`.
- **Respuesta:** `200 OK`

### DELETE `/api/entries/:id`
Elimina una entrada de la base de datos. Si tiene foto asociada, también la borra del almacenamiento en disco `/data/photos/`.
- **Respuesta:** `204 No Content`

---

## 2. Recetas (`/api/recipes`)

### GET `/api/recipes`
Recupera la lista de todas las recetas guardadas.
- **Query Params:** `?q=buscar` (opcional, filtra por nombre, slug o tags)
- **Respuesta:** `200 OK`

### GET `/api/recipes/:id`
Recupera los detalles de una receta por su ID numérico.
- **Respuesta:** `200 OK`

### POST `/api/recipes`
Crea una receta nueva.
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "Arroz con curry",
    "slug": "arroz-con-curry",
    "content": "# Arroz con curry...",
    "tags": "almuerzo, arroz, pollo"
  }
  ```
- **Respuesta:** `201 Created`

### PUT `/api/recipes/:id`
Actualiza una receta existente por su ID.
- **Headers:** `Content-Type: application/json`
- **Respuesta:** `200 OK`

### DELETE `/api/recipes/:id`
Elimina la receta seleccionada por ID.
- **Respuesta:** `204 No Content`

---

## 3. Multimedia y Descargas (`/api/photos` & `/api/export`)

### GET `/api/photos/:filename`
Sirve de forma estática la foto guardada en `/data/photos/`.

### POST `/api/uploads/photo`
Sube una foto de manera independiente (sin estar atada a una entrada aún) y devuelve el nombre del archivo guardado.
- **Respuesta:** `200 OK` `{ "filename": "..." }`

### GET `/api/export/csv`
Genera y descarga un archivo CSV con todas las entradas persistidas en formato tabular. Incluye BOM UTF-8 para compatibilidad automática con Excel.

### GET `/api/export/json`
Descarga un archivo JSON estructurado con el volcado completo de las tablas para copia de seguridad.
