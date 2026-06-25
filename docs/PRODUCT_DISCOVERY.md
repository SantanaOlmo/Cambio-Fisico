# Product Discovery & Domain Design — CambioFísico

Este documento representa la constitución conceptual y la definición de producto de **CambioFísico**. Ha sido redactado y evaluado colectivamente por nuestro equipo interdisciplinar (**Product Manager, Staff Product Engineer, Software Architect, UX Designer y Domain Expert**) para guiar las decisiones de producto, arquitectura y UX a largo plazo.

---

## 1. El Problema Profundo: La Fragmentación de la Existencia Personal

El bienestar humano no se produce en silos aislados. La fatiga que sentimos un martes por la tarde suele ser el resultado directo de la cena del domingo, el nivel de hidratación del lunes, la calidad de sueño de anoche y el tipo de entrenamiento de fuerza realizado hace 24 horas. Sin embargo, el software actual nos obliga a trocear nuestra vida en cajones cerrados:
*   Una aplicación para contar calorías (MyFitnessPal).
*   Un bloc de notas o plantillas para recetas (Notion / Google Keep).
*   Una app para registrar series en el gimnasio.
*   Una aplicación nativa de salud para registrar el peso (Apple/Samsung Health).
*   Archivos locales en carpetas para guardar fotos de progreso.

Esta fragmentación sistemática genera tres problemas profundos:
1.  **Ceguera de datos (Falta de Correlación):** Al estar la información dispersa, es técnicamente imposible que el usuario descubra los patrones que realmente afectan su energía, digestión o rendimiento físico.
2.  **Fatiga por registro (Formulario-Centrismo):** Rellenar decenas de inputs en interfaces frías e impersonales se siente como un trabajo administrativo de entrada de datos, lo que provoca tasas de abandono superiores al 80% al cabo de pocas semanas.
3.  **Vulneración de la soberanía íntima:** Los datos más privados (peso, fotos corporales en ropa interior, anotaciones sobre salud mental) son almacenados en la nube por corporaciones que los monetizan o los exponen a brechas de seguridad.

CambioFísico nace para resolver la **fragmentación de la autocomprensión mediante un silo de datos unificado, local-first y modular**, transformando el registro diario en una experiencia placentera de descubrimiento.

---

## 2. Propuesta de Valor y Diferenciación

Para que CambioFísico sea un producto de éxito y no una herramienta genérica, debe posicionarse con claridad frente a las alternativas del mercado:

| Alternativa | Limitación de Producto / UX | Diferenciador Crítico de CambioFísico |
| :--- | :--- | :--- |
| **Notion** | Lienzo en blanco con alta fricción de configuración. App móvil lenta, pesada y con un soporte offline deficiente. | Interfaz nativa ultra-rápida, optimizada para móviles, con autocompletados basados en el historial local y sin configuración requerida. |
| **MyFitnessPal** | Modelo freemium agresivo, anuncios invasivos, muros de pago para funciones básicas (como escanear códigos de barras) y foco obsesivo en la restricción. | 100% privado, local, sin anuncios, sin suscripciones obligatorias y centrado en la autocomprensión cualitativa y el bienestar general. |
| **Google Keep** | Notas de texto libre sin estructura, sin relaciones entre datos, sin analíticas y sin posibilidad de evolución. | Permite escribir en texto libre pero procesa semánticamente la información (hashtags relacionales e IA local) para estructurar datos de forma transparente. |
| **Apple / Samsung Health** | Jardines cerrados centrados en métricas pasivas (sensores, pasos). Pésima interfaz para recetas, notas subjetivas y entrenamientos de fuerza. | Silo híbrido que unifica métricas biométricas pasivas con logs cualitativos profundos (recetas, entrenamientos, estado mental y digestión). |
| **Apps de Gimnasio** | Orientadas únicamente al cronómetro y al registro de marcas. No se comunican con tu alimentación ni con tu nivel de estrés o descanso. | Los entrenamientos conviven en una línea temporal unificada. El rendimiento se analiza en relación directa con el descanso y la nutrición. |

