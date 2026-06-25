# Tecnologías y Dependencias

## Stack completo

| Capa | Tecnología | Versión | Motivo |
|---|---|---|---|
| Frontend framework | React | 18 | Ecosistema maduro, componentes reutilizables |
| Lenguaje | TypeScript | 5 | Tipado estático, refactorización segura |
| Estilos | Tailwind CSS | 3 | Utility-first, dark mode nativo |
| Build tool | Vite | 5 | HMR instantáneo, dev experience óptima |
| Gráficas | Recharts | 2 | Librería React-nativa, declarativa |
| Iconos | Lucide React | latest | Consistentes, tree-shakeable |
| Routing | React Router DOM | 6 | Estándar de facto en React |
| Backend framework | Express | 4 | Simple, maduro, ecosistema enorme |
| Lenguaje backend | TypeScript + tsx | 5 | Mismo lenguaje en ambas capas |
| Base de datos | sql.js (SQLite WASM) | 1.11 | Sin compilación nativa, portátil |
| Subida de ficheros | Multer | 1.4 LTS | Middleware multipart para Express |
| Dev runner | tsx | 4 | Ejecuta TypeScript directamente sin compilar |
| Identificadores únicos | uuid | 9 | Nombres únicos para fotos |

---

## ¿Por qué sql.js y no better-sqlite3?

`better-sqlite3` es la opción preferida por rendimiento, pero requiere **compilación de código nativo** (node-gyp + Visual Studio Build Tools en Windows). En esta máquina no hay Build Tools instalados.

`sql.js` es una compilación de SQLite a **WebAssembly**: funciona en cualquier plataforma sin instalación de compiladores. Para una app con ~90 entradas, la diferencia de rendimiento es imperceptible. El único coste añadido es que el fichero `.sqlite` se carga en memoria y se persiste a disco después de cada escritura.

---

## Dependencias del backend (`apps/api-legacy/package.json`)

### Producción
| Paquete | Uso |
|---|---|
| `express` | Servidor HTTP y routing |
| `cors` | Cabeceras CORS para la petición desde el frontend Vite |
| `sql.js` | SQLite en WebAssembly (sin compilación nativa) |
| `multer` | Parsing de formularios `multipart/form-data` con subida de ficheros |
| `uuid` | Generación de nombres únicos para las fotos (UUID v4) |

### Desarrollo
| Paquete | Uso |
|---|---|
| `tsx` | Ejecuta TypeScript directamente (watch mode en dev) |
| `typescript` | Compilador TS |
| `@types/*` | Tipos para Express, Multer, Node, uuid, cors |
| `@types/sql.js` | Tipos para la API de sql.js |

---

## Dependencias del frontend (`apps/web/package.json`)

### Producción
| Paquete | Uso |
|---|---|
| `react` + `react-dom` | UI library |
| `react-router-dom` | Navegación SPA (hash routing) |
| `recharts` | Gráficas: LineChart, AreaChart, BarChart |
| Iconos locales (SVG) | Servidos en local desde `src/assets/icons/` sin dependencias externas |
| `react-markdown` | Renderizador de Markdown |
| `remark-gfm` | Plugins de GitHub Flavored Markdown (tablas, tachado...) |

### Desarrollo
| Paquete | Uso |
|---|---|
| `vite` | Dev server + build tool |
| `@vitejs/plugin-react` | HMR y JSX transform para React |
| `tailwindcss` | Framework CSS |
| `postcss` + `autoprefixer` | Procesamiento CSS |
| `typescript` | Compilador |
| `@types/react*` | Tipos React |

---

## Versión de Node.js requerida

- **Mínimo:** Node.js v18 LTS
- **Probado con:** Node.js v22.16.0
- **npm:** incluido con Node

```bash
node --version   # >= v18.0.0
npm --version
```

---

## Sistema de Iconos Local

Los iconos de la aplicación son servidos de forma 100% local sin depender de CDNs ni de librerías externas de iconos en el bundle de producción final.

