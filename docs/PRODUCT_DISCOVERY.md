# Product Discovery & Domain Design — CambioFísico

Este documento representa la constitución conceptual y de diseño de producto de **CambioFísico**. Define el modelo mental, la segmentación de arquitectura modular, el diseño del dominio y los pilares de la experiencia de usuario (UX) para gobernar el desarrollo a largo plazo.

---

## 1. El Problema Profundo
Los trackers y diarios actuales sufren de **fragmentación existencial y sobrecarga cognitiva**. 

El ser humano no vive en silos. El cansancio de hoy suele estar relacionado con la cena de ayer, la calidad del sueño de anoche y el tipo de entrenamiento de hace dos días. Sin embargo, las herramientas de software actuales obligan al usuario a registrar su vida en múltiples aplicaciones cerradas e independientes: una para contar calorías, otra para rutinas de gimnasio, otra para notas y otra para la salud médica. 

Esto genera:
*   **Fricción de entrada:** Registrar datos se convierte en un trabajo manual de rellenar docenas de campos en múltiples pantallas.
*   **Ceguera de datos:** Al no estar conectados, es imposible cruzar variables para encontrar patrones (ej. cómo influyen ciertos alimentos en la energía del entrenamiento).
*   **Pérdida de soberanía:** La información íntima y los datos de salud se almacenan en servidores en la nube de corporaciones que monetizan o exponen la privacidad del usuario.

CambioFísico resuelve la **fragmentación del bienestar mediante un silo de datos unificado, local y modular**.

---

## 2. Propuesta de Valor
¿Por qué elegir CambioFísico frente a las alternativas del mercado?

| Competidor | Limitación Técnica / UX | Valor Diferencial de CambioFísico |
| :--- | :--- | :--- |
| **MyFitnessPal** | Modelo cerrado, anuncios, muros de pago para leer código de barras, requiere conexión constante y almacena datos en la nube. | 100% privado, local, offline, sin anuncios, centrado en autocomprensión y no en la restricción calórica obsesiva. |
| **Notion** | Lienzo en blanco con alta fricción de configuración. App móvil pesada y con pésimo rendimiento offline. | Interfaz nativa ultra-rápida, optimizada para móviles, con autocompletados inteligentes y gráficas integradas out-of-the-box. |
| **Google Keep** | Notas de texto libre sin estructura, sin base de datos relacional, sin visualizaciones de datos y sin correlaciones. | Estructura el texto libre semánticamente gracias a la IA y hashtags relacionales sin perder la agilidad de la escritura libre. |
| **Apple/Samsung Health** | Jardines cerrados. Dificultad extrema para registrar comidas detalladas, recetas y notas subjetivas libres. | Plataforma abierta, exportable a CSV/JSON con un clic, que combina métricas biométricas con descripciones narrativas. |
| **Apps de Gym/Recetas** | Herramientas de un solo propósito. No permiten correlacionar el descanso con el rendimiento ni las recetas con el historial. | Plataforma modular. El entrenamiento, las comidas y el descanso conviven en la misma línea temporal. |

---

## 3. Product Vision
> "Empoderar la autocomprensión humana mediante un diario de vida unificado, modular e inteligente, que transforma la fricción del registro diario en una experiencia interactiva de descubrimiento y mejora continua de la salud física y mental."

---

## 4. Product Principles
1.  **Resolver problemas reales primero:** No se añadirá ninguna característica de software a menos que responda a una necesidad real documentada del usuario.
2.  **Offline-First absoluto:** La aplicación local es el sistema de producción primario. La red y la nube son canales de transporte secundarios y opcionales.
3.  **Modularidad estricta:** La plataforma está dividida en un núcleo de capacidades estables y módulos funcionales intercambiables. Ningún módulo debe conocer los detalles internos de otro.
4.  **Minimizar la fricción (Escribir en lugar de Rellenar):** Preferir el autocompletado y el procesado semántico inteligente (como hashtags o parsing de lenguaje natural) antes que obligar al usuario a rellenar largos formularios con decenas de inputs.
5.  **Privacidad extrema por diseño:** Los datos sensibles del usuario (peso, fotos corporales, notas íntimas) pertenecen exclusivamente a su almacenamiento físico local.
6.  **IA contextual, no invasiva:** La IA actúa como un procesador de contexto silencioso en segundo plano para extraer correlaciones, nunca como un chatbot flotante e intrusivo.
7.  **UX sensorial y estética:** El diseño visual no es cosmético; es un requisito funcional. Una interfaz bella, fluida y con micro-interacciones interactivas motiva la consistencia del registro.
8.  **Datos accionables antes que abundantes:** Evitar el síndrome del "diógenes digital". El objetivo es mostrar conclusiones útiles para tomar decisiones de vida, no acumular métricas irrelevantes.

