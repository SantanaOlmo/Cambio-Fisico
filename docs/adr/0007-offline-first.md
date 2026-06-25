# ADR-007: Estrategia de Diseño Offline-First (Local-First)

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El usuario final debe poder registrar su peso corporal, comidas, entrenamientos y cargar fotos en cualquier momento y situación (como en gimnasios subterráneos, zonas sin cobertura o viajes), sin depender de la existencia de red móvil o conexión al servidor central.

## Problema
¿Cómo garantizar que CambioFísico sea completamente operativa sin conexión a internet de forma predeterminada sin degradar la experiencia de usuario?

## Alternativas Evaluadas

1.  **Conexión Requerida (Cloud-First):**
    *   *Ventajas:* Sencillo de desarrollar. No hay base de datos local ni lógica de sincronización.
    *   *Inconvenientes:* La app queda inservible si no hay cobertura de internet, frustrando el hábito de registro inmediato del usuario.
2.  **Caché Pasiva (Red con fallback local):**
    *   *Ventajas:* Fácil de integrar mediante Service Workers estándar.
    *   *Inconvenientes:* Sólo sirve para lecturas. Si el usuario intenta guardar una entrada sin red, el sistema falla o muestra un aviso de error bloqueante.
3.  **Local-First / Offline-First (Elegida):**
    *   *Ventajas:*
        *   Toda modificación se escribe de forma inmediata y síncrona en una base de datos local del cliente (IndexedDB en navegador, SQLite en móvil).
        *   La interfaz de usuario responde instantáneamente, dando sensación de fluidez extrema (cero latencia de red).
        *   Los datos se encolan para subirse en diferido cuando se restablezca la conexión.
    *   *Inconvenientes:* Añade complejidad de sincronización, almacenamiento en local de archivos multimedia y requiere resolver conflictos de datos duplicados.

## Decisión
Diseñar el ecosistema de CambioFísico bajo la filosofía **Offline-First**. El cliente opera sobre su base de datos local y asume que el servidor remoto es un mero receptor de sincronizaciones en diferido.

## Consecuencias
*   **Positivas:**
    *   Disponibilidad de la app al 100% en cualquier situación de red.
    *   Experiencia de usuario fluida sin pantallas de carga bloqueantes al guardar registros.
    *   Ahorro de peticiones innecesarias y consumo de ancho de banda.
*   **Negativas:**
    *   Es necesario implementar un gestor de colas de mutaciones pendientes en el cliente para su posterior envío asíncrono.
