# ADR-005: Elección de NestJS como Framework del Backend

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El servidor original en Express carece de una estructura predefinida obligatoria, lo que favorece que las aplicaciones crezcan de forma desordenada a medida que se añaden validaciones, inyección de dependencias y módulos de autenticación complejos, fomentando el acoplamiento técnico.

## Problema
¿Cómo estructurar la API backend para asegurar que cumpla con los principios de arquitectura limpia, inyección de dependencias estructurada, tipado estricto y separación de responsabilidades a medida que escala?

## Alternativas Evaluadas

1.  **Express tradicional (con estructura manual):**
    *   *Ventajas:* Ligero, rendimiento excelente y sin abstracciones intermedias.
    *   *Inconvenientes:* Cada programador puede estructurar los archivos de forma diferente, requiere configurar manualmente middlewares para validaciones y carece de inyección de dependencias nativa.
2.  **Fastify (con estructura manual):**
    *   *Ventajas:* Más rápido que Express y con esquemas JSON de validación integrados.
    *   *Inconvenientes:* Mismos problemas organizativos que Express en proyectos de gran tamaño.
3.  **NestJS (Elegida):**
    *   *Ventajas:*
        *   **Arquitectura modular obligatoria:** Organiza el backend por módulos (entries, recipes, auth), aislando responsabilidades.
        *   **Inyección de dependencias integrada:** Facilita la inyección de repositorios y servicios de forma limpia, ideal para mockear en tests unitarios.
        *   Soporte nativo de validación con class-validator/Zod y TypeScript estricto de primer nivel.
    *   *Inconvenientes:* Curva de aprendizaje más alta y sobrecarga inicial de archivos (boilerplate) al arrancar.

## Decisión
Migrar de forma incremental el servidor de Express a una arquitectura de backend modular implementada con **NestJS**.

## Consecuencias
*   **Positivas:**
    *   Estructura estándar de proyecto predecible para cualquier desarrollador senior.
    *   Facilidad para escribir tests unitarios y de integración desacoplados.
    *   Reducción de código repetitivo (middlewares, capturadores de excepciones) gracias al uso de decoradores e interceptores de NestJS.
*   **Negativas:**
    *   Mayor número de dependencias instaladas y tiempo de compilación ligeramente superior en backend.
