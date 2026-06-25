# ADR-004: Adopción de Prisma ORM y Retención de SQLite Local

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El prototipo inicial de CambioFísico utiliza SQLite cargado en memoria (`sql.js`) y persiste síncronamente escribiendo a disco el buffer de la base de datos completa tras cada modificación. Aunque se propuso migrar inmediatamente a PostgreSQL, esto añadiría sobrecarga operativa (Docker Compose obligatorio, administración de red y costes de base de datos) cuando el producto está en fase inicial y opera localmente de forma monousuario.

## Problema
¿Cómo mejorar el rendimiento de escritura de la base de datos, estructurar el acceso de datos de forma asíncrona y tipada, y facilitar la futura migración a PostgreSQL sin añadir complejidad de red prematura?

## Alternativas Evaluadas

1.  **Migración inmediata a PostgreSQL:**
    *   *Ventajas:* Preparado para multiusuario e infraestructura SaaS desde el día uno.
    *   *Inconvenientes:* Pérdida de portabilidad local y complejidad de desarrollo inicial innecesaria.
2.  **Permanencia con SQLite y adopción de Prisma ORM (Elegida):**
    *   *Ventajas:*
        *   **Ligereza de SQLite:** Mantenemos la base de datos local guardada en un simple fichero físico (`fitness.sqlite`), facilitando backups manuales y operando de forma offline pura sin levantar servicios adicionales en el host.
        *   **Prisma ORM como capa de abstracción:** Al modelar las tablas en `schema.prisma` y utilizar Prisma Client para las consultas locales en SQLite, logramos acceso de base de datos asíncrono y fuertemente tipado.
        *   **Transición futura directa:** Cuando llegue el momento de escalar a la nube (Fase Multiusuario), la migración a PostgreSQL se resolverá cambiando el `provider = "postgresql"` en `schema.prisma` y generando la migración correspondiente, sin requerir reescribir consultas SQL en el código de la API backend.
    *   *Inconvenientes:* SQLite no está diseñado para albergar concurrencia masiva en la nube ni de forma distribuida.

## Decisión
**Mantener SQLite** como base de datos por defecto durante las primeras fases locales de CambioFísico, y **bloquear la migración a PostgreSQL** hasta que se requiera soporte multiusuario e infraestructura cloud. Adoptar **Prisma ORM** para definir los esquemas, gestionar migraciones locales y realizar el acceso asíncrono tipado desde la API de NestJS.

## Consecuencias
*   **Positivas:**
    *   Entorno de desarrollo local ágil y ligero (sin dependencias obligatorias de Docker Compose de bases de datos).
    *   Código de la API backend desacoplado de dialectos SQL nativos.
    *   Facilidad para que el usuario realice backups copiando un único archivo.
*   **Negativas:**
    *   Es necesario adaptar la persistencia de `sql.js` (Express) a Prisma Client (NestJS) de forma incremental.
