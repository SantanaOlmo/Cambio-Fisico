# CambioFísico — Contexto compacto para IA

> Lee este archivo antes de proponer diseño, arquitectura o código. Es una guía operativa: resume la intención del producto, sus límites y la dirección técnica acordada.

## 1. Identidad y propósito

CambioFísico es una herramienta personal, local-first y privada para que una persona mantenga perspectiva sobre su propia vida.

No es una app de fitness, un contador de calorías, un dashboard de métricas ni un diario para archivar el pasado. Su finalidad es transformar experiencias registradas en memoria, contexto y comprensión para que la persona pueda decidir mejor en el presente y construir el futuro que desea.

Principio central:

```text
Experiencias → Memoria → Contexto → Comprensión → Perspectiva → Decisiones → Cambio vital
```

El ciclo de producto es:

```text
Registrar → Comprender → Actuar → Mejorar
```

Registrar nunca es el fin. La mejora no se impone: aparece como consecuencia de comprender y actuar con mayor intención.

Lema operativo: **La memoria existe para construir el futuro, no para archivar el pasado.**

## 2. Modelo mental y criterios de producto

### La persona no se reduce a una etiqueta

La persona es dinámica, multidimensional y cambia según su contexto. No se la define por una conducta aislada ni por una métrica.

Nunca diseñar etiquetas identitarias como: “eres inactivo”, “eres insomne”, “eres indisciplinado” o equivalentes. Tampoco convertir una hipótesis o una correlación temporal en una verdad sobre quién es el usuario.

La interfaz debe adaptarse al **foco vital actual** —por ejemplo, entrenamiento, descanso, digestión o recuperación— y silenciar áreas irrelevantes sin borrar ni invalidar el histórico.

### El dominio es la experiencia, no el módulo

La unidad conceptual de dominio es `Experience`, una vivencia contextualizada dentro de una historia personal continua.

Comida, entrenamiento, descanso, lectura, viaje, conversación o reflexión no deben presentarse al usuario como aplicaciones separadas. Los módulos son una organización interna de código y captura; el producto debe sentirse como un único flujo de vida.

Una experiencia combina:
- momento y contexto;
- señales observables y datos estructurados cuando aporten valor;
- percepción subjetiva, notas y retorno emocional;
- relaciones potenciales con otras experiencias;
- significado que puede cambiar retrospectivamente.

Las especializaciones técnicas (`MealExperience`, `WorkoutExperience`, `ReflectionExperience`, etc.) pueden existir, pero deben extender un núcleo unificado y no aislar la historia personal en silos desconectados.

### La realidad percibida importa

Datos objetivos y percepción personal se complementan. La misma comida, entrenamiento o noche de sueño puede tener un significado distinto para cada persona. El sistema no debe tratar la métrica aislada como verdad suficiente.

### La importancia emerge

El usuario no debe clasificar manualmente una experiencia como “importante” al registrarla. La relevancia se descubre con el tiempo por repetición, contraste con la rutina, contexto, relaciones, retorno emocional y reflexión posterior.

El sistema puede destacar retrospectivamente patrones o momentos relevantes, pero debe hacerlo de forma descriptiva, discreta y revisable; nunca como una sentencia o una clasificación moral.

## 3. Reglas de UX y tono

El producto debe ser sereno, claro, humano y de baja fricción.

- Diseñar el registro para que la interfaz desaparezca: texto libre, acciones rápidas, gestos o componentes comunes.
- Evitar formularios largos, navegación por módulos rígidos y carga administrativa.
- Priorizar historias, relaciones y decisiones útiles sobre dashboards saturados de números.
- Cada pantalla debe responder: “¿Cómo aporta claridad o facilita una decisión/acción ahora?”
- El historial es una fuente de perspectiva, no un museo.
- Las funciones activas deben ayudar en el momento de hacer algo: por ejemplo, modo cocina paso a paso o referencia de la sesión anterior al entrenar.
- El usuario debe poder ocultar áreas fuera de su foco actual sin perder datos históricos.
- Mantener un lenguaje visual coherente en todo el producto; no debe sentirse que se cambia de aplicación al pasar de comida a descanso o reflexión.
- Evitar mecanismos de adicción, presión o culpa: rachas punitivas, rankings, gamificación compulsiva, notificaciones intrusivas y puntuaciones globales de la persona o del día.
- Las metas son referencias flexibles para decidir, nunca un juicio de éxito o fracaso personal.
- No recopilar ni pedir datos que no tengan una utilidad clara para la comprensión del usuario.

Tono escrito:
- descriptivo, empírico, calmado y contextual;
- formular hipótesis provisionales: “parece que…”, “en estas semanas…”, “se observa una coincidencia…”;
- nunca moralista, condescendiente, motivacional genérico ni de coaching;
- nunca usar juicios binarios de “bien/mal” para calificar a la persona, una experiencia o una racha.

## 4. Papel de la IA dentro del producto

La IA es instrumental y complementaria: el producto debe seguir siendo útil si la IA no está disponible.

Su papel:
1. Reducir fricción al interpretar lenguaje natural y estructurar registros.
2. Relacionar experiencias y detectar patrones contextuales con datos suficientes.
3. Proponer hipótesis claras y provisionales.
4. Presentar insights de forma integrada e invisible dentro de flujos o visualizaciones relevantes.

La IA no debe:
- actuar como chatbot flotante o asistente intrusivo;
- dictar decisiones, rutinas o comportamientos;
- juzgar, premiar, castigar, moralizar o diagnosticar;
- definir identidad;
- presentar correlaciones débiles como causalidad;
- interrumpir el acto de vivir o registrar.

Un insight correcto se parece a:
> “En las últimas tres semanas, tus registros de descanso corto coinciden con cenas más tardías; es una relación observada, no una conclusión causal.”

