# Contexto de IA — Proyecto CambioFísico

Este documento constituye la fuente de contexto permanente para cualquier Inteligencia Artificial (o desarrollador) que deba analizar, mantener, depurar o extender el repositorio de **CambioFísico**. Sintetiza la identidad, filosofía, arquitectura y reglas de desarrollo del producto, manteniéndose relevante frente a los cambios de implementación técnica a corto plazo.

---

## 1. Identidad del Proyecto

**CambioFísico** no es una aplicación de gimnasio, ni un contador de calorías, ni un mero CRUD de base de datos. Es una **plataforma modular personal-first orientada al bienestar, autocomprensión y mejora continua**. 

El proyecto nace para resolver problemas reales del día a día del usuario, evolucionando de forma orgánica. Su propósito es unificar en un solo lugar los diferentes aspectos que influyen en la vitalidad humana (sueño, nutrición, actividad, estado digestivo y mental), evitando la fragmentación de la información de vida en múltiples servicios comerciales cerrados.

---

## 2. Filosofía del Producto

El desarrollo de CambioFísico se rige por los siguientes principios fundamentales:

*   **Resolver problemas reales primero:** Cada nueva capacidad o módulo técnico debe justificarse únicamente porque resuelve un problema real y documentado del usuario.
*   **Desarrollo incremental (Simplicidad antes que Complejidad):** Evitar la sobreingeniería y las abstracciones prematuras. Implementar la solución más simple que funcione y refactorizar solo cuando el crecimiento lo exija.
*   **Modularidad estricta:** La plataforma se divide en un núcleo estable (Core) y módulos funcionales independientes. Los módulos consumen las capacidades del Core a través de contratos, sin conocer los detalles internos de otros módulos.
*   **Offline-First absoluto:** La aplicación local es el sistema primario. El usuario debe poder registrar su progreso en sótanos de gimnasio o zonas sin cobertura. La red es un canal de transporte secundario y opcional.
*   **Privacidad soberana por diseño:** Los datos biométricos, fotos y notas del usuario pertenecen exclusivamente a su almacenamiento físico local.
*   **Excelente UX sensorial:** El diseño visual, la fluidez y las micro-interacciones no son cosméticos; son requisitos funcionales críticos para fomentar el hábito de registro diario.
*   **IA contextual y silenciosa:** Rechazamos los chatbots intrusivos. La IA actúa como un procesador de contexto en segundo plano para estructurar información y deducir correlaciones.

---

## 3. Objetivos del Producto

### Objetivos Actuales
*   Estabilizar el monorrepo basado en workspaces y Turborepo.
*   Mantener el Timeline unificado y el motor local de recetas e ingestas.
*   Migrar a Prisma ORM para gestionar la base de datos local SQLite de forma robusta.

### Objetivos Futuros
*   Lanzar la aplicación móvil nativa (Expo React Native) compartiendo lógica de negocio.
*   Implementar un motor de procesamiento de lenguaje natural (NLP) local en el dispositivo (ONNX / WebGPU) para registro de comidas libre de fricción.
*   Sincronización multidispositivo local-first basada en colas de mutaciones con resolución de conflictos *Last-Write-Wins*.

### Objetivos Descartados (Por Ahora)
*   Integración automática con wearables de terceros (Apple Health, Fitbit).
*   Muros comunitarios o funciones sociales de red.
*   Bases de datos de alimentos en la nube de terceros.
*   Migración prematura del motor local a bases de datos cloud complejas (PostgreSQL pospuesto indefinidamente para el uso individual).

---

## 4. Visión del Producto

La visión a largo plazo es construir un **diario de vida inteligente y soberano**. CambioFísico aspira a ser el sistema operativo del bienestar personal, permitiendo al usuario ver el impacto real y cruzado de sus hábitos sobre su vitalidad. No promete automatizar la vida del usuario, sino ofrecerle las herramientas y la información narrativa necesaria para que tome mejores decisiones basadas en datos reales propios.

---

## 5. Arquitectura del Producto

