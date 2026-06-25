# ADR-012: Estrategia de Versionado de Código

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
En un ecosistema con múltiples componentes (web, mobile, api, shared) que evolucionan en paralelo, es crítico identificar con qué versión del backend es compatible la app móvil, y saber qué cambios introducen modificaciones rompedoras (breaking changes) en el paquete de tipos compartidos.

## Problema
¿Cómo versionar las aplicaciones y paquetes compartidos del monorepo de forma predecible y estandarizada?

## Alternativas Evaluadas

1.  **Versionado Único Global (Lock-step):**
    *   *Ventajas:* Sencillo. Todo el monorepo comparte la misma versión (ej: v1.2.0).
    *   *Inconvenientes:* Si se realiza un cambio exclusivo en la documentación o en la app web, se fuerza un salto de versión innecesario en la app móvil y en la API backend.
2.  **Versionado Independiente por Paquete (Elegida):**
    *   *Ventajas:*
        *   Cada aplicación (`apps/web`, `apps/mobile`, `apps/api`) y paquete (`packages/shared`) gestiona su propia versión siguiendo el estándar **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`.
        *   Los saltos de versión ocurren únicamente cuando hay cambios reales en ese paquete, optimizando las publicaciones y releases.
    *   *Inconvenientes:* Complejidad para llevar la cuenta de versiones manualmente (mitigado con herramientas automatizadas de release).

## Decisión
Adoptar **Semantic Versioning (SemVer)** de forma **independiente para cada paquete** del monorepo. Para automatizar este proceso y evitar errores humanos, se forzará el uso de **Conventional Commits** mediante Git Hooks.

## Consecuencias
*   **Positivas:**
    *   Control preciso sobre la compatibilidad de versiones de contratos (`packages/shared`) frente a las APIs consumidoras.
    *   Generación automática de CHANGELOGs basada en el tipo de commits (`feat`, `fix`, `refactor`).
*   **Negativas:**
    *   Requiere configurar linters de commits (`commitlint`) para educar a los desarrolladores en el estándar de mensajes.
