# Contexto de IA — Proyecto CambioFísico

> **CambioFísico no pretende registrar datos. Pretende convertir experiencias cotidianas en conocimiento útil para ayudar a una persona a tomar mejores decisiones sobre su vida.**

Este documento constituye la fuente de contexto permanente para cualquier Inteligencia Artificial (o desarrollador) que deba analizar, mantener, depurar o extender el repositorio de **CambioFísico**. Sintetiza la identidad del producto, la filosofía de diseño, el dominio conceptual, la arquitectura técnica básica y las reglas de desarrollo del monorrepo.

---

## 1. Identidad del Proyecto

*   **Qué es:** Una plataforma personal modular orientada al bienestar y la autocomprensión. No es una aplicación de gimnasio ni un simple contador de calorías.
*   **Propósito:** Unificar de forma orgánica los aspectos cotidianos que rigen la vitalidad de una persona (sueño, nutrición, actividad física, bienestar subjetivo y mental) para revelar patrones cruzados, manteniendo la privacidad absoluta de los datos en local.
*   **Modularidad Orgánica:** El sistema arranca resolviendo necesidades inmediatas de salud y fitness, pero su diseño conceptual permite añadir nuevos módulos (viajes, lectura, productividad, etc.) de manera pasiva y solo cuando exista una necesidad humana real.

---

## 2. Filosofía del Producto y Principios de Diseño

### Principios del Producto
*   **Resolver problemas reales primero:** Cada nueva capacidad técnica debe estar justificada porque soluciona una necesidad real del usuario, nunca porque "queda bien".
*   **Desarrollo incremental y modular:** Mantener pocas decisiones irrevocables. La mejor arquitectura es la más sencilla que soporte la extensión modular del sistema.
*   **Offline-First y Privacidad absoluta:** Los datos y fotos pertenecen exclusivamente al disco local del usuario. La aplicación debe funcionar al 100% en sótanos de gimnasio o zonas sin cobertura.
*   **IA como acompañante silencioso:** La IA no es un chatbot. Es una capa pasiva que procesa el lenguaje natural libre de fricción y genera correlaciones útiles.
*   **Excelente UX sensorial:** Las micro-interacciones, animaciones y fluidez visual son requisitos funcionales obligatorios para motivar la consistencia en el registro.

### Brújula de Diseño de Funcionalidades
Cada nueva característica o cambio debe cumplir **al menos una** de estas condiciones:
*   Reduce la fricción de entrada de datos.
*   Ayuda a recordar hábitos o momentos clave.
*   Ayuda a comprender relaciones (ej. cómo influye el sueño en el rendimiento).
*   Ayuda a mejorar la salud o marcas personales.
*   Reduce el esfuerzo mental del usuario.
*   Hace agradable una tarea repetitiva.
*   Genera motivación interna y no intrusiva.
*   Conecta información previamente aislada.

---

## 3. Capa de Producto (¿Qué queremos construir?)

*   **Timeline de Vida:** El feed cronológico unificado donde confluyen todos los acontecimientos diarios registrados por el usuario.
*   **El Recetario Interactivo:** Un espacio culinario que se siente como cocinar con alguien, no como leer un PDF estático (con guías legibles paso a paso, temporizadores de un toque y control simple sin manos).
*   **El Entrenador Silencioso:** Un registro rápido de rutinas de fuerza que actúa como un guía discreto en el gimnasio (minimizando clics y apoyándose en feedback de vibración háptico).
*   **Estadísticas Narrativas:** Gráficos interpretados que cuentan historias en lenguaje humano al usuario cruzando variables de su vida, en lugar de pintar líneas frías aisladas.

---

## 4. Capa de Dominio (¿Cómo pensamos el problema?)

*   **Usuario:** El individuo central de la plataforma con sus configuraciones básicas y metas.
*   **Día (Timeline Entry):** La unidad básica que encapsula un día en la vida del usuario (fecha, sueño, bienestar subjetivo, notas y foto de progreso).
*   **Comida (Meal) & Receta (Recipe):** Las ingestas del día y la estructura culinaria de referencia. Una receta sirve de plantilla para las comidas del Timeline.
*   **Sesión de Entrenamiento (Workout):** El registro físico de una actividad de fuerza o cardio asociada a una fecha concreta.