El diseño conceptual de CambioFísico se estructura bajo el patrón **Core Platform + Feature Modules** para habilitar la extensibilidad sin comprometer la base del sistema.

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

*   **Core Platform:** Provee los cimientos estables (persistencia local SQLite, layouts de la interfaz, bus de eventos comunes).
*   **Capacidades (Core Capabilities):** Servicios y utilidades técnicas reutilizables expuestos por el Core que los módulos consumen de forma estricta.
*   **Módulos (Feature Modules):** Encapsulan las reglas de negocio específicas de un dominio (ej: recetas, entrenamientos) y amplían el Core registrando hooks visuales o inyectando tipos de eventos.

---

## 6. Capacidades del Core

*   **Identity:** Gestión de perfiles locales, metas de peso y preferencias de visualización (unidades de medida).
*   **Timeline:** Feed cronológico centralizado. Funciona como un *Event Ledger* (libro de eventos) donde los módulos inyectan registros (comidas, rutinas, notas) representados por un payload JSON común.
*   **Collections:** Agrupador de elementos del mismo tipo (recetas favoritas, agrupaciones de ejercicios, equipaje de viaje) en carpetas o listas inteligentes.
*   **Metrics:** Motor matemático local encargado de promedios móviles, tendencias, rachas de consistencia y marcas personales.
*   **Media:** Gestor físico de almacenamiento, compresión (WebP) y eliminación de archivos multimedia locales.
*   **Insights:** Procesador de reglas de negocio que cruza variables temporales buscando correlaciones estadísticas significativas.
*   **AI Context:** Adaptador que serializa el feed de actividades del usuario en una estructura JSON optimizada para contextualizar modelos de lenguaje de forma privada.
*   **Search:** Motor de búsqueda indexado local (FTS) sobre notas, títulos y metadatos textuales.
*   **Notifications:** Programador de alertas locales, alarmas de hábitos y feedback háptico en el dispositivo.
*   **Automation:** Tareas automáticas en segundo plano (p.ej. copias de seguridad locales incrementales).

---

## 7. Módulos de Producto

Los módulos son independientes y se comunican a través de los límites del dominio conceptual mediante identificadores de referencia:

### Módulos Activos (Foco de Salud y Fitness)
*   **Nutrition:** Registro diario de comidas estructurado por tramos horarios. Consume *Timeline* e interactúa con el módulo de recetas.
*   **Recipes:** Recetario personal en formato Markdown con tags, slugs y buscador local.
*   **Fitness:** Bitácora de entrenamientos de fuerza y cardio, control de series y repeticiones.

### Módulos Previstos (Extensibilidad Pasiva)
*   **Habits:** Seguimiento cualitativo de hábitos diarios e hidratación.
*   **Travel:** Itinerarios de viajes, checklists de maletas e histórico de fotos geolocalizadas.
*   **Music:** Correlación entre listas de reproducción escuchadas y rendimiento/ánimo diario.
*   **Learning:** Bitácora de estudio y almacenamiento de apuntes formativos.
*   **Projects / Productivity:** Gestión de metas personales y tareas de proyectos propios.

---

## 8. Diseño del Dominio Conceptual (DDD)

El modelo de negocio está delimitado en **Contextos Acotados (Bounded Contexts)** para evitar el acoplamiento directo entre tablas o clases de dominios distintos:

*   **Core Context:** Gobierna las raíces de agregado `User` (Profile, WeightGoal) y `TimelineEntry` (Date, Wellbeing, Sleep, Notes, ProgressPhoto).
*   **Nutrition & Recipes Context:** Gobierna las raíces de agregado `Meal` (porciones de comida asociadas a una fecha) y `Recipe` (RecipeSlug, MarkdownContent, Ingredients).
*   **Fitness Context:** Gobierna la raíz de agregado `Workout` (entrenamiento fechado compuesto por `Exercise` y marcas de `LoadSet`).
*   **Sync Context:** Gobierna `SyncSession` y el histórico de mutaciones locales `MutationLog` para replicación offline-first.

---