### Ubicación de los recursos
- Los archivos `.svg` individuales están almacenados en:  
  `apps/web/src/assets/icons/`
- El componente unificado de carga de iconos y tipado estático se encuentra en:  
  `apps/web/src/components/icons/Icon.tsx` (con su punto de entrada en `apps/web/src/components/icons/index.ts`).

### Características del componente `<Icon />`
- **Tipado estricto:** El componente tiene la prop `name` tipada estrictamente con una unión de los nombres de los iconos locales válidos (`IconName`).
- **Control de estilos:** Los SVGs usan el atributo `stroke="currentColor"` y heredan todos los atributos estándar del elemento `<svg>`. Esto permite cambiar el color de los iconos utilizando clases normales de Tailwind CSS (p. ej. `text-emerald-400`, `text-slate-500`, etc.) y configurar el grosor con la prop `strokeWidth`.

### Cómo añadir un nuevo icono
1. **Obtener el SVG:** Busca el icono deseado en la librería Lucide (o cualquier otro set de iconos SVG consistentes de 24x24 con viewBox `"0 0 24 24"`).
2. **Guardar el archivo:** Descárgalo y guárdalo como un archivo `.svg` individual en la carpeta `apps/web/src/assets/icons/` utilizando nomenclatura **kebab-case** (ej. `mi-nuevo-icono.svg`).
3. **Asegurar currentColor:** Edita el archivo SVG y asegúrate de que tiene los atributos necesarios para heredar estilos (ej. `stroke="currentColor"` y sin colores fijos de relleno/trazo en los paths que impidan el control por clases CSS).
4. **Registrar el icono en el componente:**  
   Edita `apps/web/src/components/icons/Icon.tsx`:
   - Añade el import estático con la query `?raw` en la parte superior:
     ```typescript
     import miNuevoIcono from '../../assets/icons/mi-nuevo-icono.svg?raw';
     ```
   - Añádelo al mapa `ICON_MAP`:
     ```typescript
     export const ICON_MAP = {
       ...
       'mi-nuevo-icono': miNuevoIcono,
     };
     ```
5. **Utilizar el icono en tu código:**  
   Usa el componente `<Icon />` pasando el nombre registrado en la prop `name`:
   ```tsx
   import { Icon } from '@/components/icons'; // o ruta relativa correspondiente
   
   <Icon name="mi-nuevo-icono" className="w-5 h-5 text-emerald-400" />
   ```

### Auditoría de Uso de Iconos en el Frontend

A continuación se detalla qué iconos se renderizan a través del nuevo componente local, en qué ficheros se llaman y con qué propósito:

