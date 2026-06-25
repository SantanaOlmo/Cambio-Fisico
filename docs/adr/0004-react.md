# ADR-004: Elección de React como Framework del Frontend Web

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El frontend web de CambioFísico necesita un framework robusto, con un amplio ecosistema y que permita una rápida iteración del diseño, asegurando el desarrollo de componentes visuales altamente interactivos (gráficas, calendarios y editores Markdown).

## Problema
¿Qué framework o librería utilizar para desarrollar la aplicación cliente web asegurando escalabilidad, soporte y facilidad para compartir habilidades conceptuales con el desarrollo móvil?

## Alternativas Evaluadas

1.  **Vue.js / Svelte:**
    *   *Ventajas:* Excelente rendimiento, curva de aprendizaje amigable y reactividad muy limpia.
    *   *Inconvenientes:* Menor compatibilidad directa de conceptos de componentes y compartición de código si se planea usar React Native (Expo) para la aplicación móvil nativa.
2.  **Next.js (React Framework):**
    *   *Ventajas:* SSR (Server-Side Rendering) y optimización SEO nativa excelente.
    *   *Inconvenientes:* Añade complejidad de servidor (Node.js en frontend) y problemas en despliegues estáticos puros offline-first que no requieren procesamiento en servidor.
3.  **React SPA con Vite (Elegida):**
    *   *Ventajas:*
        *   **Alineación multiplataforma:** Usar React en web facilita enormemente el desarrollo móvil con React Native (Expo), ya que comparten la misma sintaxis JSX, hooks de estado y lógica de negocio.
        *   **Offline-first nativo:** Al compilar a estáticos puros (HTML, JS, CSS) servidos de forma local, es ideal para ejecutarse offline sin backend frontend intermedio.
        *   Gran soporte de librerías visuales críticas (Recharts, React Markdown).
    *   *Inconvenientes:* Carga inicial del bundle de JavaScript (mitigado mediante code-splitting).

## Decisión
Utilizar **React (v18)** con **Vite** para construir el cliente web como una SPA estática e independiente.

## Consecuencias
*   **Positivas:**
    *   Sinergia conceptual directa con la aplicación móvil (Expo).
    *   Compilación rápida y HMR instantáneo gracias a Vite.
    *   Facilidad para empaquetar el frontend como aplicación puramente cliente para offline.
*   **Negativas:**
    *   Requiere gestionar la navegación en cliente mediante routers virtuales (`react-router-dom`).
