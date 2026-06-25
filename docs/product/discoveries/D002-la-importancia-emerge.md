# D002 — La importancia emerge con el tiempo

## Estado

Provisional

## Fecha

2026-06-25

---

## Descubrimiento

La relevancia o importancia de un acontecimiento registrado en el Timeline no se determina de forma explícita o manual por el usuario en el momento de crear el registro (por ejemplo, marcando casillas de prioridad, tags de importancia o clasificaciones pesadas). La relevancia es una **propiedad emergente**: el sistema la calcula y destaca dinámicamente de forma retrospectiva basándose en la frecuencia de interacción con el evento, anomalías registradas en las métricas de bienestar de ese día, o las correlaciones identificadas a largo plazo.

---

## Por qué cambia el producto

Tradicionalmente, las aplicaciones de seguimiento obligan al usuario a clasificar y valorar el impacto de sus actividades en tiempo real. Este descubrimiento elimina esa fricción de registro: el usuario solo tiene que registrar lo que pasa de forma rápida y neutra. Es el sistema el que, con perspectiva histórica, resalta aquellos días o hábitos que realmente marcaron un antes y un después en su bienestar.

---

## Consecuencias

*   **UX/UI:** Eliminación de los inputs del formulario de entrada que pretendan medir la importancia en el momento (ej. escalas de importancia, prioridades manuales). El formulario se limita a la captura cruda de la experiencia.
*   **Visualización:** El Timeline o el Dashboard deben rediseñarse para dar mayor peso visual y jerarquía a los acontecimientos que la analítica y la IA identifiquen como influyentes (ej: agrandar la visualización de una tarjeta o colorear su hashtag de forma más intensa retrospectivamente).
*   **Algoritmos de Análisis:** Diseño de reglas para calcular la relevancia acumulada de hashtags y notas en base a la repetición y su impacto en las variables subjetivas de vitalidad.

---

## Preguntas abiertas

*   ¿Cómo evitamos que destacar eventos de forma automática altere la neutralidad del Timeline, respetando la objetividad del espejo (D001)?
*   ¿Qué inputs visuales o micro-interacciones usaremos para que el usuario perciba que un evento ha ganado relevancia en su histórico de forma natural?

---

## Estado futuro

Este documento podrá:

- consolidarse en Product Manifest;
- consolidarse en Product Discovery;
- consolidarse en ai_context;
- descartarse completamente.