---

## 3. Product Vision

> "Devolver al ser humano la soberanía sobre sus datos de bienestar mediante una plataforma personal unificada, local-first y modular, que elimina la fricción de registrar la vida cotidiana y la convierte en una narrativa de autodescubrimiento, salud integral y mejora continua."

---

## 4. Product Principles

1.  **Resolver Problemas Reales Primero:** Ninguna funcionalidad debe diseñarse o implementarse a menos que resuelva un problema real de registro, visualización o comprensión de datos del usuario.
2.  **Soberanía de Datos y Privacidad por Defecto:** Los datos biométricos, fotos y notas pertenecen única y exclusivamente al dispositivo físico del usuario. La nube es un canal opcional de backup cifrado de extremo a extremo, nunca un requisito para operar.
3.  **Offline-First como Mandato Técnico:** La aplicación debe ser 100% funcional en sótanos de gimnasio, aviones o zonas de montaña sin cobertura. Toda escritura se realiza de forma local e instantánea.
4.  **Escribir en lugar de Rellenar (Fricción Cero):** El usuario debe poder registrar su día escribiendo una o dos frases libres. El sistema se encarga de extraer la estructura mediante procesamiento semántico.
5.  **Modularidad Dinámica:** El núcleo de la aplicación (Core) es ligero y agnóstico al dominio. Los módulos (Nutrición, Gimnasio, Hábitos) son consumidores de capacidades comunes y se pueden activar o desactivar a voluntad sin comprometer el sistema.
6.  **UX Sensorial e Inmersiva:** La estética, las micro-interacciones, los efectos táctiles y la fluidez visual son características de producto prioritarias. Si la aplicación es hermosa y reactiva, el hábito de registro se refuerza de forma natural.
7.  **Estadísticas Narrativas:** Las visualizaciones de datos no son simples colecciones de gráficos de líneas fríos. Deben contar historias, correlacionar eventos y ofrecer explicaciones en lenguaje humano.
8.  **IA como Acompañante Contextual Silencioso:** Rechazamos los chatbots intrusivos flotando en pantalla. La IA procesa información en segundo plano y ofrece insights en momentos clave del flujo de usuario.

---

## 5. User Personas

### Persona 1: Alberto (El Creador y Usuario Foco)
*   **Perfil:** Profesional del desarrollo de software, apasionado de la recomposición física, el entrenamiento de fuerza y la cocina.
*   **Necesidades:** Registrar peso diario, calorías estimadas basadas en recetas personalizadas y progresión de cargas en el gimnasio. Exige velocidad extrema (sin pantallas de carga) y control absoluto de sus datos personales.
*   **Frustraciones:** Apps móviles que requieren conexión en el gimnasio (donde no hay cobertura), y tener que duplicar información en Notion (para sus recetas) y en otra app para sus entrenamientos.

### Persona 2: Elena (La Optimizadora de Hábitos y Bienestar)
*   **Perfil:** Profesional que experimenta fatiga crónica, problemas digestivos e inconsistencia en sus hábitos de sueño.
*   **Necesidades:** Registrar métricas cualitativas rápidas (nivel de energía, hinchazón abdominal, calidad de sueño, estado de ánimo) y correlacionar cómo afectan ciertos alimentos a su descanso o digestión. No quiere contar calorías de forma obsesiva.
*   **Frustraciones:** Sentir que las aplicaciones de salud la juzgan si no cumple objetivos cuantitativos exactos, y la falta de correlación entre lo que come y cómo se siente al día siguiente.

### Persona 3: Dr. Mateo (El Profesional de la Salud)
*   **Perfil:** Fisioterapeuta o asesor nutricional que trabaja de manera estrecha con sus clientes.
*   **Necesidades:** Analizar la evolución y consistencia de sus clientes de forma estructurada sin invadir su privacidad y sin depender de volcados caóticos de múltiples capturas de pantalla de WhatsApp.
*   **Frustraciones:** La resistencia de los pacientes a registrar datos debido a interfaces complejas, y la dificultad para exportar e integrar datos biométricos de manera limpia y profesional.

