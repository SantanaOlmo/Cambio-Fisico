# ADR-014: Estrategia y Pirámide de Testing

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
Para que CambioFísico sea un proyecto presentable ante reclutadores y escalable en producción, se requiere garantizar que refactorizaciones complejas (como migrar Express a NestJS o SQLite a PostgreSQL en el futuro) no introduzcan regresiones de software ni rompan flujos de usuario críticos.

## Problema
¿Qué herramientas y enfoque metodológico de pruebas implementar en el monorepo para asegurar la calidad de software sin penalizar la velocidad de desarrollo?

## Alternativas Evaluadas

1.  **Pruebas Manuales exclusivas:**
    *   *Ventajas:* Coste de desarrollo inicial cero.
    *   *Inconvenientes:* Lento a largo plazo, propenso a errores humanos y no aporta valor como portfolio de ingeniería de software.
2.  **Enfoque E2E masivo (Playwright/Cypress en todo):**
    *   *Ventajas:* Simula fielmente al usuario real.
    *   *Inconvenientes:* Tests lentos de ejecutar, frágiles ante cambios menores de CSS en la UI y costosos de programar.
3.  **Pirámide de Testing Híbrida (Elegida):**
    *   *Ventajas:*
        *   **Tests Unitarios (Vitest):** Pruebas de lógica matemática pura, formateadores, validadores Zod e interpolaciones de hashtags nutricionales. Rápidos, sencillos de escribir y con feedback inmediato.
        *   **Tests de Integración (Supertest / Nest Testing module):** Pruebas de los endpoints HTTP de la API interactuando con mocks controlados de base de datos.
        *   **Tests E2E (Playwright):** Pruebas limitadas a los flujos críticos de la aplicación (crear entrada, vincular receta, visualizar evolución).
        *   **Mobile Testing (React Native Testing Library):** Pruebas de renderizado de componentes y navegación en Expo.
    *   *Inconvenientes:* Exige mantener múltiples configuraciones y dependencias de test en el monorepo.

## Decisión
Implementar una **Pirámide de Testing** balanceada. Se utilizará **Vitest** para unitarios, **Supertest** en integración, **Playwright** para E2E web, y **React Native Testing Library** para móvil, integrando su ejecución en la pipeline de CI.

## Consecuencias
*   **Positivas:**
    *   Alta confianza en la calidad y robustez del código durante las refactorizaciones.
    *   Arquitectura de software madura y presentable para cualquier proceso de selección.
*   **Negativas:**
    *   Es necesario escribir y mantener los casos de prueba y mocks de base de datos a medida que evoluciona el dominio.
