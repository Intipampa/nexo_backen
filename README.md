# 💻 nexo_backend: API RESTful para Biblioteca-Proy

Este directorio contiene el servidor Backend, construido para exponer una API RESTful que gestiona los datos de la biblioteca. Utiliza una arquitectura moderna basada en **Node.js, Express y TypeScript**.

## 🚀 1. Stack Tecnológico

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Runtime** | Node.js (TypeScript) | Entorno de ejecución y tipado estricto. |
| **Framework** | Express | Manejo de rutas, middlewares y CORS. |
| **Base de Datos**| PostgreSQL | Almacenamiento persistente y relacional. |
| **ORM** | Prisma | Cliente de base de datos para modelado y consultas eficientes. |
| **Seguridad** | JWT, bcryptjs | Autenticación y cifrado de contraseñas. |

## 🛠️ 2. Configuración y Ejecución

Para iniciar este servicio, sigue la guía de instalación detallada:

👉 **[Guía de Instalación y Configuración de Backend (INSTALL.md)](./INSTALL.md)**

## 🧠 3. Estructura y Módulos

El backend sigue el patrón **Model-View-Controller (MVC)**.

| Directorio | Propósito | Archivos Clave |
| :--- | :--- | :--- |
| `controllers/` | Contiene la lógica de negocio para cada ruta (manejo de peticiones y respuestas). | `authController.ts`, `librosController.ts` |
| `routes/` | Define los *endpoints* de la API y monta los controladores. | `authRoutes.ts`, `librosRoutes.ts`, `usuario.routes.ts` |
| `prisma/` | Contiene el esquema de la base de datos y scripts de inicialización. | `schema.prisma` |
| `middleware/` | Contiene funciones que se ejecutan antes de los controladores (e.g., verificación JWT). | `authMiddleware.ts` |
| `server.ts` | Punto de entrada principal; inicializa Express y monta las rutas. | - |

## 🔗 4. Endpoints de la API

Todos los endpoints requieren un token JWT válido en el header `Authorization: Bearer <token>` a menos que se indique lo contrario.

| Módulo | Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- | :--- |
| **Autenticación** | `POST` | `/api/auth/registro` | Crea un nuevo usuario. | Público |
| **Autenticación** | `POST` | `/api/auth/login` | Inicia sesión y devuelve un token JWT. | Público |
| **Usuarios** | `GET` | `/api/usuarios` | Lista todos los usuarios. | Autenticado |
| **Usuarios** | `POST` | `/api/usuarios` | Crea un nuevo usuario (por Admin). | Autenticado |
| **Usuarios** | `PUT` | `/api/usuarios/:id` | Actualiza un usuario. | Autenticado |
| **Libros** | `GET` | `/api/libros` | Lista todos los libros. | Autenticado |
| **Libros** | `POST` | `/api/libros` | Crea un nuevo registro de libro. | Autenticado |
| **Libros** | `PUT` | `/api/libros/:id` | Actualiza un libro. | Autenticado |
| **Libros** | `DELETE` | `/api/libros/:id` | Elimina un libro. | Autenticado |
| **Utilidades** | `GET` | `/api/generos` | Lista todos los géneros. | Público |
| **Utilidades** | `GET` | `/api/paises` | Lista todos los países. | Público |