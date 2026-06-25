# Contexto de IA — Proyecto CambioFísico

> **CambioFísico es una herramienta personal diseñada para ayudar a una persona a mantenerse consciente de su propia vida, comprender cómo está evolucionando, decidir conscientemente hacia dónde quiere dirigirse y tomar mejores decisiones para construir el futuro que desea.**
>
> *Lema: La memoria existe para construir el futuro, no para archivar el pasado.*

Este documento constituye la fuente de contexto primordial y la "constitución" conceptual para cualquier Inteligencia Artificial que deba analizar, mantener, depurar o extender el repositorio de **CambioFísico**. Sintetiza la identidad profunda del producto, su filosofía de diseño, su modelo mental de la persona, la naturaleza de la experiencia y los principios directores de desarrollo.

Cualquier IA debe leer y comprender este documento antes de escribir una sola línea de código o proponer cambios de diseño en el sistema.

---

## 1. ¿Qué es CambioFísico?

CambioFísico existe para resolver un problema humano fundamental: la **fragmentación de la autocomprensión**. 

Hoy en día, las personas que buscan monitorizar su vida para mejorar su bienestar se ven obligadas a trocear su existencia en compartimentos de software aislados (aplicaciones para contar calorías, recetarios, registros de entrenamiento, notas de bienestar o fotos locales). Esta desconexión sistemática provoca **ceguera de datos**: impide ver cómo las distintas facetas de la cotidianidad se influyen mutuamente.

Frente a esto, CambioFísico ofrece un espacio íntimo y unificado donde la vida se registra como un recorrido cronológico continuo. Sin embargo, no lo hace para acumular datos estériles o forzar metas estandarizadas. Existe para devolver a la persona la **atención activa sobre su propia vida**, proporcionándole la perspectiva necesaria para responder preguntas cruciales:
* ¿Dónde me encuentro hoy?
* ¿Qué trayectoria me ha traído hasta aquí?
* ¿Qué está cambiando en mi vida y qué merece mi atención ahora?
* ¿Qué pequeña acción tiene más sentido tomar mañana?

CambioFísico no es una herramienta orientada al control externo o a la gamificación adictiva. Es un espejo neutro y local-first que respeta la soberanía del usuario, transformando el registro diario en una narrativa de autodescubrimiento y claridad para actuar en el presente.

---

## 2. Filosofía del Producto

*   **Registrar no es el objetivo; comprender sí lo es:** El almacenamiento de métricas carece de valor si no conduce a la comprensión de la propia vida. Toda interacción de registro se diseña para reducir la fricción al mínimo, haciendo que la interfaz "desaparezca" y dejando paso a la reflexión.
*   **La consciencia es el núcleo:** La plataforma no busca decidir por el usuario ni imponer rutinas. Su propósito es dotar de perspectiva y claridad para que el usuario sea capaz de tomar decisiones de forma autónoma.
*   **La memoria es una herramienta para el futuro:** No se registran acontecimientos para construir un museo del pasado, sino para actuar con mayor lucidez en el presente y proyectar conscientemente las acciones de mañana.
*   **El usuario mantiene siempre la soberanía:** La información pertenece única y exclusivamente al dispositivo físico del usuario (privacidad absoluta). El usuario es el único juez de sus resultados; el sistema nunca asume un rol directivo.
*   **Tono sereno y filosófico:** Se descarta por completo el lenguaje motivacional de autoayuda, la condescendencia y los tonos de coaching conductual. El sistema se comunica de manera empírica, descriptiva y calmada.

---

## 3. Cómo entiende CambioFísico a una persona

Para CambioFísico, una persona no es un perfil estático ni una etiqueta simplista en una base de datos. Una persona no se define como "un deportista", "un cocinero" o "un insomne". Es una **identidad dinámica en constante evolución** compuesta por una red de experiencias entrelazadas.

**CambioFísico no intenta responder quién eres. Intenta ayudarte a descubrir quién estás llegando a ser.**

