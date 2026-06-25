# D004 — Registro según la etapa actual de vida

## Estado

Provisional

## Fecha

2026-06-25

---

## Descubrimiento

El usuario no monitoriza de manera uniforme todos los aspectos de su bienestar a lo largo del tiempo. Sus objetivos y focos cambian según la **etapa actual de su vida** (ej. una fase de recomposición física intensa, una época de alto estrés laboral donde prioriza el sueño, o la recuperación de una lesión). Por lo tanto, la modularidad no es solo un principio técnico del código; es un principio de la experiencia de usuario: el sistema debe permitir activar o desactivar secciones enteras para mantener la interfaz ligera y alineada únicamente con el foco actual del usuario.

---

## Por qué cambia el producto

La mayoría de los diarios o trackers de salud abruman al usuario mostrando de forma obligatoria decenas de campos, inputs y menús para medir todo de golpe. Con este descubrimiento, el usuario toma el control de lo que ve: la interfaz se contrae o expande según sus metas del momento, reduciendo drásticamente la sobrecarga cognitiva y la fatiga por el uso continuado de la app.

---

## Consecuencias

*   **Modularidad de Interfaz (UX):** El usuario puede apagar o encender módulos completos (ej: desactivar *Nutrition* si no quiere monitorizar ingestas, u ocultar *Fitness* durante sus vacaciones) desde la configuración de manera inmediata. Los menús, el formulario y el Dashboard se adaptan al instante.
*   **Gobernanza de Datos:** Los datos históricos registrados por un módulo desactivado no se destruyen; permanecen seguros en la persistencia local, pero se ocultan de las pantallas activas de interacción cotidiana para no generar ruido.
*   **Abstracción en el Core:** Las capacidades comunes del Core (como el Timeline feed) deben soportar el renderizado condicional y pasivo de eventos procedentes únicamente de los módulos activos del usuario.

---

## Preguntas abiertas

*   ¿Cómo gestionamos la lectura retrospectiva en el Timeline de días que contienen información de módulos que actualmente están desactivados? ¿Debemos mostrar un indicador de solo lectura o simplificar la tarjeta del día?
*   ¿Cómo sugerimos de forma inteligente al usuario activar un nuevo módulo en base a la evolución natural de sus notas (D001 / D002)?

---

## Estado futuro

Este documento podrá:

- consolidarse en Product Manifest;
- consolidarse en Product Discovery;
- consolidarse en ai_context;
- descartarse completamente.