---

## 5. User Personas

### Persona 1: Alberto (El Creador/Usuario Inicial)
*   **Perfil:** Profesional técnico, entusiasta de la recomposición física y la cocina saludable.
*   **Necesidades:** Registrar diariamente peso corporal, horas de sueño y notas de entrenamiento de fuerza de forma rápida. Quiere enlazar comidas a recetas en Markdown y visualizar gráficas de tendencias sin que sus fotos de progreso físico viajen a servidores externos.
*   **Frustraciones:** Apps de gimnasio lentas que se cuelgan en sótanos sin cobertura, y la fragmentación entre el recetario y el registro de peso.

### Persona 2: Elena (La Optimizadora de Hábitos)
*   **Perfil:** Profesional que busca mejorar su consistencia de hábitos diarios, salud digestiva y bienestar general.
*   **Necesidades:** Un sistema simple que le permita registrar métricas de hinchazón, estado de ánimo y energía diaria. Busca correlacionar si su fatiga se debe a falta de sueño o a comidas específicas, con sugerencias inteligentes.
*   **Frustraciones:** Formularios intrusivos que le exigen contar calorías al gramo en lugar de registrar cualitativamente qué ha comido.

### Persona 3: Dr. Mateo (El Profesional de la Salud)
*   **Perfil:** Fisioterapeuta o Nutricionista deportivo.
*   **Necesidades:** Consultar de forma estructurada e histórica la evolución física, digestiva y de actividad de sus clientes sin comprometer la privacidad de sus datos y sin lidiar con formatos ilegibles.
*   **Frustraciones:** Clientes que olvidan registrar sus días o envían capturas de pantalla caóticas de múltiples aplicaciones de fitness.

---

## 6. User Journey (Evolución de Experiencia)

