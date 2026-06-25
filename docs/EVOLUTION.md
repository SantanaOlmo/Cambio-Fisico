# Evolución Arquitectónica por Fases — CambioFísico

Este documento detalla la hoja de ruta evolutiva e incremental de **CambioFísico**. El objetivo es escalar el sistema de manera natural y adaptativa, activando nuevas capas de infraestructura únicamente cuando los requisitos reales del producto lo exijan.

---

## Roadmap Evolutivo

```mermaid
graph TD
    subgraph Fase 1: Prototipo Local
        A1[React Single SPA] --> A2[Express API]
        A2 --> A3[sqlite.js WASM]
    end

    subgraph Fase 2: Estructura Profesional
        B1[React Web]
        B2[Expo Mobile]
        B1 & B2 --> B3[NestJS API incremental]
        B3 --> B4[(SQLite Local)]
        B3 --> B5[shared-package]
    end

    subgraph Fase 3: Multiusuario y Sincronización
        C1[React Web]
        C2[Expo Mobile]
        C1 & C2 --> C3[NestJS modular]
        C3 --> C4[Autenticación JWT / Cookies]
        C3 --> C5[Sincronización Cloud]
        C3 --> C6[(PostgreSQL + Prisma)]
        C3 --> C7[AWS S3 / Storage]
    end

    subgraph Fase 4: Producto SaaS Comercial
        D1[Web & Mobile Clients] --> D2[NestJS API clusters]
        D2 --> D3[Async Workers]
        D2 --> D5[SaaS Billing Stripe]
        D2 --> D4[(PostgreSQL Replicas)]
        D2 --> D6[Observabilidad & Telemetría Pino/OTel]
    end

    Fase 1 --> |Migración Monorepo| Fase 2
    Fase 2 --> |Añadir Autenticación y Cloud| Fase 3
    Fase 3 --> |Escalar Infraestructura| Fase 4
```

---

## Detalle de las Fases

### Fase 1: Prototipo Local (Fase Actual)
*   **Enfoque:** Monousuario local puro.
*   **Arquitectura:** React SPA (Vite) + Express API local en dos procesos independientes.
*   **Persistencia:** Base de datos síncrona en memoria mediante `sql.js` (SQLite WASM) y fotos almacenadas en la carpeta física `../data/photos/`.
*   **Desventajas a resolver:** Acoplamiento de código, duplicación de tipos en frontend/backend y persistencia ineficiente.

### Fase 2: Estructura Profesional (Siguiente Fase)
*   **Enfoque:** Monorepo local y soporte multiplataforma.
*   **Cambios Clave:**
    *   Reestructuración del repositorio a un monorepo gestionado por `pnpm workspaces` y `Turborepo`.
    *   Coexistencia y migración de Express a NestJS de forma incremental (redirección endpoint por endpoint a través del proxy de Vite).
    *   Creación de la base de la aplicación móvil con **Expo React Native** (apuntando a Android).
    *   Creación del paquete `packages/shared` para unificar modelos TypeScript y validaciones de formulario con Zod (cero duplicación).
    *   **Base de datos:** Se mantiene **SQLite** en local, pero migrando el acceso SQL nativo a **Prisma ORM** con el conector de SQLite. No se requiere Docker ni base de datos remota todavía.

### Fase 3: Multiusuario y Sincronización
*   **Enfoque:** Autenticación y almacenamiento en la nube.
*   **Cambios Clave:**
    *   Incorporación de la capa de autenticación basada en cookies HttpOnly seguras y JWT.
    *   Migración de persistencia local SQLite a **PostgreSQL** administrado a través de Prisma para dar soporte a múltiples cuentas.
    *   Activación del protocolo de sincronización *offline-first* basado en marcas de tiempo lógicas y log de mutaciones locales.
    *   Subida de fotos de progreso a un sistema de almacenamiento de objetos (como AWS S3, Cloudflare R2 o MinIO).
    *   Contenerización local mediante Docker Compose para orquestar la API NestJS y la base de datos PostgreSQL en desarrollo.

### Fase 4: Producto SaaS Comercial
*   **Enfoque:** Escalabilidad, monitorización y monetización.
*   **Cambios Clave:**
    *   Procesamiento asíncronos mediante background workers para exportación de datos y optimización de imágenes.
    *   Integración de pasarela de pago (Stripe) para suscripciones SaaS.
    *   Implementación de pipelines de CI/CD automatizadas para desplegar en la nube (AWS/GCP) y publicar en tiendas móviles (EAS Build / Google Play / App Store).
    *   Instrumentación de observabilidad avanzada con logs estructurados (Pino/Winston) y monitorización del rendimiento.
