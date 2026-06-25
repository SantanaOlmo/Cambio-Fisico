# ADR-001: Adopción de Monorepo (pnpm Workspaces + Turborepo)

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El desarrollo de CambioFísico evoluciona de una única aplicación web React/Express a un ecosistema que incluirá un cliente web, una aplicación móvil (Expo) y una API backend (NestJS). Compartir lógica de dominio, DTOs y validaciones Zod entre estas aplicaciones es fundamental para evitar duplicidad y mantener un tipado estricto extremo a extremo.

## Problema
¿Cómo estructurar y gestionar la base de código del proyecto para soportar el desarrollo multiplataforma de forma unificada, rápida y sin duplicidades?

## Alternativas Evaluadas

1.  **Multi-repositorios (Repositorios independientes):**
    *   *Ventajas:* Aislamiento de código y despliegues desacoplados por componente.
    *   *Inconvenientes:* Enorme fricción para compartir tipos y DTOs (requiere publicar paquetes npm privados), y duplicación de configuraciones locales de linting y formateo.
2.  **Monorepo con npm o Yarn workspaces:**
    *   *Ventajas:* Centralización de código nativo.
    *   *Inconvenientes:* npm es lento y sufre de duplicación de almacenamiento en node_modules. Yarn Berry (PnP) tiene problemas de compatibilidad severos con el ecosistema de dependencias nativas de React Native/Expo.
3.  **Monorepo con pnpm Workspaces y Turborepo (Elegida):**
    *   *Ventajas:*
        *   **pnpm Workspaces:** Gracias a su almacén global de paquetes y enlaces físicos (hard links), reduce drásticamente el espacio en disco de `node_modules`. Su estructura no plana evita la importación accidental de dependencias no declaradas (phantom dependencies).
        *   **Turborepo:** Orquesta de forma declarativa las dependencias de tareas (ej: compilar paquetes compartidos antes de compilar aplicaciones) y utiliza un potente sistema de caché incremental (local y remota) para ejecutar lints, lits y builds en 0 ms si los ficheros de entrada no han cambiado.
    *   *Inconvenientes:* Requiere instalar pnpm de forma global en la máquina de desarrollo.

## Decisión
Adoptar una arquitectura de **Monorepo** utilizando **pnpm workspaces** para la gestión de dependencias y **Turborepo** como orquestador y optimizador de tareas de desarrollo y compilación.

## Consecuencias
*   **Positivas:**
    *   Estructura modular limpia (`apps/web`, `apps/mobile`, `apps/api` y `packages/shared`).
    *   Alineación de estándares de calidad comunes en una única configuración.
    *   Tiempos de ejecución ultrarrápidos y ahorro masivo de espacio en disco en local y en CI.
*   **Negativas:**
    *   Curva de aprendizaje inicial en la declaración de dependencias cruzadas en `package.json` de cada sub-espacio.