---

## 6. User Journey (Evolución de la Experiencia)

*   **Día 1 (Fricción Cero e Impacto Visual):** El usuario abre la app. No se le solicita crear una cuenta ni rellenar sus datos en la nube. La base de datos local se inicializa en 100ms. Escribe su primer log diario y utiliza `#café` o `#risotto-de-setas` en el campo de comidas. Experimenta la magia del resaltado visual instantáneo en verde de los hashtags de recetas y en gris de los de historial libre. El recetario se abre al instante en la misma aplicación.
*   **Semana 1 (Consistencia de Registro):** El usuario empieza a ver sus rachas en la barra lateral. Las sugerencias de autocompletado aprenden de sus propios registros locales. No necesita escribir toda la palabra; basta con teclear dos letras para registrar sus comidas o tipos de ejercicio del historial. La app se vuelve más rápida para él a medida que la usa.
*   **Mes 1 (Revelación de Patrones):** El motor de análisis cruza suficientes variables para presentar los primeros *Insights* contextuales e interactivos: *"Elena, hemos detectado que las cenas que contienen #queso o que se registran pasadas las 22:00 coinciden con un aumento de hinchazón (4/5) y un sueño fragmentado al día siguiente. Considera cenar 1 hora antes hoy"*.
*   **Año 1 (Plataforma de Vida):** El usuario ha integrado la app en su rutina de salud. Sus necesidades evolucionan; ahora quiere registrar sus lecturas de libros y organizar sus maletas de viaje. En lugar de descargar nuevas aplicaciones, simplemente activa el módulo de *Learning* o *Travel* desde la configuración. La interfaz se expande armónicamente utilizando la misma base de datos, timeline y capacidades de búsqueda.

---

## 7. Core de la Plataforma vs Módulos

El **Core** es el núcleo inmutable del sistema que provee la infraestructura operativa común. **Bajo ninguna circunstancia un módulo específico (como Nutrición o Fitness) debe contaminar el Core con su lógica de negocio o tablas de datos.**

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

### Componentes del Core
1.  **Module Registry (Orquestador de Módulos):** Registro dinámico donde cada módulo declara sus rutas, sus hooks de interfaz (p.ej., añadir una pestaña al menú principal o una sección al formulario diario) y sus esquemas de datos.
2.  **Generic Event Timeline Ledger (Libro Diario de Eventos):** Una estructura de datos genérica indexada por fecha y hora que almacena "eventos". Cada evento tiene un tipo, un payload JSON y referencias multimedia. El Timeline no sabe qué es una "serie de banca" o una "receta de risotto"; solo renderiza y organiza bloques de eventos que los módulos le inyectan.
3.  **Local Storage Wrapper (Persistencia Local):** Abstracción asíncrona y tipada sobre Prisma SQLite que garantiza transacciones seguras y optimización de base de datos.
4.  **UI Design System (Patrones de Interfaz):** Tokens de diseño (colores, espaciados, tipografías), layouts responsivos y componentes web atómicos (inputs, modales, toasts).

---

## 8. Capacidades Reutilizables

Las **Capacidades** son interfaces y servicios horizontales del Core que los módulos consumen de forma estricta:

