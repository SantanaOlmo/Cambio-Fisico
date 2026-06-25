# ADR-010: Estrategia de Autenticación y Autorización

*   **Estado:** Aprobado
*   **Fecha:** 2026-06-25

---

## Contexto
En las fases iniciales local y profesional, CambioFísico carece de autenticación. Sin embargo, para escalar a un SaaS multiusuario se necesita identificar de forma inequívoca al propietario de cada registro y proteger el acceso a las APIs.

## Problema
¿Qué mecanismo de autenticación y gestión de sesiones implementar para asegurar que el sistema sea seguro, inmune a ataques XSS/CSRF comunes y escalable a clientes web y móviles?

## Alternativas Evaluadas

1.  **Sesiones en Servidor tradicionales (Session Cookies):**
    *   *Ventajas:* Muy seguro y fácil de invalidar desde el backend.
    *   *Inconvenientes:* Requiere mantener un almacén de sesiones en el servidor (Redis/Base de datos), lo que penaliza la escalabilidad stateless de la API, y es difícil de consumir en clientes móviles que no admiten cookies de forma nativa estándar sin configuraciones extra.
2.  **JWT en LocalStorage (Tokens en cliente):**
    *   *Ventajas:* Totalmente stateless, fácil de implementar en web y móvil.
    *   *Inconvenientes:* Vulnerable a ataques de secuestro de sesión a través de Cross-Site Scripting (XSS). Si un script malicioso se inyecta en el navegador, puede robar el JWT del LocalStorage.
3.  **Estrategia Híbrida: JWT stateless + Cookies HttpOnly Secure (Web) & Authorization Header (Móvil) (Elegida):**
    *   *Ventajas:*
        *   **Web:** El Token de acceso (Access Token) se envía en memoria y el Token de refresco (Refresh Token) viaja en una cookie `HttpOnly`, `Secure` y `SameSite=Strict`, haciéndolo inaccesible para scripts JS del navegador (protección XSS total).
        *   **Móvil:** Al no tener vulnerabilidades de XSS mediante scripts inyectados en navegador, la app móvil puede almacenar de forma segura los tokens en el llavero seguro nativo del dispositivo (`SecureStore` en Expo) y transmitirlos mediante cabeceras HTTP `Authorization: Bearer <token>`.
    *   *Inconvenientes:* Requiere que el backend gestione dos flujos de lectura de credenciales diferentes según el cliente.

## Decisión
Implementar un sistema de autenticación basado en **JWTs y Refresh Tokens**. En entornos web se almacenarán mediante **cookies seguras HttpOnly**, y en la aplicación móvil mediante **Expo SecureStore** transmitidos en cabeceras de autorización. Las contraseñas se hashearán utilizando **Argon2** o **bcrypt**.

## Consecuencias
*   **Positivas:**
    *   Arquitectura robusta y alineada con los estándares de seguridad modernos de la industria (protección XSS/CSRF).
    *   API stateless escalable que no sobrecarga la base de datos para validar sesiones de usuario.
*   **Negativas:**
    *   Implementación compleja del flujo de refresco de tokens silencioso (Silent Refresh) en el cliente.
