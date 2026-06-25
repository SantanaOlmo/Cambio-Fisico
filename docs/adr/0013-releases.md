# ADR-013: Estrategia de Releases y Gestión de Entornos

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
Tener una estrategia de lanzamiento (Release) bien definida es vital para evitar subir código inestable a producción, mantener informados a los usuarios de los cambios y coordinar las compilaciones móviles nativas con los despliegues de la API en la nube.

## Problema
¿Cómo estructurar las ramas de Git, los entornos de ejecución y el proceso de compilación y publicación de nuevas versiones de CambioFísico?

## Alternativas Evaluadas

1.  **GitFlow tradicional:**
    *   *Ventajas:* Muy ordenado. Ramas para develop, master, releases y hotfixes.
    *   *Inconvenientes:* Complejo, excesivas fusiones de ramas (merges) y poco ágil para proyectos de tamaño medio o portfolios rápidos.
2.  **GitHub Flow (Trunk-Based Development Simplificado) (Elegida):**
    *   *Ventajas:*
        *   **Una sola rama protegida:** La rama `main` representa el estado de producción.
        *   **Ramas de características cortas:** Los desarrollos se realizan en ramas `feature/*`, `fix/*` o `chore/*` y se fusionan rápidamente a `main` tras pasar la suite de CI.
        *   Despliegues automatizados basados en etiquetas Git (`tags`) y GitHub Releases.
    *   *Inconvenientes:* Exige pipelines de CI/CD robustos para evitar inestabilidad en `main`.

## Decisión
Adoptar **GitHub Flow** como la estrategia de ramas oficial. Las releases de producción se dispararán de forma automatizada al crear una etiqueta Git (`tag`) que coincida con el versionado de la aplicación, publicando automáticamente un **GitHub Release** con su respectivo **Changelog**.

## Consecuencias
*   **Positivas:**
    *   Ciclo de desarrollo y despliegue rápido y ágil.
    *   Trazabilidad limpia en GitHub de qué commits y cambios entran en cada release de producción.
*   **Negativas:**
    *   Frecuente necesidad de sincronizar y mantener limpias las ramas locales.