*   **Identity:** Manejo de perfiles de usuario locales, configuración de preferencias de visualización (unidades de peso, altura, formato de fecha) y gestión de identificadores de tenant locales.
*   **Timeline:** Capacidad para inyectar, editar y borrar hitos temporales en el feed cronológico central del usuario.
*   **Collections:** Motor de organización jerárquica y carpetas inteligentes (tags, agrupaciones de recetas, rutinas favoritas, checklists).
*   **Metrics:** Motor matemático local para calcular medias móviles (ej: promedio de peso de 7 días), máximos históricos (1RM en press banca), consistencia de hábitos y rachas.
*   **Media:** Gestor local para la subida, compresión agresiva (conversión automática a WebP en el cliente) y borrado físico de fotos de progreso y notas de voz.
*   **Insights:** Procesador de reglas de correlación que cruza variables temporales buscando dependencias estadísticas (ej: sueño vs estado de ánimo).
*   **Recommendations:** Interfaz estandarizada para desplegar consejos de salud interactivos basados en los datos del usuario.
*   **Automation:** Tareas automáticas en segundo plano (p.ej. copias de seguridad incrementales automáticas a las 3:00 AM, exportaciones programadas en JSON).
*   **AI Context Builder:** Serializador de datos que compila el historial del timeline del usuario y lo estructura en un formato JSON optimizado para inyectar como contexto a un LLM local o remoto, anonimizando la información crítica.
*   **Notifications:** Programador de alertas locales, alarmas hápticas para tiempos de descanso y notificaciones del sistema.
*   **Search:** Motor de búsqueda indexado local (Full-Text Search) que permite consultar instantáneamente notas libres, recetas, nombres de ejercicios o tags.

---

## 9. Módulos de Producto y su Interacción con el Core

Los módulos encapsulan el comportamiento específico de cada dominio consumiendo exclusivamente las capacidades del Core a través de contratos estrictos de API local:

*   **Nutrition:** Consume *Timeline* para registrar ingestas en una fecha dada, *Metrics* para promedios de consumo de macronutrientes, e interactúa con el módulo de *Recipes* para resolver ingredientes y macros.
*   **Recipes:** Consume *Collections* para clasificar recetas por tags (p.ej: `#desayuno`, `#alto-en-proteina`), *Search* para indexar el recetario, e inyecta sugerencias de autocompletado en el input de *Nutrition* a través del *Module Registry*.
*   **Fitness:** Consume *Timeline* para registrar sesiones de entrenamiento de fuerza o cardio, e interactúa con *Metrics* para analizar la progresión del volumen de carga (tonelaje acumulado por grupo muscular).
*   **Habits (Futuro):** Consume *Metrics* para analizar rachas de consistencia e interactúa con *Notifications* para programar alertas locales de hidratación o desconexión digital.
*   **Travel (Futuro):** Consume *Timeline* para ordenar el itinerario de viaje, *Media* para asociar fotos a ubicaciones y *Collections* para gestionar listas de equipaje.
*   **Music (Futuro):** Consume *Timeline* para registrar la música escuchada durante el día y permite correlacionar el ritmo promedio (BPM) con el rendimiento de entrenamiento registrado por el módulo *Fitness*.
*   **Learning (Futuro):** Consume *Collections* para estructurar apuntes en formato Markdown y *Timeline* para llevar una bitácora del tiempo invertido en cada materia.
*   **Projects (Futuro):** Consume *Collections* para almacenar listas de tareas y *Timeline* para registrar hitos de entrega.

---

## 10. Diseño del Dominio Conceptual (DDD)

Para garantizar un acoplamiento débil que permita la modularidad, CambioFísico se estructura bajo cuatro **Contextos Acotados (Bounded Contexts)**. Los contextos se comunican mediante Value Objects e identificadores de referencia (`UUID`), nunca mediante accesos directos a base de datos cruzados.

