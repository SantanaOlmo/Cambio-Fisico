# CambioFísico — Documentación del Proyecto

## Índice

1. [Visión General](#1-visión-general)
2. [Tecnologías y Dependencias](./TECNOLOGIAS.md)
3. [Arquitectura y Estructura](./ARQUITECTURA.md)
4. [Modelos de Datos](./MODELOS.md)
5. [API Reference](./API.md)
6. [Guía de Desarrollo](./DESARROLLO.md)
7. [Modelo Mental](./product/mental-model.md)

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
