# ADR-015: Estrategia de Observabilidad (Logging y Diagnóstico)

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
Cuando la aplicación se ejecute a nivel de producto de producción en servidores en la nube, diagnosticar problemas basándose únicamente en `console.log` desestructurados o inspeccionar manualmente terminales es ineficiente y dificulta la detección de anomalías o ataques de seguridad.

## Problema
¿Cómo capturar logs, errores y métricas del estado del sistema en backend y frontend para facilitar el diagnóstico proactivo de fallos en producción?

## Alternativas Evaluadas

1.  **Console Logging simple:**
    *   *Ventajas:* Sencillo, no requiere dependencias.
    *   *Inconvenientes:* Los logs no tienen estructura (difíciles de parsear por herramientas de análisis como Kibana o Datadog), no hay niveles de criticidad controlados y pueden degradar el rendimiento en entornos de alta carga.
2.  **Instrumentación avanzada (OpenTelemetry + Jaeger):**
    *   *Ventajas:* Trazabilidad distribuida perfecta y recolección de trazas y métricas estandarizadas a nivel corporativo.
    *   *Inconvenientes:* Demasiado complejo y costoso de configurar (overengineering) para la fase inicial y el tamaño del equipo.
3.  **Logs Estructurados JSON locales (Winston/Pino) + Endpoint de Salud (Elegida):**
    *   *Ventajas:*
        *   **Formato JSON estructurado:** Los logs se imprimen como objetos estructurados de una sola línea en consola/fichero, listos para ser indexados por cualquier recolector.
        *   **Librerías de alto rendimiento (Pino):** Tiene un impacto casi nulo en la CPU en comparación con `console.log`.
        *   **Endpoint de salud `/health`:** Expone un chequeo rápido de la conectividad de base de datos y memoria consumida para monitorización automatizada.
    *   *Inconvenientes:* Requiere configurar interceptores globales en NestJS para formatear los logs de excepciones.

## Decisión
Implementar **logs estructurados en formato JSON** en el backend utilizando **Pino** o **Winston**, clasificados en niveles (`error`, `warn`, `info`, `debug`). Se implementará además un endpoint `/api/health` para comprobar de forma automatizada la disponibilidad del sistema.

## Consecuencias
*   **Positivas:**
    *   Fácil diagnóstico y depuración de errores en entornos de staging o producción.
    *   Logs estandarizados y preparados para integrarse con cualquier servicio de telemetría en el futuro.
*   **Negativas:**
    *   Es necesario retirar todos los `console.log` informales y sustituirlos por llamadas al Logger inyectado de NestJS.