```
+---------------------------------------------------------------------+
|                      CORE BOUNDED CONTEXT                           |
|  [User] (Aggregate Root) -> [Profile] (Entity)                      |
|  [TimelineEntry] (Aggregate Root) -> [Wellbeing] (Value Object)     |
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

### Agregados y Entidades

#### 1. Core Bounded Context
*   **User (Aggregate Root):** Identificación única (`UserID`). Gobierna el `Profile` (altura, fecha de nacimiento, sexo biológico, preferencias métricas) y la meta de peso (`WeightGoal`).
*   **TimelineEntry (Aggregate Root):** La raíz del registro diario. Representa un día de la vida del usuario.
    *   *Date (Value Object):* Clave única (formato `YYYY-MM-DD`).
    *   *Wellbeing (Value Object):* Valores subjetivos (1-5) de energía, estado de ánimo, hinchazón y hambre.
    *   *Sleep (Value Object):* Horas totales y calidad percibida del sueño.
    *   *ProgressPhoto (Entity):* `PhotoID`, ruta de archivo local y marca temporal.
    *   *Notes (Value Object):* Texto libre del día.

#### 2. Nutrition & Recipes Bounded Context
*   **Meal (Aggregate Root):** Registro de alimentos consumidos en una fecha determinada. Está vinculada a un `TimelineEntryID`.
    *   *MealType (Value Object):* Desayuno, Almuerzo, Cena, Snack.
    *   *FoodPortion (Entity):* Alimento registrado, cantidad en gramos u porciones.
    *   *RecipeRef (Value Object):* Enlace opcional a una receta (`RecipeSlug`).
*   **Recipe (Aggregate Root):** Receta de cocina guardada.
    *   *RecipeSlug (Value Object):* Clave única en formato kebab-case (ej. `risotto-de-setas`).
    *   *RecipeName (Value Object):* Nombre legible.
    *   *MarkdownContent (Value Object):* Texto con las instrucciones y formato.
    *   *Ingredient (Entity):* Nombre, cantidad sugerida e información nutricional.

#### 3. Fitness Bounded Context
*   **Workout (Aggregate Root):** Sesión de entrenamiento físico vinculada a una fecha (`TimelineEntryID`).
    *   *WorkoutType (Value Object):* Fuerza, Cardio, Flexibilidad.
    *   *Exercise (Entity):* Ejercicio específico (ej. "Press de Banca") con su historial e instrucciones de ejecución.
    *   *LoadSet (Value Object):* Datos de la serie realizada: número de serie, peso (kg), repeticiones y nivel de esfuerzo percibido (`RPE`).

#### 4. Sync Bounded Context
*   **SyncSession (Aggregate Root):** Sesión de sincronización local/remota.
*   **MutationLog (Entity):** Registro de cambios locales realizados sin conexión (Operación, Tabla, Payload JSON, Marca temporal). Sirve para aplicar la estrategia de sincronización *Last-Write-Wins* de manera atómica al recuperar la conexión.

---

## 11. UX Vision: Diseñar Experiencias, no Formularios

La experiencia de usuario de CambioFísico debe alejarse del paradigma administrativo clásico de las aplicaciones de salud. Cada interacción debe diseñarse para complementar la actividad física real del usuario:

### A. Cocinar Acompañado (Módulo de Recetas)
*   **Modo Cocina Activo:** Al abrir una receta para cocinar, la interfaz se transforma en una pantalla limpia y de alto contraste, optimizada para la encimera. Se ocultan los menús secundarios y la tipografía se amplía.
*   **Interacción sin Manos:** El usuario puede avanzar o retroceder los pasos de la receta mediante comandos de voz simples (*"siguiente"*, *"atrás"*) o mediante la detección de gestos con la cámara frontal (deslizar la mano en el aire). Esto evita llenar la pantalla de grasa, harina o agua.
*   **Temporizadores Integrados en Contexto:** Las frases del texto de la receta como *"dejar reposar por 12 minutos"* se convierten automáticamente en badges interactivos. Al tocarlos, se inicia un temporizador visual a pantalla completa.

### B. El Entrenador Silencioso (Módulo Fitness)
*   **Swipe-to-Complete (Registro en un Milisegundo):** El usuario no debe escribir sus marcas en cada serie si son iguales a las de la semana anterior. Con un simple deslizamiento (swipe) hacia la derecha sobre una serie sugerida, se clona la marca anterior y se registra como completada.
*   **Cronómetro de Descanso Háptico:** Al completar una serie, se inicia un temporizador de descanso automático. El móvil utiliza una vibración háptica suave y progresiva al finalizar el tiempo, avisando al usuario de forma silenciosa para que no tenga que estar mirando la pantalla constantemente.
*   **Plantillas Inteligentes de Rutina:** Al comenzar un entrenamiento, el sistema precarga la estructura del último día equivalente, permitiendo al usuario enfocarse únicamente en registrar las variaciones de carga o repeticiones de su esfuerzo real.

### C. Estadísticas que Narran Historias
*   **Explicaciones Semánticas en Gráficos:** Al pulsar un pico de peso o un valle en la gráfica de bienestar, la aplicación no se limita a mostrar un número. Genera un texto narrativo combinando datos:
    > *"El 14 de marzo registraste tu peso máximo de la semana (80.5 kg). Coincidió con una cena tardía abundante (#pizza-cuatro-quesos), una calidad de sueño baja (2/5) y un registro de hinchazón abdominal alto (4/5)."*
*   **Scroll Visual Sincronizado:** Al deslizar el dedo horizontalmente por la curva de evolución de peso, se muestra en un lateral la foto de progreso físico correspondiente a esa fecha concreta, permitiendo contrastar el dato numérico de la báscula con la realidad visual del cuerpo.

### D. IA como Compañero Silencioso
*   **Procesamiento de Texto Libre:** En lugar de buscar "huevo" y luego "pan" y luego "aguacate" en bases de datos interminables, el usuario simplemente escribe: *"Para desayunar he tomado una tostada de centeno con medio aguacate y dos huevos pasados por agua, y un café solo"*. La IA local procesa el texto, identifica los ingredientes y genera las porciones correspondientes en el registro diario de forma invisible en segundo plano.

---

## 12. Roadmap de Producto (Gobernado por Necesidades)

```
Fase 1: Estabilización local
      │
      ▼
