# ADR-003: Elección de Expo para el Desarrollo Móvil

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
El roadmap del producto CambioFísico contempla lanzar una aplicación móvil nativa (inicialmente en Android, con miras a iOS). El desarrollo nativo clásico (Kotlin/Swift) requiere duplicar el código, la lógica y los tipos, lo cual es ineficiente para el proyecto.

## Problema
¿Qué tecnología móvil utilizar para construir la aplicación nativa optimizando el coste de desarrollo y maximizando la reutilización de código web existente en el monorepo?

## Alternativas Evaluadas

1.  **Desarrollo Nativo (Kotlin/Swift):**
    *   *Ventajas:* Rendimiento y acceso a APIs del sistema nativo sin intermediarios.
    *   *Inconvenientes:* Duplicidad de código y esfuerzo técnico.
2.  **React Native CLI:**
    *   *Ventajas:* Acceso completo a APIs nativas y control absoluto de la configuración nativa de Xcode/Android Studio.
    *   *Inconvenientes:* Configuración compleja, requiere gestionar dependencias nativas complejas y compilar localmente con emuladores pesados de forma obligatoria.
3.  **Expo (React Native Framework) (Elegida):**
    *   *Ventajas:*
        *   **Reutilización de código:** Al basarse en React, permite compartir el paquete de lógica compartida (`packages/shared`), hooks de datos, llamadas API e incluso estilos conceptuales.
        *   **EAS Build & EAS Update:** Simplifica la generación de APKs y bundles de producción en la nube sin requerir máquinas macOS o potentes ordenadores Windows locales, y permite actualizaciones OTA (Over-The-Air) sin pasar por tiendas para corregir fallos menores.
        *   Instalación y ejecución ágil mediante Expo Go en dispositivos reales.
    *   *Inconvenientes:* Dependencia del ecosistema de Expo y limitaciones si se necesita escribir código nativo custom en Objective-C/Java (mitigado hoy con los Config Plugins).

## Decisión
Desarrollar la aplicación móvil utilizando **Expo React Native**.

## Consecuencias
*   **Positivas:**
    *   Sintonía al 100% con la base de código TypeScript/React existente.
    *   Estructura ágil de prototipado rápido y pruebas locales en dispositivos móviles reales.
    *   Facilidad para empaquetar y compilar mediante EAS Build.
*   **Negativas:**
    *   Incremento en el tamaño del bundle inicial de la aplicación nativa en comparación con código nativo puro.
