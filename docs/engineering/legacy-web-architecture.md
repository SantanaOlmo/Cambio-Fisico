> [!WARNING]
> ## Arquitectura heredada — no representa la arquitectura objetivo
>
> Este documento describe la estructura técnica actual o histórica de la aplicación web heredada de CambioFísico.
>
> Es útil para mantener, depurar o migrar ese sistema.
>
> No define la arquitectura de la aplicación móvil futura ni debe utilizarse como base para nuevas decisiones técnicas.
>
> Para la dirección técnica vigente, consultar:
>
> - `docs/engineering/technology-direction.md`
> - `ai_context.md`
> - ADRs vigentes en `docs/adr/`

# Arquitectura de la aplicación web heredada

Este documento describe la arquitectura técnica de la aplicación web heredada de CambioFísico: un cliente React servido por Vite y un backend Express local con persistencia SQLite mediante `sql.js`.

Refleja el estado actual del código en `apps/web` y `apps/api-legacy`. No describe la arquitectura objetivo de la aplicación móvil ni debe utilizarse para decidir infraestructura nueva del producto.

---

## Arquitectura general

La app sigue una arquitectura **cliente-servidor local** de dos procesos:

- **Frontend:** React SPA servida por Vite en `localhost:5173`. En desarrollo, el proxy de Vite redirige las peticiones `/api` al backend.
- **Backend:** API REST en Node.js + Express en `localhost:3001`. Gestiona la base de datos y las fotos.

### Comunicación

El frontend envía `multipart/form-data` para operaciones con datos (incluye o no foto). El backend responde JSON. En operaciones de sólo lectura se usa GET normal.

---

## Estructura de carpetas

```
CambioFisico/
│
├── apps/
│   ├── web/                       ← Frontend React + Vite
│   │   ├── index.html
│   │   ├── vite.config.ts         ← Proxy /api → localhost:3001
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── index.css
│   │       ├── types/
│   │       ├── api/client.ts
│   │       ├── utils/
│   │       ├── hooks/
│   │       ├── contexts/
│   │       ├── components/
│   │       └── pages/
│   │
│   └── api-legacy/                ← Backend Express + sql.js
│       ├── server.ts              ← Punto de entrada: arranca Express, init DB
│       ├── tsconfig.json
│       ├── package.json
│       └── src/
│           ├── app.ts
│           ├── config.ts
│           ├── multerConfig.ts
│           ├── types/
│           ├── db/
│           ├── repositories/
│           ├── services/
│           ├── controllers/
│           ├── routes/
│           ├── validators/
│           └── middleware/
│
├── docs/
│   └── engineering/               ← Documentación técnica heredada y dirección vigente
│
└── data/                          ← Generado automáticamente al iniciar el backend
    ├── fitness.sqlite
    └── photos/
```

---

## Patrones de diseño utilizados

### Backend: Arquitectura en capas

```
HTTP Request
    ↓
Router (routes/)          — Define el endpoint y aplica middleware (multer)
    ↓
Controller (controllers/) — Adapta Request/Response a llamadas de servicio
    ↓
Service (services/)       — Lógica de negocio: parseEntryFields, validación, orquestación
    ↓
Repository (repositories/)— Operaciones de base de datos (CRUD puro)
    ↓
DB Helpers (db/helpers)   — Abstracciones sql.js: queryAll, queryOne, execute
    ↓
sql.js Database           — SQLite en memoria + persist() a disco
```

**Regla de separación:** los repositorios no conocen Express; los servicios no conocen SQL; los controladores no contienen lógica de negocio.

### Frontend: Componentes funcionales + hooks

- **Hooks de datos:** `useEntries`, `useEntryForm` — separan el estado de la UI.
- **Context:** `ToastContext` — estado global de notificaciones sin prop drilling.
- **Componentes atómicos:** `FormField`, `RatingInput`, `ComboboxInput` — reutilizables, sin lógica de negocio.
- **Secciones del formulario:** cada `*Section.tsx` es responsable de un dominio (sueño, actividad…).
- **Formatters:** funciones puras en `utils/formatters.ts` — sin efectos secundarios.

### Persistencia de opciones custom (localStorage)

El hook `useCustomOptions` guarda en `localStorage` los valores personalizados que el usuario escribe en los `ComboboxInput` (p. ej. "Padel"). En el próximo uso, estos valores aparecen como sugerencias junto a las opciones predefinidas.

Clave de almacenamiento: `cambiofisico_options_<storageKey>`

---

## Flujo de datos: crear una entrada con foto