*Nota: No diseñamos de forma prematura identidades multiusuario ni complejas infraestructuras de sincronización web hasta que el producto requiera resolver esos problemas específicos.*

---

## 5. Capa de Tecnología (¿Cómo lo implementamos hoy?)

*   **Monorrepo (pnpm workspaces + Turborepo):**
    *   `apps/web`: Aplicación web frontend React (Vite + TypeScript + Tailwind CSS).
    *   `apps/api-legacy`: API Express en Node.js.
*   **Persistencia:** Base de datos local SQLite. Actualmente se utiliza SQLite en memoria via WebAssembly (`sql.js`) que vuelca el buffer completo a la carpeta `/data` en la raíz del repositorio tras cada escritura.
*   **Aislamiento de Datos:** El directorio `/data` de la raíz del monorrepo (base de datos local y fotos de progreso) está estrictamente excluido en el `.gitignore` para blindar la privacidad del usuario.

---

## 6. Estado Actual del Proyecto y Roadmap

*   **Estado Actual:** Monorrepo estructurado y compilando sin errores. La aplicación web puede registrar entradas diarias, gestionar recetas en Markdown, enlazar hashtags de recetas en comidas e interpretar tendencias en el Dashboard.
*   **Roadmap Inmediato:**
    *   **EPIC 2 (Próximo paso):** Migrar de `sql.js` en memoria a accesos SQLite locales nativos mediante **Prisma ORM** para simplificar el backend y robustecer la persistencia.
    *   **EPIC 3:** Modularización y extracción de tipos y validadores comunes a un paquete compartido `packages/shared`.
    *   **EPIC 4:** Bootstrap de la aplicación móvil (Expo React Native) compartiendo lógica de negocio con la aplicación web.

---

## 7. Principios para Futuras IA (Instrucciones de Desarrollo)

Cualquier IA que trabaje sobre este repositorio debe cumplir estrictamente las siguientes directrices:

1.  **Favorece la simplicidad:** No propongas bases de datos remotas, microservicios, brokers de eventos o arquitecturas cloud complejas.
2.  **No diseñes soluciones para problemas inexistentes:** No asumas multiusuario, wearables ni integraciones externas en el código actual.
3.  **Mantén el desacoplamiento modular:** Asegúrate de que los módulos (nutrition, recipes, fitness) se conectan al Timeline de manera pasiva y a través de contratos simples.
4.  **No rompas el Offline-First:** Toda funcionalidad de datos debe operar localmente en el dispositivo del usuario sin requerir conexión a internet.
5.  **Piensa como Product Engineer:** La UX, la reducción de fricción y la utilidad real del producto son tan prioritarias como el orden y la arquitectura del código.
6.  **Respeta las decisiones de los ADRs:** Consulta la carpeta `docs/adr/` antes de realizar cambios de infraestructura.

---

## 8. Desviaciones Actuales de la Visión

*   **Persistencia en Memoria Legacy:** El uso de `sql.js` en `apps/api-legacy` es una solución provisional del prototipo que escribe síncronamente el archivo entero a disco. Debe ser migrado a accesos nativos SQLite vía Prisma ORM (EPIC 2).
*   **Servicio de Exportación Desactualizado:** `apps/api-legacy/src/services/exportService.ts` no incluye las nuevas columnas segmentadas de comida y sigue usando campos deprecados.
*   **Autocompletado en LocalStorage:** El autocompletado de los comboboxes se guarda localmente en el navegador (`localStorage`) a través de `useCustomOptions.ts`. Esta información es volátil y debería guardarse en la persistencia local de la base de datos SQLite.
*   **Ausencia de Tests Automatizados:** No existen tests en el repositorio, delegando toda validación al chequeo de tipos estático de TypeScript.
