> [!WARNING]
> ## Guía del sistema heredado — no guía general del proyecto
>
> Este documento describe cómo ejecutar, depurar y mantener la aplicación web heredada de CambioFísico.
>
> No define la estructura, arquitectura ni comandos de la aplicación móvil futura.
>
> Para la dirección técnica vigente, consultar:
>
> - `docs/engineering/technology-direction.md`
> - `ai_context.md`
> - ADRs vigentes en `docs/adr/`
>
> Este documento debe consultarse únicamente cuando se trabaje sobre el frontend web, backend Express, persistencia `sql.js` o exportaciones del sistema heredado.

# Guía de desarrollo de la aplicación web heredada

Este documento explica cómo ejecutar, depurar y mantener la aplicación web heredada de CambioFísico.

La aplicación heredada está formada por un frontend Vite y un backend Express con persistencia SQLite basada en `sql.js`.

Esta documentación describe el estado actual de ese sistema. No debe utilizarse para decidir la arquitectura futura de la aplicación móvil ni para añadir infraestructura nueva sin una necesidad explícita.

---

## Estructura del sistema heredado

El código heredado vive en el monorepo bajo `apps/`:

```text
apps/
├── web/                    # Frontend React + Vite + TypeScript
│   ├── vite.config.ts      # Puerto 5173 y proxy /api → localhost:3001
│   ├── package.json
│   └── src/
│       ├── api/            # Cliente HTTP centralizado
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── pages/
│       ├── types/
│       └── utils/
│
└── api-legacy/             # Backend Express + sql.js
    ├── server.ts           # Punto de entrada: init DB y arranque HTTP
    ├── package.json
    └── src/
        ├── app.ts
        ├── config.ts       # Puerto, rutas de SQLite y fotos
        ├── multerConfig.ts
        ├── controllers/
        ├── db/             # database.ts, schema.ts, helpers.ts
        ├── middleware/
        ├── repositories/
        ├── routes/
        ├── services/
        ├── types/
        └── validators/
```

Los datos locales se guardan en la raíz del repositorio:

```text
data/
├── fitness.sqlite          # Base de datos SQLite (sql.js)
└── photos/                 # Fotos de progreso subidas por la app
```

---

## Configuración de entorno

### Servidor local (backend)

- El backend Express escucha en el puerto **3001** por defecto.
- El puerto puede cambiarse con la variable de entorno `PORT`.
- En `apps/api-legacy/src/config.ts` se resuelven las rutas de `data/`, `data/fitness.sqlite` y `data/photos/`.

### Cliente SPA (frontend)

- Vite sirve el frontend en el puerto **5173**.
- En `apps/web/vite.config.ts` el proxy redirige las peticiones `/api` a `http://localhost:3001`.

---

## Instalación y arranque

### Instalar dependencias

Desde la raíz del monorepo:

```bash
pnpm install
```

### Arrancar frontend y backend

Desde la raíz (ambos procesos en paralelo vía Turbo):

```bash
pnpm dev
```

También puede arrancarse cada parte por separado:

```bash
# Terminal 1 — Backend
cd apps/api-legacy
pnpm dev

# Terminal 2 — Frontend
cd apps/web
pnpm dev
```

Abrir en el navegador: **http://localhost:5173**

---

## Inicialización automática al arrancar el backend

Al iniciar el backend (`pnpm dev` en `apps/api-legacy`), ocurre lo siguiente:

1. Se crea el directorio `data/` si no existe.
2. Se crea el directorio `data/photos/` si no existe.
3. Se carga o crea `data/fitness.sqlite` en memoria con `sql.js`.
4. Se aplica el esquema definido en `apps/api-legacy/src/db/schema.ts`:
   - creación de la tabla `entries` (con índice por fecha);
   - migraciones idempotentes que añaden las columnas `meal_breakfast`, `meal_lunch`, `meal_dinner` y `meal_other` si faltan;
   - creación de la tabla `recipes` (con índice por `slug`).
5. Se persiste el fichero SQLite en disco tras la inicialización.

---

## Comandos útiles

### Validar TypeScript (no emit)

Desde la raíz del monorepo:

```bash
pnpm typecheck
```

Por aplicación:

```bash
cd apps/web
pnpm typecheck
```

```bash
cd apps/api-legacy
pnpm typecheck
```

### Limpieza de caché de Vite

Si cambias dependencias o tienes problemas con la preoptimización de Vite:

```bash
cd apps/web
# PowerShell (Windows)
Remove-Item -Recurse -Force node_modules/.vite
pnpm dev
```

En entornos Unix:

```bash
cd apps/web
rm -rf node_modules/.vite
pnpm dev
```

---

## Convenciones del código heredado

La aplicación web heredada organiza actualmente parte de su lógica mediante:

```text
DB Helpers → Repositories → Services → Controllers
```

Los controladores gestionan HTTP, los servicios contienen lógica de aplicación y tipos, y los repositorios encapsulan consultas y persistencia.

Mantén esta convención cuando modifiques el sistema heredado para evitar introducir inconsistencias.

No extrapoles automáticamente esta estructura a la aplicación móvil futura. La aplicación móvil no necesita una capa HTTP ni controladores si opera directamente sobre SQLite local.

En el frontend heredado, las peticiones al backend deben hacerse a través del cliente centralizado en `apps/web/src/api/client.ts`, no con llamadas HTTP dispersas en los componentes.

---

## Límites de esta guía

Esta guía puede utilizarse para:

- arrancar la aplicación web heredada;
- depurar errores del frontend Vite o backend Express;
- mantener el esquema SQLite heredado;
- modificar exportaciones, fotos o rutas locales existentes;
- preparar una migración de datos desde el sistema heredado.

Esta guía no debe utilizarse para:

- diseñar la aplicación móvil;
- decidir la arquitectura del monorepo;
- definir el modelo de dominio futuro;
- introducir un backend remoto, autenticación o sincronización;
- asumir que Express, `sql.js` o la API HTTP forman parte del producto futuro.
