# Non-Goals (Tecnologías Descartadas Temporalmente) — CambioFísico

Este documento detalla de forma explícita las arquitecturas, patrones de diseño y tecnologías que **NO** se implementarán en las fases actuales de **CambioFísico**. 

Su inclusión aquí no implica que se descarten para siempre; significa que su incorporación prematura añadiría una complejidad técnica innecesaria (overengineering) que va en contra del principio de **simplicidad y evolución gradual**.

---

## Patrones de Arquitectura e Infraestructura Descartados

### 1. Orquestación y Contenedores Complejos (Kubernetes)
*   **Motivo:** Actualmente, el backend opera localmente y a futuro en una sola instancia de servidor en la nube (ej: VPS en Hetzner o AWS EC2 simple). Gestionar clústeres de Kubernetes (K8s), Helm charts o service meshes añade costes operativos y de configuración inmensos sin necesidad real.
*   **Alternativa actual:** Docker Compose local para desarrollo y despliegues mediante contenedores Docker independientes.

### 2. Arquitectura de Microservicios
*   **Motivo:** Dividir el backend en microservicios independientes introduce problemas de consistencia eventual, latencia de red, serialización compleja y despliegues distribuidos difíciles de depurar.
*   **Alternativa actual:** API Monolítica Modular en NestJS. Los módulos (users, entries, recipes, auth) se comunican en memoria mediante inyección de dependencias nativa, garantizando un despliegue unificado y mantenible.

### 3. CQRS (Command Query Responsibility Segregation)
*   **Motivo:** Separar las lecturas de las escrituras en bases de datos independientes mediante buses de eventos sólo tiene sentido para sistemas con millones de operaciones por segundo o requisitos de lectura extremos. Añade una gran cantidad de boilerplate y código repetitivo.
*   **Alternativa actual:** CRUD directo a través de Prisma ORM sobre SQLite (y PostgreSQL en el futuro) empleando una única base de datos transaccional.

### 4. Event Sourcing y Event Bus (Kafka, RabbitMQ)
*   **Motivo:** No es necesario almacenar el histórico completo de eventos de modificación ni gestionar colas de mensajería asíncrona distribuida. Los eventos locales se procesan mediante controladores síncronos y asíncronos en Node.
*   **Alternativa actual:** Empleo de EventEmitter interno de NestJS si se necesita desacoplar algún proceso asíncrono secundario.

### 5. Caché Distribuida y Almacenes NoSQL (Redis, MongoDB)
*   **Motivo:** SQLite en memoria o persistido localmente responde en menos de 1 milisegundo a las consultas de un usuario local. Introducir Redis para almacenar sesiones o MongoDB para recetas añade más dependencias en ejecución sin aportar rendimiento perceptible.
*   **Alternativa actual:** Persistencia e indexación relacional en SQLite. Almacenamiento de sesiones mediante tokens firmados encriptados (JWT).

### 6. Arquitecturas Serverless Complejas (AWS Lambda)
*   **Motivo:** Los arranques en frío (cold starts) y la dificultad para depurar funciones serverless locales entorpecen la experiencia de desarrollo (DX).
*   **Alternativa actual:** Servidor backend tradicional Express / NestJS persistente en ejecución.