```
1. Usuario rellena el formulario (EntryForm)
2. useEntryForm.buildFormData() → FormData (multipart)
3. api.postFormData('/entries', formData) → fetch POST
4. Vite proxy → http://localhost:3001/api/entries
5. entriesRoutes: photoUpload.single('photo') → multer guarda en data/photos/
6. entriesController.create() → entryService.createEntry(req.body)
7. entryService: parseEntryFields() → coerción de tipos
8. entryService: validateEntry() → validación de negocio
9. entryService: entryRepository.create(data) → INSERT SQLite
10. db/helpers.execute() → db.run(SQL) → persist() → escribe fitness.sqlite
11. Respuesta 201 JSON → React muestra toast "Entrada creada"
```

---

## Sistema de Visualización de Hashtags y Nutrición

### 1. Highlight de Hashtags en Edición (`MealHashtagInput.tsx`)
Para ofrecer una experiencia de usuario premium, el input de comidas se divide en dos capas superpuestas:
*   **Capa superior (Textarea interactivo):** Totalmente transparente en cuanto a texto (`text-transparent bg-transparent`), pero con un cursor visible (`caret-emerald-400`). El usuario escribe, hace scroll y selecciona de manera completamente nativa.
*   **Capa inferior (Highlight Overlay):** Un `div` con la misma tipografía, paddings y espaciado que el textarea. Procesa el texto y colorea los hashtags usando expresiones regulares:
    *   **Recetas:** Si coincide con una receta de la base de datos (ej. `#risotto-de-setas`), se renderiza como un badge verde esmeralda.
    *   **Historial:** Si no coincide con ninguna receta (ej. `#pan`), se renderiza como un badge gris.
*   **Gestión de márgenes y espaciado:** Se aplican márgenes negativos asimétricos (`ml-[-5px] mr-[-2px]`) en el overlay de los badges para tapar el `#` transparente sin deformar la separación con la siguiente palabra.
*   **Reemplazo de guiones por espacios:** Para hacer el texto más legible y limpio, el overlay oculta los guiones (`-`) del slug renderizándolos como caracteres transparentes en la capa inferior, manteniendo su ancho intacto para evitar desfases del cursor.
*   **Evitar solapamientos en contenedores colapsables:** En `NutritionSection.tsx`, se removió la propiedad `overflow-hidden` de las tarjetas colapsables del acordeón y se asignaron bordes redondeados dinámicos (`rounded-t-xl`, `rounded-b-xl`) a las secciones. Esto garantiza que la lista flotante absoluta de sugerencias de hashtags se muestre por encima de los límites de cada acordeón sin recortarse.

### 2. Autocompletado Inteligente en Edición
Cuando el usuario escribe `#` en cualquiera de las comidas, el buscador de autocompletado ofrece sugerencias unificadas de:
1.  **Recetas (Base de Datos):** Marcadas con la etiqueta `RECETA` y texto verde.
2.  **Historial de Comidas (Entradas diarias):** Se utiliza el hook `useEntries` para obtener los hashtags libres que el usuario ha guardado anteriormente en otros días, facilitando su reutilización (etiquetados como `HISTORIAL`).

### 3. Visualización Uniforme de Lectura (`MealText` en `MarkdownRenderer.tsx`)
En la vista del historial y tarjetas de entradas:
*   Todos los hashtags se visualizan de manera uniforme en badges de fondo grisáceo (`bg-slate-800/80 border border-slate-700/60 rounded px-1.5 py-0.5 text-xs font-medium mx-0.5`).
*   Los guiones se reemplazan por espacios reales (`slug.replace(/-/g, ' ')`) para una legibilidad natural y soporte de saltos de línea del navegador.
*   El símbolo `#` se oculta para alinearse con el diseño limpio del editor.
*   La única diferencia es la interactividad y color: los asociados a recetas usan color verde esmeralda y son enlaces cliqueables a su receta, mientras que los libres usan color gris claro.

### 4. Ranking de Nutrición en el Dashboard
El panel de control (`DashboardPage.tsx`) agrega una sección de **Frecuencia de Comidas** que:
*   Extrae todos los hashtags del historial completo del usuario.
*   Muestra un ranking **Top 5** con los platos más comidos.
*   Cada elemento tiene una **barra de progreso visual de fondo** que representa su porcentaje de consumo relativo al elemento número uno.
*   Permite hacer clic directo en las recetas vinculadas para ver sus detalles.

---

## Límites de este documento

Este documento puede consultarse para mantener, depurar o migrar la aplicación web heredada.

No debe utilizarse para diseñar la aplicación móvil, decidir el modelo de dominio futuro, introducir infraestructura nueva ni asumir que Express, `sql.js` o la API HTTP forman parte de la arquitectura objetivo.