Un insight incorrecto se parece a:
> “Eres insomne porque cenas mal. Debes cambiar tus hábitos.”

## 5. Límites explícitos: qué no construir sin una necesidad nueva y validada

No introducir por defecto:
- nube, sincronización compleja o modelo SaaS multiusuario;
- rastreo pasivo de actividad;
- wearables e integraciones externas;
- gamificación de retención;
- recomendaciones automatizadas que sustituyan el criterio humano;
- paneles llenos de métricas sin una pregunta humana concreta;
- módulos aislados que rompan el continuo de experiencias;
- infraestructura técnica prematura.

Ante una propuesta, comprobar:
1. ¿Reduce fricción y esfuerzo mental?
2. ¿Aumenta comprensión cualitativa y consciencia?
3. ¿Aporta claridad en el momento de actuar?
4. ¿Respeta privacidad, soberanía y autonomía?
5. ¿Hace la experiencia más fluida, serena y humana?
6. ¿Simplifica el código y el producto en vez de complicarlos?

Si la respuesta no es claramente afirmativa, no implementar la propuesta todavía.

## 6. Arquitectura y dirección técnica acordada

### Principios de plataforma

- Local-first y offline-first.
- Monousuario en las fases iniciales.
- Datos y recursos en el dispositivo del usuario.
- Privacidad por diseño: sin nube ni anuncios como requisito base.
- Modularidad interna para mantenibilidad; experiencia externa unificada.
- TypeScript y tipado extremo a extremo siempre que sea razonable.

### Estructura objetivo

```text
apps/
  web/       React + Vite
  mobile/    Expo / React Native
  api/       NestJS
packages/
  shared/    dominio, tipos, DTOs, validaciones y lógica compartida
```

Usar **pnpm workspaces** para dependencias y **Turborepo** para orquestar tareas y caché.

Compartir tipos de dominio, DTOs, validaciones Zod y lógica que no dependa de la plataforma. Evitar duplicar contratos entre web, móvil y API.

### Web

Dirección actual:
- React 18 + TypeScript;
- Vite;
- Tailwind CSS;
- React Router;
- Recharts cuando una visualización aporte comprensión real;
- iconos SVG locales y tipados.

Los iconos se sirven desde `apps/web/src/assets/icons/` y se exponen con el componente `Icon`. No sustituir ese enfoque por un CDN o dependencia remota sin una razón concreta.

### Backend

Dirección aprobada:
- Migración incremental desde Express legado hacia NestJS.
- No hacer una migración “big bang”.
- Migrar endpoints de uno en uno y mantener compatibilidad durante la transición.
- Usar módulos, inyección de dependencias, validación y tests desacoplados.
- Mantener responsabilidades claras: controladores finos, servicios de aplicación, acceso a datos aislado, DTOs/validación compartibles cuando proceda.

**Estado importante:** Express puede seguir existiendo en `apps/api-legacy`. No asumir que el repositorio ya está completamente migrado a NestJS.

### Persistencia

Dirección aprobada:
- Mantener SQLite local durante la etapa monousuario/offline-first.
- Adoptar Prisma para esquema, migraciones y acceso asíncrono tipado.
- Bloquear PostgreSQL y la infraestructura cloud hasta que exista una necesidad real de multiusuario o sincronización.
- La migración desde `sql.js` hacia Prisma debe ser incremental.

**Estado importante:** `sql.js` puede existir en el legado; es una implementación anterior, no el objetivo de persistencia a largo plazo. SQLite + Prisma es la dirección vigente.

### Móvil

Dirección aprobada:
- Expo + React Native.
- Prioridad inicial Android, con capacidad de llegar a iOS.
- Reutilizar `packages/shared`, contratos y lógica de dominio; no forzar reutilización visual cuando degrade la UX nativa.
- No crear app móvil hasta que una necesidad de producto la justifique frente a seguir mejorando el flujo web.

## 7. Forma de trabajar sobre el repositorio

Antes de modificar código:
1. Lee este archivo y los archivos concretos relacionados con la tarea.
2. Inspecciona el estado real del repositorio; no des por implementada una dirección futura.
3. Identifica si el cambio mejora el flujo `Registrar → Comprender → Actuar → Mejorar`.
4. Diseña primero el comportamiento de usuario y el dominio; después el detalle técnico.
5. Mantén cambios pequeños, coherentes y reversibles.
6. Conserva compatibilidad y migra incrementalmente cuando se toque legado.
7. Actualiza documentación o decisiones cuando una implementación consolide un criterio nuevo.

Cuando haya ambigüedad, prioriza:
1. Soberanía, privacidad y datos locales.
2. Claridad y baja fricción para el usuario.
3. Dominio unificado de experiencias.
4. Simplitud de producto y arquitectura.
5. Evolución incremental antes que reescritura total.

## 8. Descubrimientos aún provisionales

Los siguientes principios son fuertes guías de producto, pero se consideran descubrimientos provisionales hasta que se consoliden formalmente:
- adaptación de la interfaz al foco vital actual;
- relevancia emergente de las experiencias;
- énfasis visual retrospectivo de patrones;
- formas concretas de representar el timeline de áreas hoy silenciadas;
- umbrales de evidencia y lenguaje para insights de IA;
- modos activos específicos, como cocina o entrenamiento.

No descartarlos por comodidad técnica, pero no construir soluciones complejas para preguntas aún abiertas. Diseñar extensiones mínimas y validar su valor humano antes de consolidarlas.

## 9. Regla final

CambioFísico no intenta decirle a una persona cómo vivir. Debe ayudarle a ver con más claridad la vida que ya está viviendo, para que pueda decidir libremente hacia dónde dirigirla.