Fase 2: Monorepo Multiplataforma (Web + Móvil)
      │
      ▼
Fase 3: Procesamiento Semántico Local (Local LLM)
      │
      ▼
Fase 4: Sincronización Segura y Colaboración
```

### Fase 1: Estabilización Local (Fase Actual)
*   **Objetivo:** Consolidar el núcleo del sistema, la base de datos SQLite y garantizar que la experiencia local es rápida y estable.
*   **Por qué:** Un producto excelente debe ser robusto en sus cimientos antes de intentar escalar.
*   **Entregables:** Core Timeline funcional, editor y visor de recetas en Markdown, exportación de datos a JSON/CSV y estructura de base de datos optimizada.

### Fase 2: Monorepo Multiplataforma (Web + Móvil)
*   **Objetivo:** Desarrollar la aplicación móvil nativa (Expo React Native) compartiendo la lógica de dominio y los contratos de datos con el frontend web.
*   **Por qué:** Un diario personal es una herramienta de movilidad. El usuario necesita registrar su peso al levantarse en el baño y sus entrenamientos en el gimnasio desde el teléfono móvil de forma nativa.
*   **Entregables:** Monorepo pnpm con workspaces y Turborepo, app móvil Expo funcional utilizando base de datos local SQLite y compartición de tipos TS en `packages/shared`.

### Fase 3: Procesamiento Semántico Local (Local LLM)
*   **Objetivo:** Integrar la capacidad de registrar alimentos mediante lenguaje natural y extraer correlaciones de bienestar avanzadas en local.
*   **Por qué:** Reducir drásticamente la fricción de registro sin comprometer la privacidad y soberanía de los datos (sin enviar datos de salud a APIs externas en la nube).
*   **Entregables:** Integración de modelos pequeños de lenguaje (p.ej. Phi-3 o Gemma-2B) ejecutándose en el cliente mediante WebGPU / ONNX Runtime Web.

### Fase 4: Sincronización Segura y Colaboración
*   **Objetivo:** Sincronización multi-dispositivo y habilitación de perfiles compartidos (entrenador-cliente o familiar).
*   **Por qué:** Permitir que los datos locales se respalden de manera segura y facilitar la colaboración profesional (como la descrita en Elena y Dr. Mateo).
*   **Entregables:** Sistema de autenticación JWT y protocolo de sincronización local-first basado en colas de mutaciones incrementales con un backend en la nube.

---

## 13. Riesgos de Producto y Arquitectura

*   **Riesgo de Fricción en el Registro (UX):** Si el registro de entrenamientos o comidas requiere demasiados toques, el usuario abandonará la app.
    *   *Mitigación:* Priorizar el autocompletado del historial y la interacción por voz/gestos antes que interfaces complejas de edición.
*   **Riesgo de Rendimiento por Base de Datos Local (Arquitectura):** El crecimiento del archivo de base de datos SQLite al almacenar logs de años y rutas de fotos puede degradar el rendimiento en teléfonos de gama media-baja.
    *   *Mitigación:* Implementar compresión automática de imágenes a formato WebP en el dispositivo y realizar consultas paginadas con índices robustos sobre fechas.
*   **Riesgo de Conflicto en Sincronización (Offline-First):** Ediciones simultáneas en la web local y el dispositivo móvil sin conexión pueden generar colisiones y pérdida de datos.
    *   *Mitigación:* Diseñar una estrategia clara de resolución de conflictos *Last-Write-Wins* a nivel de campo apoyada en metadatos de marcas de tiempo del `MutationLog`.
*   **Riesgo de Complejidad por Sobreingeniería:** Intentar construir infraestructura Cloud (Base de datos PostgreSQL, Docker Compose en la nube, pasarelas de pago) antes de consolidar el uso y la tracción local.
    *   *Mitigación:* Mantener la arquitectura local con SQLite como la única base de datos real durante las Fases 1 y 2.

---

## 14. Oportunidades Ocultas

*   **Procesamiento de IA 100% Gratuito y Privado:** Al ejecutar la IA semántica localmente en el hardware del usuario utilizando ONNX Runtime Web, CambioFísico elimina los costes de servidor por tokens de LLM (como OpenAI/Anthropic), permitiendo un modelo de negocio sostenible de pago único o gratuito de por vida.
*   **Exportación en Formato Abierto y Propiedad Directa:** Al usar Markdown y SQLite locales, el usuario puede descargar una carpeta comprimida `.zip` con todos sus datos estructurados y sus fotos en cualquier momento. Esto genera una confianza y fidelización de marca masiva en comparación con plataformas SaaS que secuestran los datos del usuario.
*   **Cruce Holístico Inédito de Datos:** Ninguna aplicación de fitness comercial del mercado actual cruza variables subjetivas de salud digestiva e hinchazón con marcas de entrenamiento de fuerza o calidad de sueño de forma directa. Este cruce representa un valor clínico y personal único y de alta demanda.

---

## 15. MVP que Enamora (Delightful MVP)

El MVP no debe ser un producto incompleto o con diseño pobre; debe ser una versión con alcance reducido pero ejecutada de manera impecable que genere un impacto positivo inmediato en el usuario:

1.  **El Feed Timeline Central:** Una lista cronológica vertical hermosa y fluida. Cada día se presenta como una tarjeta consolidada que resume el peso, las horas de sueño, la puntuación de bienestar y las notas. Cuenta con scroll infinito e inicialización instantánea.
2.  **El Editor de Recetas Interactivo:** Un visor de Markdown que convierte el texto en una guía paso a paso con checklists interactivos de ingredientes y temporizadores integrados de un toque.
3.  **El Highlight de Hashtags en Comidas:** Un área de texto libre para comidas donde los hashtags de recetas guardadas se iluminan de color verde esmeralda y los hashtags del historial libre de color gris, con un autocompletado inteligente ultra-rápido al presionar `#`.
4.  **La Gráfica de Tendencia Narrativa:** Una pantalla de Dashboard que muestra la evolución del peso del usuario combinada con descripciones escritas en lenguaje natural de los factores que provocaron picos o caídas en fechas específicas.

