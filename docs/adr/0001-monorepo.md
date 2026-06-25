# ADR-001: Adopción de Monorepo para la Gestión de Código

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El proyecto CambioFísico evoluciona de ser una única aplicación web (frontend + backend de Express) a ser un producto multiplataforma (Web React, Mobile Expo y backend modular de NestJS). Administrar cada pieza en repositorios independientes incrementa la fricción al compartir código de dominio, tipos TypeScript y validadores Zod, además de duplicar configuraciones comunes de desarrollo.

## Problema
¿Cómo organizar la estructura de directorios del proyecto para facilitar el desarrollo multiplataforma, la compartición de lógica de negocio y evitar la duplicidad de contratos entre clientes y servidor?

## Alternativas Evaluadas

1.  **Multi-repositorios (Repositorios independientes):**
    *   *Ventajas:* Aislamiento total de código y despliegues independientes por componente.
    *   *Inconvenientes:* Complejidad extrema para compartir tipos (requiere publicar paquetes privados en npm), duplicación de configuraciones (ESLint, Prettier, TSConfig) y dificultad para refactorizar flujos de datos de extremo a extremo.
2.  **Repositorio Único Clásico (Monolito sin workspaces):**
    *   *Ventajas:* Sencillo en etapas iniciales.
    *   *Inconvenientes:* Dificultad para separar dependencias de frontend y backend, colisiones de librerías node_modules globales y falta de límites definidos entre apps.
3.  **Monorepo con workspaces (Elegida):**
    *   *Ventajas:* Centraliza todo el código en un único repositorio físico, permite definir límites estrictos mediante paquetes locales e importar configuraciones comunes sin publicarlas a registries externos.
    *   *Inconvenientes:* Curva de aprendizaje inicial en la gestión de dependencias y tiempos de build acumulados si no se orquesta correctamente.

## Decisión
Adoptar una arquitectura de **Monorepo** estructurada en directorios `apps/` (para aplicaciones web, móvil y API) y `packages/` (para configuraciones, UI y tipos compartidos).

## Consecuencias
*   **Positivas:**
    *   Código fuente consolidado y trazabilidad de cambios en una sola Pull Request.
    *   Facilidad para compartir tipos estáticos (`packages/shared`) evitando duplicados.
    *   Estandarización de herramientas de calidad (linters, compiladores) para todo el monorepo.
*   **Negativas:**
    *   Es necesario establecer linters e ignorar dependencias en el root para evitar contaminación de paquetes globales.
