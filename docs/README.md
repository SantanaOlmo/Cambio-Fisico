# CambioFísico — Documentación del Proyecto

## Índice

1. [Visión General](#1-visión-general)
2. [Dirección Tecnológica](./technology-direction.md)
3. [Arquitectura y Estructura](./ARQUITECTURA.md)
4. [API Reference](./API.md)
5. [Guía de Desarrollo](./DESARROLLO.md)
6. [Modelo Mental](./product/mental-model.md)
7. [Ingeniería — Sistema heredado](#ingeniería-—-sistema-heredado)
8. [Archivo histórico](#archivo-histórico)

---

## 1. Visión General

**CambioFísico** es una aplicación web local de seguimiento de recomposición corporal durante 90 días. Toda la información se almacena **únicamente en el ordenador del usuario**: no hay nube, no hay cuentas, no hay conexión a internet requerida.

### Objetivo personal
- Peso inicial: **76,5 kg** · Altura: **1,72 m**
- Meta: reducir grasa abdominal, volver al gimnasio, mejorar postura y rutina
- Duración: **90 días**

### Qué registra la app

Cada día el usuario puede registrar:
- Peso corporal y datos de sueño
- Tipo y duración del entrenamiento
- Comidas por franja horaria (desayuno, almuerzo, cena, otro)
- Bienestar subjetivo: hinchazón, energía, hambre, ánimo (escala 1–5)
- Notas libres y foto de progreso

### Cómo funciona

```
┌─────────────────────────────────────────────────────────────┐
│  Navegador (localhost:5173)                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  React + TypeScript + Tailwind CSS                  │    │
│  │  (Vite dev server)                                  │    │
│  └─────────────────┬───────────────────────────────────┘    │
│                    │ fetch /api/* (proxy Vite)               │
└────────────────────┼────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  Node.js + Express (localhost:3001)                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Routes → Controllers → Services → Repositories    │     │
│  └────────────────────┬───────────────────────────────┘     │
│                        │                                     │
│  ┌─────────────────────▼──────────────┐                     │
│  │  SQLite (sql.js / WASM)            │                     │
│  │  ../data/fitness.sqlite            │                     │
│  └────────────────────────────────────┘                     │
│  ┌────────────────────────────────────┐                     │
│  │  Fotos: ../data/photos/            │                     │
│  └────────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

### Arrancar la app

```bash
# Terminal 1 — Backend
cd CambioFisico/backend && npm run dev

# Terminal 2 — Frontend
cd CambioFisico/frontend && npm run dev

# Abrir en el navegador:
# http://localhost:5173
```

---

## Archivo histórico

Los siguientes documentos pertenecen a fases anteriores del proyecto y se conservan únicamente como registro de la evolución histórica de CambioFísico. **No deben utilizarse como fuente de verdad para el desarrollo, producto, UX o arquitectura, y no deben cargarse como contexto por defecto para IAs**:

*   [product-discovery-legacy.md](./archive/product-discovery-legacy.md): Documento de Product Discovery original (MVP inicial y roadmap legacy).
*   [product-manifesto-legacy.md](./archive/product-manifesto-legacy.md): Manifiesto de producto original (visión inicial modular y roadmap de negocio legacy).

---

## Ingeniería — Sistema heredado

Los siguientes documentos son referencias técnicas del software y bases de datos construidos para la aplicación web anterior de CambioFísico. **No deben utilizarse para diseñar el modelo de dominio futuro, planificar la base de datos de la aplicación móvil, ni cargarse como contexto por defecto**:

*   [legacy-web-schema.md](./engineering/legacy-web-schema.md): Esquema de base de datos SQLite e interfaces TypeScript de la aplicación web heredada.
