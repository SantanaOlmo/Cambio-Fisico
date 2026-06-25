# ADR-002: Elección de NestJS como Framework del Backend

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El servidor actual de CambioFísico utiliza Express. Express no define una estructura organizativa obligatoria, lo que favorece que las aplicaciones crezcan de forma desordenada a medida que se añaden validaciones, inyección de dependencias y autenticación, dificultando el mantenimiento y las refactorizaciones.

## Problema
¿Cómo estructurar la API backend para asegurar que cumpla con los principios de arquitectura limpia, inyección de dependencias, tipado estricto y modularidad a medida que escala?

## Alternativas Evaluadas

1.  **Express tradicional (con estructura manual):**
    *   *Ventajas:* Ligero, familiar y sin abstracciones intermedias.
    *   *Inconvenientes:* Dificultad para mantener una arquitectura consistente entre desarrolladores, carencia de inyección de dependencias nativa y boilerplate repetitivo para validaciones.
2.  **NestJS (Elegida):**
    *   *Ventajas:*
        *   **Arquitectura modular obligatoria:** Organiza el backend en módulos estructurados (users, entries, recipes, auth), aislando responsabilidades.
        *   **Inyección de dependencias integrada:** Facilita la inyección de servicios y repositorios, haciendo el código testeable de forma aislada.
        *   Soporte nativo de validación con class-validator/Zod y TypeScript estricto de primer nivel.
    *   *Inconvenientes:* Curva de aprendizaje más alta y sobrecarga inicial de archivos (boilerplate) al arrancar.

## Decisión
Migrar de forma **incremental** el servidor de Express a una arquitectura de backend modular implementada con **NestJS**. En lugar de realizar una migración destructiva global (Big Bang), el nuevo backend coexistirá en paralelo con Express y los endpoints se portarán uno a uno.

## Consecuencias
*   **Positivas:**
    *   Estructura estándar de arquitectura limpia predecible.
    *   Facilidad para escribir tests unitarios y de integración desacoplados de la base de datos física mediante mocks.
    *   Reducción de código repetitivo mediante el uso de decoradores e interceptores globales de NestJS.
*   **Negativas:**
    *   Se introduce una arquitectura más compleja de arranque inicial.