---

## 16. Revisión Crítica del Equipo (Staff & Architecture Feedback)

Como equipo de Staff Product Engineers y Software Architects, hemos realizado una revisión exhaustiva de las propuestas iniciales y los documentos previos del proyecto, detectando varios puntos de complejidad prematura y áreas de mejora en la UX que proponemos corregir de inmediato:

### A. Alerta de Sobreingeniería: Migración Prematura a NestJS y PostgreSQL
> [!WARNING]
> Proponer una migración incremental a NestJS y el paso a PostgreSQL con contenedores Docker en las fases iniciales es un caso claro de sobreingeniería técnica. 
*   **Por qué:** CambioFísico es una plataforma local-first para un usuario individual en sus fases iniciales. Introducir NestJS y PostgreSQL añade complejidad innecesaria al desarrollo local, duplica los esquemas de base de datos a mantener (SQLite local y PostgreSQL remoto) y obliga al usuario a levantar servicios de backend complejos.
*   **Solución Propuesta:** Mantener el backend en un Express minimalista y optimizado, o incluso migrar a una arquitectura cliente-servidor puramente embebida en la app web y móvil (utilizando base de datos local SQLite Prisma). El backend remoto debe ser una simple API de sincronización agnóstica que reciba el log de mutaciones cifrado, manteniendo la base de datos de negocio siempre en SQLite local.