## 9. UX Vision: Diseñar Experiencias

El éxito de CambioFísico radica en que registrar el progreso diario deje de sentirse como rellenar una base de datos administrativa:

*   **Las Recetas como Historias (Modo Cocina):** Una interfaz a pantalla completa de tipografía ampliada para la encimera, controlable por comandos de voz o gestos de cámara para avanzar de paso sin tocar la pantalla con las manos sucias. Los tiempos de cocción se inician con temporizadores integrados de un toque.
*   **El Gimnasio sin Fricciones (Copia y Variación):** Copiar marcas de entrenamientos previos con un deslizamiento horizontal (swipe). Un temporizador de descanso háptico silencioso que vibra de forma sutil en el bolsillo al terminar el descanso.
*   **Estadísticas con Narrativa Humana:** Los gráficos interpretan la información por el usuario: *"Tu peso es 1.2 kg superior hoy, coincidiendo con tu cena tardía de #risotto-de-setas de ayer, fatiga registrada y mala calidad de sueño"*.
*   **Deslizar el Progreso Visual:** Al hacer scroll horizontal sobre la gráfica de peso, se despliega paralelamente la foto de progreso correspondiente a esa fecha, permitiendo correlacionar visualmente los números con el cambio físico real.

---

## 10. Inteligencia Artificial Contextual

La IA en CambioFísico no es un chat de preguntas y respuestas. Es una **capa de servicio invisible** que añade valor en los flujos cotidianos del usuario:

*   **Registro Semántico:** El usuario escribe *"Dos tostadas con tomate, un huevo frito y café con leche"* en un input de texto libre. La IA local extrae los ingredientes y las porciones, catalogando el desayuno de forma transparente.
*   **Descubrimiento de Patrones:** Analiza de forma silenciosa las correlaciones cruzadas en el *AI Context* y presenta notificaciones motivacionales e insights útiles: *"Hemos detectado que entrenar calistenia después de dormir menos de 6 horas reduce tu volumen de series un 15% y aumenta tu fatiga. Prioriza el descanso hoy"*.

---

## 11. Arquitectura Técnica

El proyecto está organizado en un **monorrepo basado en pnpm workspaces y Turborepo** para garantizar la consistencia de tipos y agilizar el despliegue multi-aplicación:

*   **`apps/web`:** Aplicación web frontend (React, Vite, TypeScript, Tailwind CSS).
*   **`apps/api-legacy`:** API REST backend inicial (Node.js, Express, sql.js en memoria).
*   **`packages/` (Futuro):** Destinado a extraer `shared` (tipos de datos TypeScript y esquemas Zod comunes), `ui` (componentes del sistema de diseño común) y `config` (reglas de build, lint y tsconfig).

---

## 12. Estado Actual del Proyecto

*   **Infraestructura:** Monorrepo estructurado con pnpm workspaces y Turborepo operativo. Scripts raíz configurados (`dev`, `build`, `typecheck`, `lint`).
*   **Persistencia:** La API de Express en `apps/api-legacy` utiliza SQLite en memoria mediante WebAssembly (`sql.js`) y vuelca el buffer completo a `/data/fitness.sqlite` de forma síncrona en cada escritura.
*   **Frontend:** Aplicación web React funcional con soporte de Timeline, visualizador y editor de recetas en Markdown, e historial de entradas con highlight interactivo de hashtags de recetas.
*   **Datos locales:** `/data/` y `/data/photos/` se ubican en la raíz y están completamente excluidos de Git para garantizar la privacidad del usuario.

---

## 13. Roadmap General de Producto

*   **EPIC 1: Reestructuración a monorrepo** (Completado).
*   **EPIC 2: Integración de Prisma ORM y SQLite local** (Eliminación de la dependencia de `sql.js` en memoria por acceso local directo).
*   **EPIC 3: Modularización de paquetes compartidos** (Creación de `packages/shared` para validadores y tipos comunes).
*   **EPIC 4: Aplicación Móvil nativa** (Expo React Native y compartición de código con Web).
*   **EPIC 5: Procesamiento IA local-first** (Integración de modelos ONNX / WebGPU locales).
*   **EPIC 6: Sincronización y perfiles compartidos** (Autenticación opcional y base de datos distribuida).

