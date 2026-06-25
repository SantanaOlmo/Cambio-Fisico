# ADR-009: Elección y Roadmap de Persistencia (Base de Datos)

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El prototipo inicial de CambioFísico utiliza SQLite cargado en memoria (`sql.js`). Para la fase profesional se planteó migrar inmediatamente a PostgreSQL. Sin embargo, CambioFísico nace como una aplicación local monousuario. Introducir PostgreSQL de inmediato añadiría una sobrecarga operativa (Docker Compose obligatorio en desarrollo local, configuraciones de red, mantenimiento del DBMS y costes de servidor) antes de que exista una necesidad técnica real.

## Problema
¿Qué base de datos utilizar durante las primeras fases de desarrollo y cuál es la estrategia para dar soporte al futuro escalado multiusuario sin añadir complejidad innecesaria en el presente?

## Alternativas Evaluadas

1.  **Migración inmediata a PostgreSQL:**
    *   *Ventajas:* Listo para multiusuario desde el día uno.
    *   *Inconvenientes:* Complejidad de infraestructura prematura (overengineering), pérdida de portabilidad de la app local sin Docker y lentitud de configuración en local.
2.  **Permanencia con SQLite nativo / Prisma ORM (Elegida):**
    *   *Ventajas:*
        *   **Portabilidad y ligereza:** SQLite guarda todo en un simple archivo de base de datos local. No requiere arrancar demonios de bases de datos de fondo.
        *   **Migración simplificada con Prisma ORM:** Al utilizar Prisma como capa de abstracción, podemos modelar las tablas de SQLite en local. Cuando llegue el momento de escalar a PostgreSQL, sólo habrá que cambiar el `provider = "postgresql"` en el `schema.prisma` y correr las migraciones, sin alterar una sola línea de código SQL en la API backend.
    *   *Inconvenientes:* SQLite carece de soporte de concurrencia a escala SaaS y de tipado estricto nativo de ciertos tipos complejos.

## Decisión
**SQLite** se mantiene como la base de datos oficial del producto durante las fases local y profesional. La migración a **PostgreSQL** queda congelada e inactiva hasta que se inicien los desarrollos de la Fase Multiusuario (cuentas de usuario concurrentes y sincronización cloud remota). Para atenuar la deuda técnica, se adoptará **Prisma ORM** para definir los esquemas y realizar accesos tipados a base de datos.

## Consecuencias
*   **Positivas:**
    *   Desarrollo local extremadamente rápido y ligero, sin infraestructura Docker obligatoria para programar.
    *   Capa de abstracción segura con Prisma que garantiza que la base de código no dependa de dialectos SQL nativos de SQLite.
    *   Facilidad para que el usuario realice backups manuales simplemente copiando el archivo `.sqlite`.
*   **Negativas:**
    *   Es necesario adaptar la persistencia de `sql.js` (en memoria con volcado manual síncrono) hacia la persistencia estándar y asíncrona que ofrece Prisma con SQLite.
