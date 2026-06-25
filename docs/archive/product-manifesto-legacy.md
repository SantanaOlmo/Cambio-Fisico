> [!WARNING]
> ## Documento histórico — No usar como fuente de verdad
>
> Este documento pertenece a una fase anterior de CambioFísico.
>
> Contiene decisiones, hipótesis y direcciones de producto que pueden estar obsoletas, contradichas o pendientes de validación.
>
> No debe utilizarse como fuente de verdad para producto, UX, arquitectura ni implementación.
>
> Las fuentes vigentes son:
>
> - `ai_context.md`
> - `docs/product/mental-model.md`
> - `docs/product/discoveries/`
> - `docs/adr/`
>
> Se conserva únicamente como registro histórico de la evolución del proyecto.

# Manifiesto de Producto — CambioFísico

## 1. ¿Qué es CambioFísico?
**CambioFísico** no es simplemente una aplicación de fitness, un recetario o un registro de peso. Es el punto de partida de una **plataforma modular personal-first** diseñada para registrar, comprender y optimizar la vida del usuario mediante datos, experiencia de usuario premium e inteligencia artificial integrada.

## 2. El problema que resuelve
Hoy en día, las personas que buscan monitorizar su vida para mejorar su bienestar se enfrentan a un ecosistema fragmentado:
*   Usan una app para contar calorías o buscar recetas.
*   Otra app independiente para registrar entrenamientos de fuerza.
*   Una tercera para monitorizar el sueño o la salud digestiva.
*   Notas sueltas o carpetas locales para almacenar fotos de progreso físico.

Esta fragmentación impide cruzar datos, genera fatiga por el uso de múltiples herramientas y diluye el contexto. CambioFísico unifica estos registros bajo un único **timeline personal**, manteniendo la privacidad absoluta de los datos de forma local.

## 3. Por qué no es solo una app de fitness: La Plataforma Modular Personal
CambioFísico está estructurada bajo el concepto de **Core Platform + Feature Modules**. 
El **Core** provee los cimientos del sistema (sistema de persistencia local, timeline cronológico, motor de analíticas, integraciones de IA y patrones comunes de interfaz). Sobre este núcleo se pueden conectar o desconectar módulos funcionales independientes según las necesidades reales del usuario.

El producto empieza resolviendo necesidades de **salud, nutrición, recetas y entrenamiento**. Sin embargo, la arquitectura está concebida para alojar en el futuro módulos de naturalezas completamente distintas (ej. bitácora de viajes, registro de aprendizaje, productividad diaria o bienestar mental) sin necesidad de reescribir el núcleo del sistema.

## 4. El usuario inicial y la evolución del mercado
*   **Usuario Inicial (Fase Actual):** Una persona proactiva que busca registrar su recomposición física durante un reto de 90 días con privacidad absoluta y desde su propio ordenador local.
*   **Evolución Familiar/Pacientes (Fase Multiusuario):** Escalado para permitir que entrenadores personales o fisioterapeutas realicen el seguimiento de sus clientes/pacientes, o que miembros de una misma familia compartan métricas de salud y recetas de forma colaborativa.
*   **SaaS Comercial (Fase SaaS):** Una plataforma de suscripción cloud multiplataforma dirigida al mercado de la salud digital preventiva, combinando autogestión de hábitos y gamificación.

## 5. El papel de la Inteligencia Artificial (IA)
En lugar de ser un añadido cosmético, la IA actúa como un **acelerador de contexto y motivador cognitivo**:
*   **Comprensión semántica:** Procesamiento de lenguaje natural para registrar comidas sin forzar al usuario a buscar ingredientes exactos en bases de datos genéricas de miles de elementos.
*   **Contexto unificado:** La IA consume el *AI Context* generado por el timeline de hábitos cruzados (sueño, digestión, entrenamiento) para ofrecer consejos motivacionales altamente personalizados (ej: *"Hemos detectado que cuando duermes menos de 7 horas, tu nivel de energía en el gimnasio decae un 20% y tu hinchazón digestiva aumenta. Prioriza el descanso hoy"*).

## 6. La Experiencia de Usuario (UX) y el Diseño Visual
Un tracker tradicional se siente como una hoja de cálculo fría y aburrida, lo que fomenta el abandono del registro. En CambioFísico, la UX y el diseño premium son **requisitos funcionales críticos**:
*   **Micro-interacciones y Feedback visual:** La transición del Dark Mode, las animaciones fluidas y los inputs personalizados superpuestos (como el resaltador de hashtags en comidas) transforman el registro diario de una obligación a una experiencia interactiva placentera.
*   **Reducción de fricción:** El uso de autocompletados predictivos inteligentes que aprenden del historial del usuario (comboboxes locales) minimiza el número de clics requeridos para guardar un día.

## 7. Qué NO debe intentar hacer la app todavía (Non-Goals de Producto)
Para evitar la parálisis por análisis y el desarrollo de características inútiles:
*   **NO** implementaremos redes sociales ni muros comunitarios.
*   **NO** integraremos bases de datos de alimentos comerciales en la nube de terceros.
*   **NO** crearemos integraciones automáticas con wearables (Apple Watch, Fitbit) en estas fases.
*   **NO** añadiremos pasarelas de pago ni suscripciones premium en local.
*   **NO** desarrollaremos herramientas de edición de fotos.

El foco de desarrollo hoy está estrictamente limitado a construir cimientos robustos del monorepo, pulir el Timeline de hábitos y recetas, y garantizar que la transición local a multiplataforma sea perfecta.
