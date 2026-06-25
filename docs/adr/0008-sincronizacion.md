# ADR-008: Estrategia de Sincronización Cloud Futura

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
En fases multiusuario, CambioFísico permitirá al usuario iniciar sesión en diferentes dispositivos (ej. registrar un entrenamiento desde el móvil y analizar gráficas desde el ordenador). Al ser una app local-first, los datos creados localmente y de forma desconectada en ambos clientes deben unificarse en el servidor de forma consistente.

## Problema
¿Qué mecanismo de sincronización e intercambio de datos utilizar para conciliar bases de datos locales independientes con la base de datos centralizada de la API sin generar conflictos destructivos o pérdida de información?

## Alternativas Evaluadas

1.  **Reemplazo Total (Overwrite):**
    *   *Ventajas:* Sencillo de programar. El último dispositivo que se conecta sobreescribe la base de datos del servidor por completo.
    *   *Inconvenientes:* Pérdida masiva de información si se registran datos en paralelo desde dos dispositivos.
2.  **CRDTs (Conflict-Free Replicated Data Types):**
    *   *Ventajas:* Unificación matemática automática y perfecta de estados sin colisiones.
    *   *Inconvenientes:* Complejidad extrema de modelado de datos, sobrecarga en el bundle e innecesario para un dominio donde el 95% de los datos están indexados por fecha única (`YYYY-MM-DD`).
3.  **Logs de Cambios Incremental con Last-Write-Wins (LWW) (Elegida):**
    *   *Ventajas:*
        *   Los clientes registran sus modificaciones locales en una tabla de mutaciones pendientes (`pending_mutations`) con un identificador UUID y una marca de tiempo de última actualización (`updated_at`).
        *   Al recuperar conexión, se envían las mutaciones en orden cronológico. El servidor compara marcas y aplica el cambio más reciente.
        *   Dado que las entradas de CambioFísico están estructuradas de forma diaria por fecha, el conflicto de solapamiento se reduce a nivel de día único, siendo muy simple de conciliar.
    *   *Inconvenientes:* Requiere mantener campos de control de auditoría (`created_at`, `updated_at`) y UUIDs en todas las tablas del cliente y del servidor.

## Decisión
Adoptar una estrategia de **sincronización basada en logs de cambios y resolución Last-Write-Wins (LWW)** a nivel de registro. Se utilizarán UUIDv4 de forma estricta para identificar registros locales de forma única desde su creación en modo offline.

## Consecuencias
*   **Positivas:**
    *   Sincronización robusta que no interfiere en el uso diario offline de la aplicación.
    *   Resolución predecible y lógica de conflictos sin requerir intervención del usuario en la mayoría de los casos.
*   **Negativas:**
    *   Se requiere implementar marcas de borrado lógico (soft deletes) para evitar que eliminar registros offline genere desincronizaciones en el servidor.
