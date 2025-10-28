# ⚙️ Guía de Instalación y Configuración del Backend

Sigue estos pasos detallados para configurar y ejecutar el servicio `nexo_backend` en tu máquina local.

## 1. Requisitos Previos (Software Esencial)

Necesitas las siguientes herramientas instaladas para que el Backend funcione correctamente.

### 1.1. Node.js y npm

* **¿Qué es?** El entorno de ejecución de JavaScript y su gestor de paquetes. Es el pilar de nuestro Backend.
* **Instalar:**
    * Descarga la versión LTS (Recomendada) desde [Node.js Official Website](https://nodejs.org/).
    * Verifica la instalación en tu terminal: `node -v` y `npm -v`.

### 1.2. PostgreSQL

* **¿Qué es?** El sistema de gestión de base de datos relacional donde se almacenarán todos los datos de la biblioteca (libros, usuarios, etc.).
* **Instalar:**
    * Descarga el instalador o sigue las instrucciones de la comunidad: [PostgreSQL Official Website](https://www.postgresql.org/download/).
    * **Acción Requerida:** Después de instalar, debes crear:
        1.  La base de datos: `biblioteca`
        2.  El usuario de la base de datos: `bibliotecausr` (con la contraseña que desees).

### 1.3. Git (Opcional, pero Recomendado)

* **¿Qué es?** Sistema de control de versiones necesario si vas a trabajar con GitHub o cualquier otro repositorio.
* **Instalar:**
    * Descarga e instala desde [Git Official Website](https://git-scm.com/downloads).

## 2. Configuración del Entorno de Desarrollo

### Paso 2.1: Clonar e Instalar Dependencias

Navega a la carpeta del Backend e instala todos los paquetes de Node.js requeridos (Express, Prisma, bcryptjs, etc.):

```bash
cd biblioteca-proy/nexo_backend
npm install
```
### Paso 2.2: Configurar Variables de Entorno
Crea el archivo .env en la raíz del directorio nexo_backend/ y añade las siguientes variables. Debes reemplazar los valores placeholders:
```Markdown
1. Cadena de conexión a PostgreSQL
Asegúrate de usar el usuario y la contraseña que configuraste.
DATABASE_URL="postgresql://bibliotecausr:[TU_PASSWORD]@localhost:5432/biblioteca?schema=public"

2. Clave secreta para firmar los tokens JWT (MANDATORIO)
JWT_SECRET="mi-clave-ultra-secreta-de-desarrollo"

3. Puerto del servidor
PORT=3000
```
## 3. Inicialización de la Base de Datos (Prisma)
Prisma es nuestro ORM (Object-Relational Mapper) que conecta Node.js con PostgreSQL.

### Paso 3.1: Ejecutar Migraciones
Las migraciones de Prisma crean las tablas (Usuario, Libro, etc.) definidas en schema.prisma en tu base de datos biblioteca.
```bash
npx prisma migrate dev --name init
```
### Paso 3.2: Sembrar Datos Iniciales
Ejecuta el script de "seeding" para poblar las tablas estáticas o de referencia (Genero y Pais):
```bash
npx ts-node prisma/seed.ts
```
## 4. Iniciar el Servidor
Una vez que las dependencias y la base de datos están listas, puedes iniciar el servidor:
```bash
npm run dev
```
El servidor de la API estará escuchando en http://localhost:3000.