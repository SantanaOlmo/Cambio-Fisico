# D004 — Adaptabilidad al foco vital actual del usuario

## Estado

Provisional

## Fecha

2026-06-25

---

## Descubrimiento

El usuario no monitoriza de manera uniforme todos los aspectos de su bienestar a lo largo del tiempo. Sus objetivos y focos cambian según el **foco vital actual de su vida** (ej. una fase de recomposición física intensa, una época de alto estrés laboral donde prioriza el sueño, o la recuperación de una lesión). Por lo tanto, la experiencia del producto debe adaptarse a ese foco actual, manteniendo la interfaz despejada de ruidos e inputs que pertenezcan a otras áreas que en este momento no son prioritarias.

---

## Por qué cambia el producto

La mayoría de los diarios o trackers de salud abruman al usuario mostrando de forma obligatoria decenas de campos, inputs y menús para medir todo de golpe. Con este descubrimiento, la experiencia se contrae o expande según la etapa en la que se encuentra el usuario, reduciendo drásticamente la sobrecarga cognitiva y la fatiga por el uso de la herramienta.

---

## Consecuencias

*   **Filtros de Atención (UX):** La interfaz debe permitir ocultar o silenciar dominios completos de la vista diaria (ej. no mostrar la sección de nutrición si no está enfocado en ingestas) de forma sencilla, permitiendo centrar su atención en lo relevante hoy.
*   **Gobernanza de Datos:** Los datos históricos registrados de áreas silenciadas no se destruyen; permanecen seguros en la persistencia local, pero se ocultan de las pantallas activas de interacción cotidiana para no generar ruido.
*   **Flexibilidad Arquitectónica:** Las capacidades comunes de la plataforma deben soportar que ciertos dominios estén inactivos o silenciados de forma pasiva sin corromper el histórico.

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