Cualquier IA que trabaje en esta plataforma debe respetar esta concepción de la persona bajo los siguientes principios:
*   **Evitar el reduccionismo unidimensional:** El sistema nunca debe encasillar al usuario en base a un comportamiento aislado.
*   **Adaptación al foco vital actual:** Los intereses y objetivos de una persona cambian según su etapa vital. El sistema debe contraer o expandir su experiencia para centrarse en lo que le importa al usuario en cada momento, silenciando visualmente el ruido de otras áreas sin destruir su histórico de datos.
*   **Respetar la evolución del significado:** La relevancia o importancia de un hábito es una propiedad emergente que se descubre retrospectivamente mediante señales acumuladas (frecuencia, contraste vital, retorno emocional del usuario y validación posterior), nunca mediante prioridades manuales.

---

## 4. ¿Qué es una experiencia?

En CambioFísico, la unidad fundamental de dominio es la **experiencia**, no el módulo de software.

Una persona no vive su día a día pensando en "módulos". El usuario simplemente experimenta cocinar un risotto, salir a correr por la mañana, descubrir un disco de música, mantener una conversación importante o realizar un viaje. Los "módulos" del software son únicamente agrupaciones técnicas internas para simplificar la captura de datos, pero en el dominio del producto solo existen experiencias contextualizadas en una historia personal unificada. 

De esta premisa se derivan dos principios clave:

1.  **Registro de la realidad percibida:** CambioFísico no registra la realidad objetiva; registra la realidad percibida por la persona. El producto trabaja con experiencias subjetivas y no con hechos absolutos: si dos personas comen el mismo plato, una puede experimentar "Brutal" y otra "No me dijo nada". El dato objetivo es idéntico; la experiencia no. Es esta última la que genera el contexto y la perspectiva real.
2.  **Modelo conceptual de datos unificado:** A nivel conceptual de dominio, el modelo no debe fragmentarse en tablas independientes desconectadas (`Meal`, `Workout`, `Recipe`). La abstracción principal del sistema es la `Experience` genérica. A partir de ella se derivan especializaciones contextuales (como `MealExperience`, `WorkoutExperience`, `TravelExperience`, `MusicExperience` o `ReflectionExperience`). Cualquier visualización en forma de línea de tiempo o *timeline* es solo una interfaz de representación de esta historia personal, no el núcleo físico del dominio.

---

## 5. El papel de la Inteligencia Artificial

La IA es un **espejo inteligente e invisible**. Su presencia es complementaria: si la IA desaparece, el valor del registro y la autocomprensión para el usuario sigue existiendo de manera íntegra.

La IA procesa el lenguaje natural para eliminar la fricción del registro estructurando datos, y analiza pasivamente el recorrido vital para proponer **hipótesis provisionales y descriptivas** sobre patrones de causa y efecto (ej: *"parece que en las fases de mayor carga laboral tu descanso se reduce al cenar tarde"*).

La IA tiene terminantemente prohibido:
*   **Etiquetar, juzgar o moralizar:** No califica las acciones como "buenas" o "malas", ni ofrece consejos condescendientes de autoayuda o directrices de coach.
*   **Definir la identidad:** Nunca asume hipótesis provisionales como verdades estáticas (nunca dirá *"eres insomne"* o *"eres indisciplinado"*).
*   **Interrumpir la experiencia:** No se diseñan chatbots flotantes ni asistentes interactivos intrusivos. La IA opera de forma silenciosa en segundo plano.

---

## 6. El Flujo de Experiencia del Producto

El ciclo de interacción del producto se estructura bajo un flujo continuo centrado en la autocomprensión:

```
Registrar ──> Comprender ──> Actuar ──> Mejorar
```