| Fichero de Origen | Iconos Utilizados | Propósito / Uso en UI |
|---|---|---|
| `components/layout/Sidebar.tsx` | `layout-dashboard`, `list`, `image`, `download`, `dumbbell`, `flame`, `chef-hat` | Elementos del menú de navegación lateral. |
| `components/entries/BasicInfoSection.tsx` | `calendar` | Icono de campo para fecha del formulario de entrada. |
| `components/entries/ActivitySection.tsx` | `dumbbell` | Cabecera del formulario de entrenamiento. |
| `components/entries/SleepSection.tsx` | `moon` | Cabecera del formulario de descanso. |
| `components/entries/NutritionSection.tsx` | `salad`, `coffee`, `utensils`, `apple`, `chevron-down` | Categorías de comidas (Almuerzo, Desayuno, Otros) y flecha colapsable. |
| `components/entries/WellbeingSection.tsx` | `heart` | Cabecera del formulario de ratings de bienestar. |
| `components/entries/NotesPhotoSection.tsx` | `camera`, `x` | Carga de fotos y botón para limpiar imagen cargada. |
| `components/entries/EntryTable.tsx` | `pencil`, `trash-2` | Acciones de edición y borrado en el historial. |
| `components/dashboard/StatsCard.tsx` | `trending-up`, `trending-down`, `minus` | Tendencias positivas, negativas o neutras en las tarjetas de estadísticas. |
| `components/recipes/RecipeCard.tsx` | `pencil` | Botón para editar la receta seleccionada. |
| `components/recipes/MarkdownEditor.tsx` | `file-up`, `eye`, `edit-3` | Controles de carga de Markdown, previsualización y editor. |
| `components/ui/ToastNotification.tsx` | `x`, `check-circle`, `alert-circle`, `info`, `alert-triangle` | Indicadores de estado de los mensajes emergentes de aviso/error. |
| `components/ui/Modal.tsx` | `x` | Botón de cierre en la esquina superior derecha del diálogo modal. |
| `components/ui/FloatingActionButton.tsx` | `plus` | Botón redondo flotante para crear nuevas entradas. |
| `components/ui/ConfirmDialog.tsx` | `alert-triangle` | Icono de advertencia en cuadros de confirmación destructivos. |
| `components/ui/ComboboxInput.tsx` | `chevron-down`, `x` | Desplegado de opciones y botón de borrado de selección. |
| `pages/RecipesPage.tsx` | `chef-hat`, `plus`, `search` | Cabecera de recetas, crear receta y barra de búsqueda. |
| `pages/RecipeDetailPage.tsx` | `chef-hat`, `arrow-left`, `pencil`, `hash`, `calendar` | Detalles de receta, volver atrás, editar, slug e información de creación. |
| `pages/NewRecipePage.tsx` | `chef-hat`, `arrow-left` | Formulario de nueva receta y volver atrás. |
| `pages/EditRecipePage.tsx` | `chef-hat`, `arrow-left` | Formulario de edición de receta y volver atrás. |
| `pages/NewEntryPage.tsx` | `arrow-left` | Formulario de nueva entrada diaria y volver atrás. |
| `pages/EditEntryPage.tsx` | `arrow-left` | Formulario de edición de entrada y volver atrás. |
| `pages/EntryDetailPage.tsx` | `arrow-left`, `pencil`, `trash-2` | Vista detallada de entrada diaria, editar y eliminar. |
| `pages/HistoryPage.tsx` | `search` | Barra de búsqueda de la vista de listado histórico. |
| `pages/GalleryPage.tsx` | `image`, `x`, `zoom-in` | Cabecera de galería, cerrar carrusel e icono de zoom en fotos. |
| `pages/ExportPage.tsx` | `download`, `file-json`, `file-spreadsheet`, `hard-drive` | Formatos de exportación (CSV, JSON) y backups de base de datos. |
| `pages/DashboardPage.tsx` | `scale`, `flame`, `moon`, `dumbbell`, `droplets`, `calendar`, `zap`, `utensils` | Estadísticas del dashboard (peso, racha, sueño, hinchazón, entrenamiento, comidas). |

### Cómo modificar visualmente un SVG existente
1. Localiza el archivo `.svg` correspondiente en `apps/web/src/assets/icons/`.
2. Edítalo directamente utilizando un editor de texto o una herramienta de edición vectorial.
3. Asegúrese de mantener la estructura y de que use `stroke="currentColor"` para no perder la compatibilidad de estilos dinámicos de color con Tailwind CSS.

### Iconos actualmente disponibles (42 iconos locales)

Los siguientes iconos están totalmente descargados y listos para usar en la aplicación:

1. `alert-circle`
2. `alert-triangle`
3. `apple`
4. `arrow-left`
5. `calendar`
6. `camera`
7. `check-circle`
8. `chef-hat`
9. `chevron-down`
10. `coffee`
11. `download`
12. `droplets`
13. `dumbbell`
14. `edit-3`
15. `eye`
16. `file-json`
17. `file-spreadsheet`
18. `file-text`
19. `file-up`
20. `flame`
21. `hard-drive`
22. `hash`
23. `heart`
24. `image`
25. `info`
26. `layout-dashboard`
27. `list`
28. `minus`
29. `moon`
30. `pencil`
31. `plus-circle`
32. `plus`
33. `salad`
34. `scale`
35. `search`
36. `trash-2`
37. `trending-down`
38. `trending-up`
39. `utensils`
40. `x`
41. `zap`
42. `zoom-in`
