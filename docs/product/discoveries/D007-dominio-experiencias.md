# D007 — El dominio son las experiencias, no los módulos

## Estado

Provisional

## Fecha

2026-06-25

---

## Descubrimiento

La fragmentación del software en módulos cerrados (como nutrición, ejercicio, música o viajes) es una convención técnica que no se corresponde con la realidad de la persona. El ser humano no vive su día a día a través de compartimentos estancos; vive a través de experiencias. Una comida con amigos, una sesión de entrenamiento al amanecer, una conversación significativa, una caminata por el bosque, la preparación atenta de una receta o el descubrimiento de un nuevo álbum de música son facetas indivisibles de una misma existencia.

El dominio del producto no es la suma de funcionalidades aisladas, sino la vida de la persona como un continuo. En esta visión, la estructura del sistema se organiza de la siguiente manera:
1.  **Las experiencias generan contexto:** Cada suceso cotidiano ocurre en un momento, un entorno y un estado de ánimo específicos.
2.  **El contexto genera conocimiento:** Al relacionar diferentes experiencias cotidianas entre sí, emergen dinámicas y patrones claros.
3.  **El conocimiento genera perspectiva:** El entendimiento profundo de estas relaciones permite al usuario contemplar su bienestar global con claridad y tomar decisiones conscientes.

Las divisiones funcionales solo existen de forma interna para facilitar la captura de diferentes tipologías de vivencias, pero el producto debe ser concebido en torno al dominio unificado de la experiencia humana.

---

## Por qué cambia el producto

El modelado tradicional del dominio en el desarrollo de software tiende a crear estructuras separadas para cada área de interés. Esto provoca que la información quede aislada en bases de datos desconectadas y que sea imposible relacionar, por ejemplo, cómo una experiencia cultural (un concierto) o el descanso influyen en el comportamiento nutricional o el rendimiento físico del día siguiente. Al redefinir el dominio en torno a la noción de "experiencia humana unificada con contexto compartido", permitimos que todos los acontecimientos del usuario se entiendan como parte de un mismo tejido vital.

---

## Consecuencias

*   **Modelo de Dominio Conceptual:** El diseño conceptual debe girar alrededor de un núcleo único que represente una experiencia vital. Las particularidades de una comida, un entrenamiento o un viaje serán atributos o matices que se añaden a esa entidad común, no dominios separados.
*   **Relaciones Orgánicas:** Se facilitará la asociación libre de cualquier acontecimiento con otros (ej. vincular una receta cocinada con el estado de ánimo o una actividad posterior), permitiendo que el contexto fluya sin barreras artificiales.
*   **Evolución del Producto:** La incorporación de nuevas áreas de la vida del usuario (como la lectura o el bienestar mental) no requerirá el diseño de un sistema aislado desde cero, sino simplemente la extensión del tipo de experiencias que la plataforma es capaz de acoger.

---

## Preguntas abiertas

*   ¿Cómo estructuramos conceptualmente una experiencia para que sea lo suficientemente genérica como para abarcar cualquier vivencia humana y, a la vez, lo suficientemente específica como para capturar los detalles relevantes de una ingesta o un entrenamiento?
*   ¿Cómo evitamos que la unificación de experiencias sature al usuario con correlaciones irrelevantes, mostrando solo aquellas conexiones que de verdad aporten perspectiva?

---

## Estado futuro

Este documento podrá:

- consolidarse en Product Manifest;
- consolidarse en Product Discovery;
- consolidarse en ai_context;
- descartarse completamente.
