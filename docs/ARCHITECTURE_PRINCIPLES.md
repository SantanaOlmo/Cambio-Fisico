# Principios de Arquitectura — CambioFísico

Este documento establece las directrices de ingeniería de software que rigen todas las decisiones de diseño y desarrollo en el ecosistema de **CambioFísico**. Todo desarrollador o IA que trabaje en esta base de código debe acatar de forma estricta estos principios.

---

## 1. Offline First
*   **Principio:** Toda funcionalidad de registro y consulta de datos debe operar sin conexión a internet de forma predeterminada siempre que sea técnicamente viable.
*   **Regla:** La sincronización con la nube es una mejora futura (opt-in), nunca una condición obligatoria para usar la aplicación. La interfaz de usuario no debe quedar inutilizada por la falta de conexión a red.

## 2. API First
*   **Principio:** La verdad y las reglas de negocio viven exclusivamente en el backend (API).
*   **Regla:** Las aplicaciones cliente (web y móvil) actúan como capas de presentación y almacenamiento local. No deben contener lógica de cálculo de marcas de tiempo lógicas, validación de negocio profunda, ni toma de decisiones estructurales. Consumen e interactúan con contratos de datos de la API.

## 3. Shared Contracts (Contratos Compartidos)
*   **Principio:** Evitar la duplicación de código en la frontera cliente-servidor.
*   **Regla:** Los tipos TypeScript de datos, las interfaces DTO y los esquemas de validación Zod se definen y mantienen en un único paquete común (`packages/shared`). Nunca se duplican interfaces ni validadores en `web`, `mobile` o `api`.

## 4. Type Safety Estricto
*   **Principio:** Tipado fuerte extremo de extremo a extremo.
*   **Regla:** Se prohíbe el uso de `any` o de casteos inseguros (`as unknwon as X`) a menos que sea estrictamente necesario para interactuar con librerías externas sin tipos. Toda comunicación entre componentes, funciones, servicios y capas HTTP debe estar debidamente tipada en tiempo de compilación.

## 5. Clean Architecture (Separación de Responsabilidades)
*   **Principio:** Baja cohesión de dependencias cruzadas y acoplamiento débil.
*   **Regla:** El dominio del negocio, la infraestructura (base de datos, red, almacenamiento físico), la presentación (React) y la persistencia de datos deben estar desacoplados. Ningún componente visual React debe contener código SQL nativo o llamadas fetch directas (se encapsulan en hooks y clientes de API).

## 6. Evolución Gradual (Sin Big Bangs)
*   **Principio:** Los cambios arquitectónicos se realizan de manera incremental y controlada.
*   **Regla:**
    *   **Backend:** La migración de Express a NestJS se realiza en paralelo. Ambas APIs coexisten en desarrollo y los endpoints se portan de forma progresiva.
    *   **Base de Datos:** SQLite se mantiene como base de datos por defecto. El salto a PostgreSQL queda bloqueado hasta que existan necesidades reales de sincronización multi-dispositivo y múltiples cuentas.

## 7. Simplicidad (Evitar Overengineering)
*   **Principio:** Elegir siempre la solución más simple que cumpla con los requisitos actuales de forma correcta sin bloquear la evolución futura.
*   **Regla:** No introducir tecnologías, patrones de diseño complejos (como microservicios, Event Sourcing, CQRS o caché distribuida) hasta que el tamaño del producto, el volumen de usuarios o los cuellos de botella reales lo exijan formalmente.

## 8. Documentación Obligatoria (ADRs)
*   **Principio:** Toda decisión técnica de peso debe justificarse de manera transparente y quedar registrada en un Architecture Decision Record (ADR).
*   **Regla:** Las justificaciones tecnológicas no se confían a la memoria o conversaciones informales; se escriben en el directorio `docs/adr/` describiendo el problema, las alternativas evaluadas y las consecuencias de la elección.
