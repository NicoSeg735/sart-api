# sart-api

## Descripción

`sart-api` es una API desarrollada con TypeScript en Node.js, utilizando Express para construir su API.

## Requisitos Previos

- Node.js (versión 14 o superior)
- pnpm (gestor de paquetes)

## Instalación

1. Clona el repositorio:

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd sart-api
   ```

2. Instala las dependencias:
   ```sh
   pnpm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
   ```env
   DATABASE_URL=<tu_url_de_base_de_datos>
   ```

## Levantar el Proyecto en Desarrollo

1. Genera las migraciones:

   ```sh
   pnpm migration:generate
   ```

2. Ejecuta las migraciones:

   ```sh
   pnpm migration:run
   ```

3. Inicia el servidor en modo desarrollo:
   ```sh
   pnpm dev
   ```

El servidor se levantará en el puerto especificado en tu archivo `.env`.

## Scripts Disponibles

- `pnpm compile`: Compila el código TypeScript.
- `pnpm build`: Linter y compilación del código.
- `pnpm start`: Ejecuta las migraciones y luego inicia el servidor.
- `pnpm dev`: Inicia el servidor en modo desarrollo con nodemon.
- `pnpm lint`: Ejecuta ESLint para corregir automáticamente los errores de estilo.
- `pnpm migration:generate`: Genera nuevas migraciones.
- `pnpm migration:run`: Ejecuta las migraciones.
- `pnpm migration:revert`: Revierte la última migración ejecutada.

## Licencia

ISC