*   **Día 1 (Atracción y Simplicidad):** El usuario arranca la aplicación. Su base de datos local se inicializa al instante. Rellena su primera tarjeta diaria y experimenta el resaltado de hashtags (#) en comidas. Descubre que el recetario abre de inmediato. Fricción cero.
*   **Semana 1 (Consistencia y Primer feedback):** La racha de días consecutivos se incrementa visualmente en la barra lateral. Empiezan a dibujarse las tendencias de peso y sueño en el Dashboard. El autocompletado inteligente empieza a sugerir términos personalizados (ej: disciplinas de deporte o ingredientes comunes) basados en su historial local.
*   **Mes 1 (Revelación y Descubrimiento):** El motor de análisis cruza suficientes variables históricas y genera los primeros *Insights* (ej: *"Los días que entrenas Calistenia después de dormir menos de 6 horas, tu estado de ánimo promedio decae a 2/5"*). Las gráficas narran historias de su vida.
*   **Año 1 (Plataforma de Vida):** El usuario ha cumplido sus metas físicas iniciales. En lugar de abandonar la app, activa nuevos módulos funcionales (ej. *Productividad* o *Viajes*) integrando de forma natural su diario de recomposición física con otros aspectos de su vida bajo la misma interfaz.

---

## 7. Core de la Plataforma
El **Core** es el núcleo inmutable del sistema que provee los cimientos operativos de la aplicación. Ninguna lógica de un módulo específico (como recetas o entrenamientos) debe vivir en el Core.

El Core está compuesto exclusivamente por:
1.  **Motor del Timeline:** El gestor de la línea temporal cronológica y secuencial.
2.  **Abstracción de Almacenamiento Local (Local Storage Wrapper):** Acceso asíncrono y tipado a la base de datos (Prisma con SQLite).
3.  **Registro de Módulos (Module Registry):** El bus de eventos y orquestador que permite a los módulos registrar sus rutas, inputs en el formulario y hooks de renderizado.
4.  **Sistema de Diseño y UI Atómica (Design System):** Layout base de la aplicación y componentes visuales reutilizables.
5.  **Procesador de Contexto IA (AI Context Engine):** Agregador de registros del Timeline que genera la estructura JSON óptima para alimentar a modelos de lenguaje (LLM).

---

## 8. Capacidades Reutilizables
Las **Capacidades** son utilidades técnicas horizontales provistas por el Core que los diferentes módulos consumen mediante contratos estrictos:

```
+-----------------------------------------------------------------------------------+
|                                 FEATURE MODULES                                   |
|       [Nutrition]       [Recipes]       [Fitness]       [Travel]       [Habits]   |
+-----------------------------------------------------------------------------------+
|                                CORE CAPABILITIES                                  |
|   [Identity]   [Timeline]   [Collections]   [Metrics]   [Media]   [Insights]      |
|   [AI Context] [Search]     [Automation]    [Notifications]                       |
+-----------------------------------------------------------------------------------+
|                                   CORE PLATFORM                                   |
|               [Module Registry]  -  [Prisma SQLite]  -  [UI Layout]               |
+-----------------------------------------------------------------------------------+
```

*   **Identity:** Gestión de perfiles locales, preferencias de unidades (kg, cm) e identificadores de inquilinos (tenant IDs) para el futuro multiusuario.
*   **Timeline:** Capacidad para inyectar tarjetas cronológicas y ordenar sucesos en el feed temporal principal.
*   **Collections:** Creación de carpetas, carpetas inteligentes, carpetas asociadas y agrupaciones de elementos (ej: agrupaciones de ejercicios, recetas favoritas, maletas de viaje).
*   **Metrics:** Procesamiento de cálculos matemáticos locales (promedios, máximos, mínimos, diferencias y cálculo de rachas de consistencia).
*   **Media:** Subida, optimización y borrado de recursos físicos locales (imágenes, audios de notas, documentos).
*   **Insights:** Motor de reglas que cruza métricas temporales para deducir patrones y correlaciones.
*   **Recommendations:** Interfaz para mostrar sugerencias inteligentes y consejos contextuales.
*   **Automation:** Automatización de copias de seguridad de datos e importación de ficheros en segundo plano.
*   **AI Context:** Serializador que convierte registros complejos en un payload estructurado para inyectar contexto a la IA de forma óptima.
*   **Notifications:** Sistema local de alarmas, recordatorios de hábitos y registro de tokens push.
*   **Search:** Motor de búsqueda indexada de texto completo sobre notas, títulos, recetas y tags.

---

## 9. Módulos de Producto
Los **Módulos** encapsulan lógica específica del dominio y consumen las capacidades del Core:

*   **Nutrition:** Consume *Timeline* para registrar ingestas, *Metrics* para promedios de calorías/macronutrientes, e *Identity* para determinar las metas diarias del usuario.
*   **Recipes:** Consume *Collections* para clasificar recetas en tags, *Search* para el buscador, e inyecta autocompletados al input de *Nutrition* a través del *Module Registry*.
*   **Fitness:** Consume *Timeline* para inyectar entrenamientos realizados, e *Identity* para guardar las sugerencias de ejercicios favoritas del usuario.
*   **Travel (Futuro):** Consume *Timeline* para registrar el itinerario de viaje del día, *Media* para guardar fotos del viaje y *Collections* para crear listas de equipaje.
*   **Habits (Futuro):** Consume *Metrics* para registrar la racha y consistencia de hábitos (ej. beber agua, meditar) e inyecta recordatorios a *Notifications*.
*   **Learning (Futuro):** Consume *Collections* para archivar notas de libros o cursos y *Timeline* para registrar las horas dedicadas al estudio.

---

## 10. Diseño del Dominio (DDD)

Para garantizar un acoplamiento débil entre dominios, CambioFísico se estructura bajo cuatro **Contextos Acotados (Bounded Contexts)** bien delimitados:

```
+---------------------------------------------------------------------+
|                      CORE BOUNDED CONTEXT                           |
|  [User] (Aggregate Root) -> [Profile] (Entity)                      |
|  [Entry] (Aggregate Root) -> [Wellbeing] (Value Object)             |
+---------------------------------------------------------------------+
        │                                             │
        ▼ (Consume Timeline Events)                   ▼ (Hashtag Auto-complete)
+-------------------------------+             +-------------------------------+
|    FITNESS BOUNDED CONTEXT    |             |   NUTRITION BOUNDED CONTEXT   |
|  [Workout] (Aggregate Root)   |             |  [Meal] (Aggregate Root)      |
|  [Exercise] (Entity)          |             |  [Recipe] (Aggregate Root)    |
|  [LoadSet] (Value Object)     |             |  [Ingredient] (Entity)        |
+-------------------------------+             +-------------------------------+
                                                      │
                                                      ▼ (Backups & DB Sync)
                                              +-------------------------------+
                                              |    SYNC BOUNDED CONTEXT       |
                                              |  [SyncSession] (Agg Root)     |
                                              |  [MutationLog] (Entity)       |
                                              +-------------------------------+
```

### Agregados y Entidades Clave

#### Bounded Context: Core
*   **User (Aggregate Root):** Identificación única (UUID). Contiene el `Profile` (altura, fecha de nacimiento, peso inicial) y la entidad `Goal` (meta de peso, fecha objetivo).
*   **Entry (Aggregate Root):** La raíz del registro diario.
    *   *Date (Value Object):* Fecha en formato YYYY-MM-DD (única).
    *   *Wellbeing (Value Object):* Ratings de hinchazón, energía, estado de ánimo y hambre (valores enteros de 1 a 5).
    *   *Sleep (Value Object):* Horas y calidad del descanso.
    *   *Notes (Value Object):* Texto libre.
    *   *ProgressPhoto (Entity):* UUID, ruta del archivo de imagen y marca temporal.

#### Bounded Context: Nutrition & Recipes
*   **Meal (Aggregate Root):** Registro de ingestas nutricionales asociado a una `Entry` (UUID). Contiene entidades de tipo `FoodPortion` y enlaces de tipo `RecipeSlug`.
*   **Recipe (Aggregate Root):** Recetas culinarias independientes.
    *   *RecipeSlug (Value Object):* Identificador único en formato kebab-case (ej. `risotto-de-setas`).
    *   *Content (Value Object):* Cuerpo en Markdown.
    *   *Ingredient (Entity):* Nombre, cantidad y macros estimadas.

#### Bounded Context: Fitness
*   **Workout (Aggregate Root):** Sesión de entrenamiento físico vinculada a una `Entry`.
    *   *WorkoutType (Value Object):* Tipo (Gimnasio, Cardio, Caminata).
    *   *WorkoutSet (Entity):* Ejercicio realizado, series, repeticiones e intensidad (RPE / Kg).

---

## 11. UX Vision (Experiencias vs Formularios)
El diseño interactivo de CambioFísico debe evitar que el registro se sienta como rellenar un formulario administrativo de bases de datos. Debe ser una **experiencia interactiva**:

### A. Cocinar Acompañado (Módulo de Recetas)
La lectura de recetas debe abandonar el scroll aburrido de PDFs:
*   **Modo Cocina Activo:** Una interfaz a pantalla completa y tipografía grande optimizada para tablets y móviles en la encimera.
*   **Interacción sin Manos:** Detección de gestos a través de la cámara frontal (deslizar la mano en el aire) o comandos de voz simples (*"siguiente paso"*) para avanzar en la receta sin ensuciar la pantalla con dedos grasientos.
*   **Temporizadores contextuales:** Al lado de frases como *"dejar reposar 15 minutos"*, el sistema muestra un badge interactivo que, al tocarlo, inicia un cronómetro visual directamente en la app.

### B. El Entrenador Silencioso (Módulo Fitness)
El registro de series y repeticiones no debe exigir atención constante:
*   **Inputs Táctiles de un Toque:** Uso de gestos deslizantes (swipes) para marcar una serie como completada o para copiar las repeticiones y peso de la serie anterior en un milisegundo.
*   **Cronómetro de Descanso Háptico:** Al completar una serie, el móvil vibra sutilmente tras cumplirse el tiempo de descanso recomendado, avisando al usuario sin emitir alarmas estridentes.

### C. Estadísticas que Narran Historias (Módulo Metrics)
Las gráficas no deben limitarse a pintar líneas frías:
*   **Evolución Narrativa:** El Dashboard correlaciona datos de forma escrita sobre la propia gráfica. Al pulsar un pico de peso o un valle de energía, la app superpone una tarjeta descriptiva:
    > *"En este día registraste tu peso máximo de la semana (78 kg). Coincidió con una cena muy abundante (#risotto-de-queso), alta hinchazón subjetiva (4/5) y solo 5 horas de sueño."*
*   **Evolución Visual Paralela:** Al deslizar el dedo por la gráfica de peso, se muestra en miniatura la foto de progreso correspondiente a cada fecha, permitiendo contrastar el peso en la báscula con la realidad visual de la recomposición corporal en tiempo real.

### D. IA como Compañero Silencioso (Módulo AI Context)
La IA no debe ser un agente invasivo de asistencia técnica:
*   **Procesamiento Semántico Invisible:** El usuario describe su comida en una sola línea textual (ej: *"Un café con leche y una tostada con aguacate y huevo poached"*). La IA procesa y estructura la información en segundo plano asignando los tags e ingredientes en su respectiva sección sin requerir que el usuario busque y elija cada ingrediente de una lista.

---

## 12. Roadmap de Producto (Gobernado por Necesidades)

```
Fase 0 (Actual) ➔ Fase 1: Multiplataforma ➔ Fase 2: Modularidad ➔ Fase 3: Multi-tenant
```

1.  **Fase 0: Core Stabilization (Fase Actual):** Estabilizar la estructura local. Estandarizar la documentación de arquitectura, el manifiesto y el diseño del dominio. Asegurar que el timeline y las recetas operan perfectamente sin internet.
2.  **Fase 1: Multiplataforma & Prisma Local:** Reestructurar a monorepo (Vite Web + Expo Mobile). Migrar el backend a NestJS de forma incremental. Reemplazar SQL nativo por Prisma Client con SQLite local. *Objetivo: Ejecutar la app en Android y Web de forma síncrona en local sin levantar contenedores.*
3.  **Fase 2: Desacoplamiento Modular y Contratos:** Mover tipos TypeScript y validadores a `packages/shared`. Separar las interfaces visuales a `packages/ui` atómico. Integrar la capacidad de *Module Registry* para habilitar la inclusión modular de *Nutrition*, *Recipes* y *Fitness* sobre el Core.
4.  **Fase 3: Multi-tenant & PostgreSQL:** Implementar autenticación JWT. Migrar SQLite a PostgreSQL y activar la sincronización cloud basada en colas de mutaciones locales (*Last-Write-Wins*). *Objetivo: Permitir múltiples usuarios con sincronización multidispositivo.*

---

## 13. Riesgos

*   **Riesgo de Acoplamiento Prematuro (Arquitectura):** Que los módulos iniciales (como `recipes` y `nutrition`) compartan tablas de base de datos de forma directa en lugar de interactuar mediante contratos de API y claves foráneas. *Mitigación: Revisiones estrictas en el esquema Prisma para asegurar límites de agregados.*
*   **Fricción de Adopción (UX):** Que la interfaz local-first resulte compleja de entender al carecer de un servidor en la nube en las fases iniciales. *Mitigación: Añadir explicaciones claras y visuales sobre dónde se almacenan físicamente las fotos y los datos del usuario.*
*   **Riesgo de Rendimiento (SQLite):** Que una base de datos local SQLite con cientos de fotos referenciadas y registros diarios ralentice las lecturas en la app móvil. *Mitigación: Indexación correcta de fechas y compresión agresiva de imágenes a formato WebP de forma local en la subida.*

---

## 14. Oportunidades
*   **Modelos de Lenguaje Locales (Local LLMs):** El uso de WebGPU y librerías como ONNX Runtime Web permiten ejecutar modelos pequeños de lenguaje (como Phi-3 o Gemma-2B) **100% en local dentro del navegador o de la app móvil**. Esto permitiría procesar descripciones semánticas de comidas y ofrecer insights de salud de forma inteligente **sin enviar un solo byte de información fuera de la máquina del usuario**, blindando la privacidad absoluta de por vida.

---

## 15. MVP que Enamora (Delightful MVP)
Para validar el producto con un nivel de calidad sobresaliente, el MVP constará únicamente de:
1.  **El Timeline de Vida (Core):** Una vista cronológica limpia y fluida (scroll infinito con HMR) donde se muestra una tarjeta diaria consolidando el peso, el descanso, los ratings de bienestar y notas del día.
2.  **El Resaltador Inteligente de Nutrición (UX):** El input de texto superpuesto en comidas que autocompleta sugerencias e identifica visualmente recetas de la base de datos tiñéndolas de verde esmeralda y comidas del historial en gris.
3.  **El Visor de Recetas en Cocina (UX):** Una pantalla de lectura limpia, de alto contraste y letras grandes, optimizada para tablets, con checklists interactivos para ingredientes y temporizadores integrados de un toque.
4.  **Evolución Narrativa (Dashboard):** Gráfica de peso y bienestar que correlaciona de forma escrita los picos de peso con los comentarios de notas del Timeline.
