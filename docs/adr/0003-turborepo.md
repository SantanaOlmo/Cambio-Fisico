# ADR-003: Elección de Turborepo como Orquestador de Tareas

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
A medida que el monorepo crece con aplicaciones y paquetes internos en paralelo, compilar, analizar tipados (`tsc --noEmit`), verificar linting y correr tests unitarios de forma secuencial en cada carpeta consume demasiado tiempo, tanto en local como en pipelines de CI.

## Problema
¿Cómo orquestar la ejecución de tareas concurrentes y gestionar dependencias de compilación entre los diferentes paquetes del monorepo sin ralentizar el flujo de trabajo?

## Alternativas Evaluadas

1.  **Lerna:**
    *   *Ventajas:* Ecosistema muy antiguo y maduro para la gestión de monorepos.
    *   *Inconvenientes:* Configuración tediosa y menor rendimiento en comparación con herramientas modernas que usan caché incremental.
2.  **Nx:**
    *   *Ventajas:* Extremadamente potente, con plugins automatizados para generar proyectos y dependencias de código estructuradas.
    *   *Inconvenientes:* Curva de aprendizaje alta y demasiada magia/boilerplate que puede considerarse overengineering para un equipo pequeño o un portfolio ágil.
3.  **Turborepo (Elegida):**
    *   *Ventajas:*
        *   **Caché remota y local:** Almacena en caché el resultado de compilaciones, lints o tests. Si los archivos no han cambiado, la tarea finaliza instantáneamente (0 ms).
        *   **Grafo de dependencias declarativo:** Configuración simple mediante `turbo.json` para encadenar ejecuciones (ej: "compila packages antes de compilar apps").
        *   Fácil integración con pnpm workspaces sin alterar la estructura básica de TypeScript.
    *   *Inconvenientes:* Requiere mantener sincronizada la configuración en un archivo `turbo.json`.

## Decisión
Adoptar **Turborepo** como el orquestador de tareas oficial del monorepo.

## Consecuencias
*   **Positivas:**
    *   Aceleración drástica de tareas repetitivas (lint, typecheck, build) en local y CI mediante el sistema de cachés.
    *   Compilación de paquetes y dependencias en el orden correcto de forma automática.
    *   Configuración sencilla de pipelines de tareas en un único fichero `turbo.json`.
*   **Negativas:**
    *   Se añade la dependencia `@turbo/cli` al proyecto.
