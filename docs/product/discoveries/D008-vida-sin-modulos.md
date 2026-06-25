# D008 — La vida no se divide en módulos

## Estado

Provisional

## Fecha

2026-06-25

---

## Descubrimiento

En su vida cotidiana, el usuario no segmenta mentalmente sus acciones en categorías de software. No experimenta la transición de "ir al módulo de nutrición" al preparar su comida, o "abrir el módulo de deporte" al salir a correr. Simplemente cocina, entrena, descansa o disfruta. La experiencia de usuario de la plataforma debe respetar esa continuidad orgánica de la vida.

El diseño de la interfaz y la interacción debe organizarse alrededor del discurrir del día del usuario, no de la arquitectura interna de la aplicación. Aunque internamente existan divisiones lógicas o de persistencia, de cara al usuario la experiencia debe ser percibida como un flujo continuo, continuo y unificado. El registro de la vida no debe consistir en rellenar diversos formularios especializados, sino en mantener un diálogo sencillo, homogéneo y coherente con el sistema.

El lenguaje visual y los patrones de interacción deben diseñarse para sostener esta continuidad, eliminando las barreras que hagan sentir al usuario que está cambiando de aplicación cuando pasa de registrar una comida a anotar un pensamiento o una actividad física.

---

## Por qué cambia el producto

La mayoría de las aplicaciones de bienestar obligan al usuario a navegar a través de menús complejos, pestañas rígidas o flujos de entrada de datos muy diferenciados según el tipo de información (una interfaz para buscar ingredientes, otra para configurar series de fuerza, otra para escribir notas de estado de ánimo). Esta fragmentación de la interfaz impone una alta carga cognitiva y destruye la fluidez. Al unificar el registro diario en un único flujo homogéneo, el acto de documentar la vida se convierte en un hábito natural y de muy baja fricción.

---

## Consecuencias

*   **Continuidad de la Interfaz:** La transición entre registrar diferentes tipos de acontecimientos (como una comida, un entrenamiento o una lectura) debe ser fluida y natural, utilizando componentes comunes de entrada de datos en lugar de formularios especializados aislados.
*   **Lenguaje Visual Coherente:** Se debe mantener una consistencia absoluta en el diseño visual, la tipografía, las micro-interacciones y la paleta cromática a lo largo de todo el sistema. El cambio de contexto de vida no debe implicar un cambio en la identidad estética de la aplicación.
*   **Registro Homogéneo:** El método principal de interacción debe ser lo más unificado posible (por ejemplo, basándose en la escritura natural o en gestos sencillos comunes), reduciendo al mínimo las interfaces de usuario especializadas.

---

## Preguntas abiertas

*   ¿Cómo diseñamos un lenguaje visual común y unificado que resulte idóneo tanto para el dinamismo de una sesión de entrenamiento como para la calma de una receta de cocina o una anotación personal?
*   ¿Cómo permitimos al usuario interactuar de manera homogénea sin perder la riqueza de los detalles particulares que requiere cada tipo de experiencia?

---

## Estado futuro

Este documento podrá:

- consolidarse en Product Manifest;
- consolidarse en Product Discovery;
- consolidarse en ai_context;
- descartarse completamente.