### B. Corrección de UX: El Peligro del Markdown Crudo en Recetas
> [!IMPORTANT]
> El soporte de Markdown plano para recetas es ideal para desarrolladores, pero frustrante para cocinar en un entorno real (donde se tienen las manos ocupadas o húmedas).
*   **Por qué:** Leer un documento Markdown largo requiere desplazarse constantemente por la pantalla. Si el usuario está cocinando, esto resulta inviable y provoca frustración.
*   **Solución Propuesta:** Implementar un parser en el visor de recetas que segmente el Markdown en dos secciones dinámicas: *Ingredientes* (donde cada ingrediente es un checklist interactivo para marcar lo que ya se ha preparado) e *Instrucciones* (que se presentan paso a paso con fuentes grandes y control por gestos de cámara o voz para cambiar de paso).

### C. Simplificación de Modularidad: Módulos Futuros Pasivos
> [!TIP]
> No dediquemos esfuerzo a diseñar esquemas de datos o vistas para los módulos futuros (viajes, música, productividad, etc.) para evitar desviar el foco del MVP de salud y bienestar.
*   **Por qué:** Diseñar código para módulos que no se construirán hasta dentro de 1 o 2 años introduce abstracciones prematuras e hipótesis no validadas sobre lo que el usuario final necesitará en esos dominios.
*   **Solución Propuesta:** Diseñar la capacidad `Timeline` como un *Event Ledger* genérico. Los eventos de la base de datos se guardan con un campo `eventType` y un JSON `payload`. Esto permite que cualquier módulo futuro (p.ej. *Travel* o *Music*) pueda guardar sus datos en el timeline central sin requerir alterar la tabla de base de datos de la plataforma core, garantizando la modularidad pasiva perfecta de por vida.

### D. Optimización del Registro en Fitness (Evitar "Form Fatigue")
> [!CAUTION]
> Obligar al usuario a rellenar un formulario detallado con campos para el nombre del ejercicio, peso, repeticiones y RPE para cada una de sus series en el gimnasio causará el abandono inmediato de la aplicación.
*   **Por qué:** Registrar un entrenamiento de 5 ejercicios con 4 series cada uno implicaría rellenar 20 formularios individuales mientras se está cansado bajo la barra.
*   **Solución Propuesta:** Diseñar el registro de gimnasio bajo el paradigma de "Copia y Variación". Al iniciar un entrenamiento, se precarga por completo la sesión anterior. El usuario sólo debe pulsar un botón para confirmar que completó la serie tal y como estaba prevista, o deslizar horizontalmente para cambiar rápidamente el peso o repeticiones mediante controles interactivos incrementales (+/-).
