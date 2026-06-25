# Guía de Desarrollo

Detalles prácticos para extender o depurar CambioFísico localmente.

---

## 1. Configuración de Entorno

Tanto el frontend como el backend tienen su configuración y dependencias en carpetas separadas.

### Servidor Local
- El backend corre un servidor Express en el puerto `3001` (por defecto).
- En `backend/src/config.ts` se puede ajustar el puerto y las rutas relativas para guardar fotos y SQLite.

### Cliente SPA
- El frontend utiliza Vite en el puerto `5173`.
- En `frontend/vite.config.ts` se define el proxy para redirigir peticiones `/api/*` a `localhost:3001` de forma transparente.

---

## 2. Inicialización Automática

Al iniciar el backend (`npm run dev` en `/backend`), el servicio realiza las siguientes comprobaciones automáticas:
1. Crea el directorio `../data/` si no existe.
2. Crea el directorio `../data/photos/` si no existe.
3. Inicializa la base de datos `../data/fitness.sqlite` si no existe, aplicando el schema definido en `backend/src/db/schema.ts`.
4. Ejecuta las migraciones necesarias para añadir nuevas columnas a la tabla `entries` (como los nuevos campos `meal_breakfast`, `meal_lunch`, `meal_dinner`, y `meal_other`) y crear la tabla `recipes`.

---

## 3. Comandos Útiles

### Validar TypeScript (No Emit)
Antes de confirmar cambios, ejecuta el compilador para asegurarte de que no hay fallos de tipado.

- **Frontend:**
  ```bash
  cd frontend
  npx tsc --noEmit
  ```

- **Backend:**
  ```bash
  cd backend
  npx tsc --noEmit
  ```

### Limpieza de Cache en Frontend
Si cambias dependencias o tienes problemas con la pre-optimización de Vite:
```bash
cd frontend
rm -rf node_modules/.vite
npm run dev
```

---

## 4. Buenas Prácticas y Estilo de Código

1. **Separación de Capas:**
   - **DB Helpers** -> **Repositories** -> **Services** -> **Controllers**.
   - Los controladores manejan HTTP. Los servicios manejan tipos y lógica de negocio. Los repositorios manejan consultas SQL directas.
2. **SOLID e Cohesión:**
   - Los componentes de React en `frontend/src/components` son atómicos y enfocados (ej: `RatingInput`, `MealHashtagInput`).
   - Evita mezclar lógica de comunicación API directamente dentro de las secciones del formulario. Usa el cliente centralizado `api` de `frontend/src/api/client.ts`.