---

## 14. Principios para Futuras IA

Cualquier modelo de IA que modifique, amplíe o analice este repositorio debe regirse de forma estricta por los siguientes mandamientos:

1.  **No introduzcas sobreingeniería:** Diseña soluciones simples y minimalistas. No añadas frameworks, bases de datos remotas ni dependencias en la nube prematuramente.
2.  **Respeta los ADR activos:** Consulta siempre los registros de decisiones arquitectónicas (`docs/adr/`) antes de alterar patrones existentes.
3.  **Mantén el desacoplamiento modular:** Al programar lógicas de módulos (ej: fitness, nutrición), asegúrate de que no contaminan el Core y que interactúan mediante contratos y el Timeline Event Ledger.
4.  **No rompas el Offline-First:** Toda funcionalidad de registro y consulta de datos debe operar localmente sin internet de forma predeterminada.
5.  **Piensa como Product Engineer, no como programador de CRUDs:** Justifica cada modificación de código por el valor real que aporta a la experiencia del usuario y la reducción de fricción.
6.  **Protege la calidad de la UX:** Mantén la fluidez de las micro-interacciones, la coherencia de la paleta estética (tonos esmeralda y pizarra) y la accesibilidad como requisitos funcionales.
7.  **Garantiza la portabilidad:** No utilices dependencias con compilaciones nativas complejas que dificulten la ejecución rápida del proyecto en entornos locales limpios.
8.  **Documenta tus decisiones:** Si modificas la arquitectura o introduces un nuevo patrón de datos, documenta el cambio y crea o actualiza un ADR en `docs/adr/`.

---

## 15. Resumen Ejecutivo

> **CambioFísico no pretende ser una aplicación de fitness.** Pretende convertirse, de forma incremental, en una plataforma personal modular capaz de ayudar a las personas a comprender, registrar y mejorar distintos aspectos de su vida mediante una excelente experiencia de usuario, datos útiles e inteligencia artificial contextual.

---

## 16. Desviaciones Actuales del Código

A continuación se detallan las inconsistencias actuales detectadas entre el estado real del código de la aplicación y la visión/arquitectura objetivo definida en este documento:

*   **API y Persistencia Legacy (`apps/api-legacy/`):** El backend sigue estructurado sobre Express clásico y depende de `sql.js` (SQLite WASM) para operaciones en memoria con guardado síncrono completo a disco. Esta persistencia bloquea el hilo principal ante escrituras grandes y debe migrarse a accesos directos locales usando Prisma ORM sobre SQLite nativo (previsto para EPIC 2).
*   **Servicio de Exportación Desfasado:** El servicio `apps/api-legacy/src/services/exportService.ts` no está sincronizado con el esquema actual de comidas detalladas. Al generar el CSV, sigue exportando las columnas deprecadas (`carbs_amount`, `water_liters`, `steps`) y omite por completo los nuevos campos segmentados (`meal_breakfast`, `meal_lunch`, etc.).
*   **Ausencia de Validación Compartida:** Las validaciones de inputs y tipos de datos TypeScript están duplicadas en `apps/web/src/types/` y `apps/api-legacy/src/types/` en lugar de estar centralizadas en un paquete común `packages/shared` (previsto para EPIC 3).
*   **Volatilidad de Opciones del Usuario:** El autocompletado del historial del gimnasio y términos del combobox se guarda localmente en el navegador (`localStorage`) a través de `useCustomOptions.ts`. Si el usuario cambia de dispositivo o limpia datos, esta información se pierde. Debería ser una capacidad del Core (`Identity` o `Collections`) persistida en la base de datos local SQLite.
*   **Cero Tests Automatizados:** A pesar de ser una prioridad arquitectónica, el repositorio carece de tests unitarios, de integración o E2E, dependiendo únicamente de validaciones de tipos estáticas en tiempo de compilación.
