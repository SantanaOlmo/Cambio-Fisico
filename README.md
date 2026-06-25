# CambioFísico

Herramienta personal local-first para registrar experiencias, conservar memoria y ganar perspectiva sobre la propia vida.

CambioFísico ayuda a una persona a mantenerse consciente de su situación, comprender cómo está evolucionando y decidir con mayor claridad hacia dónde quiere dirigirse.

No es simplemente una aplicación de fitness, un contador de calorías ni un diario de salud.

> La memoria existe para construir el futuro, no para archivar el pasado.

---

## Estado actual

El proyecto se encuentra en transición.

Actualmente existe una aplicación web local compuesta por:

* una interfaz web con React y Vite;
* una API local con Express;
* persistencia SQLite basada en `sql.js`;
* recetas, entradas diarias, fotos y exportaciones locales.

Este sistema sigue siendo ejecutable y útil como referencia, prototipo y fuente de datos heredada.

La dirección del producto es construir progresivamente una aplicación móvil local-first. La aplicación móvil todavía no está implementada y no debe asumirse como parte ejecutable del repositorio actual.

En esta etapa no forman parte del producto:

* backend remoto;
* autenticación;
* cuentas de usuario;
* sincronización multi-dispositivo;
* nube obligatoria;
* IA avanzada;
* wearables;
* funcionalidades sociales.

---

## Ejecutar la aplicación web heredada

### Requisitos

* Node.js 18 o superior.
* pnpm.

Para instalar pnpm globalmente:

```bash
npm install -g pnpm
```

### Instalación

Desde la raíz del repositorio:

```bash
pnpm install
```

### Desarrollo

Para iniciar la aplicación web y la API local:

```bash
pnpm dev
```

Servicios disponibles durante el desarrollo:

* Aplicación web: `http://localhost:5173`
* API local heredada: `http://localhost:3001`

La guía detallada para ejecutar, depurar y mantener este sistema está en:

[`docs/engineering/legacy-web-development.md`](docs/engineering/legacy-web-development.md)

---

## Datos locales

La aplicación web heredada guarda sus datos localmente en la carpeta `data/` de la raíz del repositorio.

```text
data/
├── fitness.sqlite
└── photos/
```

Esta carpeta no debe versionarse en Git.

Para crear una copia de seguridad del sistema heredado, copia la carpeta `data/` completa a una ubicación segura.

El formato actual de estos datos pertenece al sistema web heredado. No debe asumirse que será el modelo de persistencia definitivo de la futura aplicación móvil.

Consulta:

* [`docs/engineering/legacy-web-schema.md`](docs/engineering/legacy-web-schema.md)
* [`docs/engineering/legacy-web-development.md`](docs/engineering/legacy-web-development.md)

---

## Estructura del repositorio

```text
CambioFisico/
├── apps/
│   ├── web/                  Aplicación web heredada
│   └── api-legacy/           API Express heredada
│
├── packages/                 Código compartido cuando exista y esté justificado
│
├── docs/
│   ├── product/              Filosofía, modelo mental y discoveries
│   ├── engineering/          Dirección técnica y sistema heredado
│   ├── adr/                  Decisiones técnicas registradas
│   └── archive/              Documentación histórica
│
└── data/                     Datos locales generados por el sistema heredado
```

No se deben crear paquetes, aplicaciones o capas de infraestructura por anticipación. La estructura crecerá a partir de necesidades reales de producto y uso.

---

## Documentación

### Producto

* [`ai_context.md`](ai_context.md)
  Contexto operativo del proyecto para desarrollo asistido por IA.

* [`docs/product/mental-model.md`](docs/product/mental-model.md)
  Filosofía del producto: persona, experiencias, memoria, contexto, comprensión y perspectiva.

* [`docs/product/discoveries/`](docs/product/discoveries/)
  Descubrimientos provisionales que influyen en decisiones de producto.

### Ingeniería — Dirección vigente

* [`docs/engineering/technology-direction.md`](docs/engineering/technology-direction.md)
  Dirección tecnológica actual y criterios para introducir dependencias o infraestructura.

* [`docs/adr/`](docs/adr/)
  Decisiones técnicas registradas. Los ADRs deben interpretarse según su estado actual y pueden requerir revisión cuando contradigan la dirección de producto vigente.

### Ingeniería — Sistema heredado

* [`docs/engineering/legacy-web-development.md`](docs/engineering/legacy-web-development.md)
  Cómo ejecutar, depurar y mantener la aplicación web existente.

* [`docs/engineering/legacy-web-schema.md`](docs/engineering/legacy-web-schema.md)
  Esquema SQLite e interfaces del sistema web heredado.

* [`docs/engineering/legacy-web-api.md`](docs/engineering/legacy-web-api.md)
  Endpoints HTTP del backend Express heredado.

Los documentos `legacy-web-*` describen el sistema existente. No son la fuente de verdad para producto, UX, modelo de dominio, aplicación móvil ni arquitectura futura.

---

## Principios de desarrollo

Antes de proponer o implementar una funcionalidad, debe poder responderse:

1. ¿Reduce fricción para una persona que quiere registrar algo real?
2. ¿Ayuda a conservar memoria, crear contexto o aportar perspectiva?
3. ¿Respeta privacidad, autonomía y funcionamiento local?
4. ¿Simplifica el producto y el código en lugar de añadir una hipótesis futura?
5. ¿Responde a una necesidad validada o solo a una posibilidad técnica?

Registrar no es el objetivo. Comprender sí.

La experiencia debe sentirse integrada y continua para la persona, aunque el código utilice estructuras técnicas separadas cuando aporten claridad.
