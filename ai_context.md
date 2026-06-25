# Contexto de IA — Proyecto CambioFísico

> **CambioFísico es una plataforma personal diseñada para transformar experiencias cotidianas en conocimiento útil, ayudando a las personas a comprender mejor sus hábitos, tomar mejores decisiones y mejorar de forma continua mediante una experiencia excelente, datos contextualizados e inteligencia artificial.**
>
> *Lema: CambioFísico no pretende registrar datos. Pretende convertir experiencias cotidianas en conocimiento útil para ayudar a una persona a tomar mejores decisiones sobre su vida.*

Este documento constituye la fuente de contexto permanente para cualquier Inteligencia Artificial (o desarrollador) que deba analizar, mantener, depurar o extender el repositorio de **CambioFísico**. Sintetiza la identidad del producto, la filosofía de diseño, el dominio conceptual, la arquitectura técnica básica y las reglas de desarrollo del monorrepo.

---

## 1. Identidad del Proyecto

*   **Qué es:** CambioFísico es una plataforma personal para comprender, mejorar y registrar aquellos aspectos de la vida que influyen en el bienestar de una persona.
*   **Propósito:** Ayudar al usuario a comprender cómo las distintas áreas de su vida se relacionan entre sí para tomar mejores decisiones.
*   **Modularidad Orgánica:** El sistema arranca resolviendo necesidades inmediatas de salud y fitness, pero su diseño conceptual permite añadir nuevos módulos (viajes, lectura, música, aprendizaje, etc.) de manera pasiva y solo cuando exista una necesidad humana real.

---

## 2. Filosofía del Producto y Principios de Diseño

### Principios del Producto
*   **Resolver problemas reales primero:** Cada nueva capacidad técnica debe estar justificada porque soluciona una necesidad real del usuario, nunca porque "queda bien".
*   **Desarrollo incremental y modular:** Mantener pocas decisiones irrevocables. La mejor arquitectura es la más sencilla que soporte la extensión modular del sistema.
*   **Offline-First y Privacidad absoluta:** Los datos y fotos pertenecen exclusivamente al disco local del usuario. La aplicación debe funcionar al 100% en sótanos de gimnasio o zonas sin cobertura.
*   **La IA como acompañante silencioso:** La IA ayuda al usuario a descubrir relaciones que probablemente no detectaría por sí mismo de forma pasiva y sin chats intrusivos.
*   **Excelente UX sensorial:** Las micro-interacciones, animaciones y fluidez visual son requisitos funcionales obligatorios para motivar la consistencia en el registro.

### Brújula de Diseño de Funcionalidades
Cada nueva característica o cambio debe cumplir **al menos una** de estas condiciones:
*   Reduce la fricción de entrada de datos.
*   Ayuda a recordar hábitos o momentos clave.
*   Ayuda a comprender relaciones.
*   Ayuda a mejorar la salud o marcas personales.
*   Reduce el esfuerzo mental del usuario.
*   Hace agradable una tarea repetitiva.
*   Genera motivación interna y no intrusiva.
*   Conecta información previamente aislada.

### Principios UX y de Conocimiento
*   **La interfaz debe desaparecer:** El usuario nunca debería sentir que está rellenando formularios. Siempre debería sentir que está haciendo algo natural (escribir comidas en texto libre, cocinar guiado por voz o gestos, entrenar copiando su sesión anterior). Todo debe sentirse extremadamente ligero.
*   **El conocimiento es más importante que el dato:** 
    *   Registrar el peso no aporta valor; comprender por qué sube o baja (sueño, digestión, estrés) sí.
    *   Registrar una receta no aporta valor; descubrir cuáles cocinas realmente y qué macros te aportan sí.
    *   Registrar entrenamientos no aporta valor; entender qué rutina y volumen funciona mejor para progresar sí.

---

## 3. Qué NO es CambioFísico

Para evitar el crecimiento descontrolado del alcance (*scope creep*), definimos explícitamente los límites del proyecto:
*   **No pretende sustituir a un médico o nutricionista:** Es una herramienta de autocomprensión, no de diagnóstico clínico.
*   **No pretende ser una red social:** La experiencia es íntima, personal y soberana. No hay muros de actividad ni compartición social nativa.
*   **No pretende convertirse en una suite infinita:** Cada módulo debe responder a una necesidad real y mantenerse lo más ligero y autocontenido posible.
*   **No pretende almacenar datos porque sí:** No recopilamos información que el usuario no necesite para obtener conocimiento útil sobre su vida.
*   **No pretende recopilar información innecesaria de forma pasiva:** Rechazamos el rastreo de datos en segundo plano que atente contra la privacidad o la autonomía del usuario.

---

## 4. Capa de Producto (El Flujo de Experiencia)

Todo el producto se estructura bajo un flujo continuo centrado en el usuario:

```
Registrar ──> Comprender ──> Actuar ──> Mejorar
```