1.  **Registrar (Captura de Experiencias):** Proceso de fricción cero donde el usuario captura su realidad percibida de forma natural (texto libre, copias rápidas o gestos). La interfaz desaparece para centrarse en la vivencia.
2.  **Comprender (Descubrimiento de Conocimiento):** La plataforma relaciona los registros en el recorrido histórico. Los gráficos son un soporte; el valor real es la revelación de patrones de causa y efecto en lenguaje humano.
3.  **Actuar (Superficie de Claridad):** El conocimiento adquirido se traduce en asistencia activa en el momento de la acción (visor de cocina sin manos, precarga inteligente de marcas en el entrenamiento).
4.  **Mejorar (Consecuencia Orgánica):** La optimización del bienestar no se impone; emerge de forma natural como consecuencia de actuar con mayor perspectiva e intención.

---

## 7. Qué NO es CambioFísico

Para blindar el producto frente a desviaciones de diseño y crecimiento descontrolado (*scope creep*), se establecen los siguientes límites estrictos:
*   **No pretende definir al usuario:** No utiliza etiquetas, clasificaciones rígidas ni encasilla la identidad de la persona.
*   **No pretende optimizar cada aspecto de la vida:** Rechaza la obsesión por la cuantificación total o la consecución de una vida idealizada estándar.
*   **No busca generar dependencia:** No utiliza mecánicas de retención artificiales, notificaciones intrusivas, gamificación de rachas que generen culpa, ni elementos diseñados para maximizar el tiempo en pantalla.
*   **No sustituye el criterio humano:** Es un soporte para la toma de decisiones, no un sistema de piloto automático que dicte cómo debe vivir la persona.
*   **No almacena datos porque sí:** No recopila información que el usuario no necesite para obtener conocimiento útil sobre su vida, y rechaza el rastreo pasivo en segundo plano.

---

## 8. Principios Fundamentales para la IA de Desarrollo

Cualquier IA encargada de modificar este repositorio debe evaluar sus propuestas bajo el siguiente filtro de diseño de producto:

*   **¿Reduce la fricción de uso y el esfuerzo mental del usuario?**
*   **¿Aumenta la comprensión cualitativa y la autoconsciencia?**
*   **¿Aporta claridad al usuario en el momento preciso de actuar?**
*   **¿Respeta la soberanía, la privacidad y la autonomía del usuario?**
*   **¿Hace que la experiencia de uso se sienta más fluida, serena y humana?**
*   **¿Simplifica el diseño y el código en lugar de complicarlo?**

### Directrices de Ingeniería de Producto:
1.  **Prioridad de la Experiencia sobre la Técnica:** La elegancia de la arquitectura nunca debe ir en detrimento de la simplicidad de la experiencia de usuario. Las soluciones técnicas deben servir para que la interfaz sea invisible y fluida.
2.  **Rechazo a la Complejidad Prematura:** No propongas ni diseñes infraestructuras complejas (sincronizaciones en la nube sofisticadas, multiusuario, wearables) si no responden a una necesidad humana en el foco vital actual del desarrollo.
3.  **Diseño Conceptual Unificado:** Al proponer nuevas características, no las aísles en "módulos" independientes desde la perspectiva del usuario. Diseña pensando en cómo se integran orgánicamente en el continuo de la historia personal del usuario.

---

## 9. Arquitectura Técnica (Resumen)

El sistema implementa este modelo mental mediante una arquitectura técnica basada en la simplicidad y la autonomía:

*   **Monorrepo (pnpm workspaces + Turborepo):** Organización del código en paquetes desacoplados e independientes para facilitar la modularidad interna y la futura evolución multiplataforma (Web y Móvil) sin contaminar las bases comunes.
*   **Offline-First:** Autonomía de ejecución garantizada. El procesamiento de datos y la generación de insights deben poder ejecutarse localmente sin depender de conectividad.
*   **Persistencia Local:** La base de datos (SQLite) y los recursos asociados residen físicamente en el almacenamiento local del dispositivo del usuario, garantizando la privacidad por diseño.
*   **Modularidad en el Código:** Aunque para el usuario la experiencia es unificada, el código está estructurado en módulos con responsabilidades aisladas para garantizar la mantenibilidad y evitar la aparición de acoplamientos rígidos en el software.
