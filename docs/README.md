# CambioFísico — Documentación del Proyecto

Este índice organiza la documentación activa del repositorio. Separa la dirección de producto, la dirección técnica vigente, el sistema web heredado y el archivo histórico.

---

## Índice

1. [Visión General](#visión-general)
2. [Producto](#producto)
3. [Ingeniería — Dirección vigente](#ingeniería--dirección-vigente)
4. [Ingeniería — Sistema heredado](#ingeniería--sistema-heredado)
5. [Decisiones de arquitectura (ADR)](#decisiones-de-arquitectura-adr)
6. [Archivo histórico](#archivo-histórico)

---

## Visión General

**CambioFísico** es una plataforma personal local-first para registrar, comprender y orientar la propia vida. El producto evoluciona hacia una aplicación móvil con SQLite local; la aplicación web existente se conserva como sistema heredado útil para mantenimiento, depuración y posible migración de datos.

Para contexto conceptual del producto, consultar primero:

- [`ai_context.md`](../ai_context.md) — constitución conceptual del proyecto
- [`product/mental-model.md`](./product/mental-model.md) — modelo mental del dominio

Para dirección técnica activa del monorepo:

- [`engineering/technology-direction.md`](./engineering/technology-direction.md)
- ADRs en [`docs/adr/`](./adr/)

Para trabajar sobre la aplicación web heredada, usar exclusivamente los documentos `legacy-web-*` listados más abajo.

---

## Producto

Documentación activa de producto, dominio y descubrimientos en validación:

*   [mental-model.md](./product/mental-model.md): Modelo mental y fundamento conceptual del producto.
*   [discoveries/](./product/discoveries/): Laboratorio de descubrimientos provisionales antes de consolidarse en documentos estables.

---

## Ingeniería — Dirección vigente

Documentación que describe la dirección técnica actual del proyecto y las decisiones aprobadas:

*   [technology-direction.md](./engineering/technology-direction.md): Stack, dependencias y convenciones técnicas vigentes del monorepo.
*   [`ai_context.md`](../ai_context.md): Principios de ingeniería y contexto para IAs y desarrolladores.
*   [adr/](./adr/): Registro de decisiones de arquitectura (monorepo, Expo, persistencia, etc.).

---

## Ingeniería — Sistema heredado

Referencias técnicas del software web construido antes de la evolución hacia la app móvil. **No deben cargarse por defecto en conversaciones de producto, UX, dominio, app móvil o arquitectura futura**:

*   [legacy-web-architecture.md](./engineering/legacy-web-architecture.md): Estructura técnica de la app web heredada (Vite + Express + `sql.js`).
*   [legacy-web-development.md](./engineering/legacy-web-development.md): Arranque, depuración, comandos y convenciones del código heredado.
*   [legacy-web-api.md](./engineering/legacy-web-api.md): Endpoints HTTP del backend Express existente.
*   [legacy-web-schema.md](./engineering/legacy-web-schema.md): Esquema SQLite e interfaces TypeScript del sistema heredado.

---

## Decisiones de arquitectura (ADR)

Registro de decisiones técnicas aprobadas en [`docs/adr/`](./adr/):

*   [0001-monorepo-tooling.md](./adr/0001-monorepo-tooling.md)
*   [0002-backend-nestjs.md](./adr/0002-backend-nestjs.md)
*   [0003-mobile-expo.md](./adr/0003-mobile-expo.md)
*   [0004-persistence-prisma-sqlite.md](./adr/0004-persistence-prisma-sqlite.md)

---

## Archivo histórico

Documentos de fases anteriores conservados como registro histórico. **No deben utilizarse como fuente de verdad para desarrollo, producto, UX o arquitectura, ni cargarse como contexto por defecto para IAs**:

*   [product-discovery-legacy.md](./archive/product-discovery-legacy.md): Product Discovery original (MVP inicial y roadmap legacy).
*   [product-manifesto-legacy.md](./archive/product-manifesto-legacy.md): Manifiesto de producto original (visión modular inicial).