*   **Registrar (Fricción Cero):** Capturar las experiencias cotidianas de forma de registro natural y ligera. La interfaz desaparece para dar paso al texto libre, hashtags relacionales e IA pasiva.
*   **Comprender (Insights):** La plataforma analiza los datos y genera *Insights* en lenguaje humano cruzando variables. Las gráficas son solo una implementación; el Insight es el producto.
*   **Actuar (Flujos de Asistencia):** Facilitar la ejecución de las tareas diarias. El visor se convierte en un ayudante sin manos en la cocina (recetas paso a paso) o un entrenador silencioso en el gimnasio (registro de series mediante copias y variaciones rápidas).
*   **Mejorar (Decisiones Informadas):** Evaluar el impacto de las acciones para que el usuario tome mejores decisiones sobre su estilo de vida a largo plazo.

---

## 5. Capa de Dominio (¿Cómo pensamos el problema?)

*   **Usuario:** El individuo central de la plataforma con sus configuraciones básicas y metas.
*   **Timeline:** El Timeline es la representación cronológica de la vida del usuario dentro de la plataforma. Todo aquello que ocurre y merece ser recordado puede aparecer en él.
*   **Comida (Meal) & Receta (Recipe):** Las ingestas del día y la estructura culinaria de referencia. Una receta sirve de plantilla para las comidas del Timeline.
*   **Sesión de Entrenamiento (Workout):** El registro físico de una actividad de fuerza o cardio asociada a una fecha concreta.

---

## 6. Capa de Tecnología (¿Cómo lo implementamos hoy?)

*   **Monorrepo (pnpm workspaces + Turborepo):**
    *   `apps/web`: Aplicación web frontend React (Vite + TypeScript + Tailwind CSS).
    *   `apps/api-legacy`: API Express en Node.js.
*   **Persistencia:** Base de datos local SQLite. Actualmente se utiliza SQLite en memoria via WebAssembly (`sql.js`) que vuelca el buffer completo a la carpeta `/data` en la raíz del repositorio tras cada escritura.
*   **Aislamiento de Datos:** El directorio `/data` de la raíz del monorrepo (base de datos local y fotos de progreso) está estrictamente excluido en el `.gitignore` para blindar la privacidad del usuario.

---

## 7. Estado Actual del Proyecto y Próximos Objetivos

*   **Estado Actual:** Monorrepo estructurado y compilando sin errores. La aplicación web puede registrar entradas diarias, gestionar recetas en Markdown, resaltar hashtags de recetas en comidas e interpretar tendencias en el Dashboard.
*   **Próximos Objetivos:**
    *   Consolidar el Core del producto.
    *   Mejorar la persistencia local (removiendo el volcado de memoria legacy).
    *   Compartir lógica y tipos comunes entre plataformas.
    *   Construir la aplicación móvil.
    *   Reducir fricción en el registro diario.

---

## 8. Principios para Futuras IA (Instrucciones de Desarrollo)

Cualquier IA que trabaje sobre este repositorio debe cumplir estrictamente las siguientes pautas:

1.  **Prioriza la simplicidad:** No propongas bases de datos distribuidas, microservicios, brokers de eventos o infraestructuras cloud complejas.
2.  **No diseñes soluciones para problemas inexistentes:** No asumas multiusuario, wearables ni integraciones externas en el código actual.
3.  **Mantén el desacoplamiento modular:** Asegúrate de que los módulos (nutrition, recipes, fitness) se conectan al Timeline de manera pasiva y a través de contratos simples.
4.  **No rompas el Offline-First:** Toda funcionalidad de datos debe operar localmente en el dispositivo del usuario sin requerir conexión a internet.
5.  **Piensa como Product Engineer:** La UX, la desaparición de la interfaz y la generación de conocimiento útil son tan prioritarias como el orden y la arquitectura del código.
6.  **Respeta las decisiones de los ADRs:** Consulta la carpeta `docs/adr/` antes de realizar cualquier cambio en la persistencia o estructura del código.

---

## 9. Desviaciones Actuales de la Visión

*   **Persistencia en Memoria Legacy:** El uso de `sql.js` en `apps/api-legacy` es una solución provisional del prototipo que escribe síncronamente el archivo entero a disco. Debe ser migrado a accesos nativos SQLite vía Prisma ORM.
*   **Servicio de Exportación Desactualizado:** `apps/api-legacy/src/services/exportService.ts` no incluye las nuevas columnas segmentadas de comida y sigue usando campos deprecados.
*   **Autocompletado en LocalStorage:** El autocompletado de los comboboxes se guarda localmente en el navegador (`localStorage`) a través de `useCustomOptions.ts`. Esta información es volátil y debería guardarse en la persistencia local de la base de datos SQLite.
*   **Ausencia de Tests Automatizados:** No existen tests en el repositorio, delegando toda validación al chequeo de tipos estático de TypeScript.
