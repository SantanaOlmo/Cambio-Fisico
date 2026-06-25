# ADR-011: Estrategia de Almacenamiento de Archivos (Fotos de Progreso)

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El usuario puede subir fotos diarias de progreso corporal para visualizar su evolución en la galería. Estas imágenes consumen un volumen significativo de almacenamiento y no deben guardarse directamente en base de datos como blobs por rendimiento.

## Problema
¿Dónde y cómo almacenar los archivos de imagen de progreso garantizando privacidad, rendimiento y una fácil transición del almacenamiento local al almacenamiento en la nube?

## Alternativas Evaluadas

1.  **Blobs en Base de Datos:**
    *   *Ventajas:* Copias de seguridad sencillas, todo está en un único archivo SQLite/PostgreSQL.
    *   *Inconvenientes:* Afecta dramáticamente al rendimiento de la base de datos y aumenta el tamaño del fichero de datos de forma desmesurada.
2.  **Servicio de Almacenamiento Remoto Directo (ej: AWS S3, Cloudflare R2):**
    *   *Ventajas:* Descarga al servidor de la API de la gestión de ficheros estáticos, y permite servir imágenes a través de CDNs de forma ultrarrápida.
    *   *Inconvenientes:* Coste económico innecesario en la fase de prototipo local y dependencia obligatoria de conexión a internet para renderizar fotos.
3.  **Local Filesystem (Fase Local) ➔ Abstracción con Storage Service ➔ Object Storage S3 (Fase SaaS) (Elegida):**
    *   *Ventajas:*
        *   **Fase Local/Profesional:** Se guardan las imágenes en la carpeta del disco local `data/photos/` gestionado por Multer en Express/NestJS, permitiendo funcionamiento 100% offline.
        *   **Fase Multiusuario:** Se encapsula el acceso a lectura/escritura en un servicio abstracto (`StorageService`). En producción, este servicio se configurará para guardar y leer del almacenamiento de objetos compatible con AWS S3/Cloudflare R2 sin cambiar el código de los controladores NestJS.
    *   *Inconvenientes:* Requiere implementar un adaptador de almacenamiento para alternar entre el sistema de archivos local y el SDK de S3.

## Decisión
Almacenar las fotos en el **disco local de la máquina de desarrollo** (`data/photos/`) para las fases iniciales, implementando una **abstracción de servicio** que permita migrar a un almacenamiento de objetos **compatible con AWS S3** en producción para las fases SaaS.

## Consecuencias
*   **Positivas:**
    *   Coste cero en almacenamiento durante el desarrollo del prototipo y fase local offline.
    *   Código preparado para migrar a nubes públicas sin refactorizar los controladores.
*   **Negativas:**
    *   Al migrar a la nube, es necesario planificar un script de migración para mover las fotos locales existentes de los usuarios a sus respectivos buckets.
