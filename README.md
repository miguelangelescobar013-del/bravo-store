# 🛍️ Bravo Store

Bravo Store es una aplicación de comercio digital para la venta de ropa y accesorios.  
Este proyecto implementa una API REST con Node.js, Express, TypeScript y SQL Server, siguiendo una arquitectura cliente-servidor.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- SQL Server
- Git y GitHub

---

## 📁 Estructura del proyecto

- `backend/`: API REST
- `database/`: scripts SQL (creación e inserción)
- `mobile/`: app React Native
- `docs/`: documentación

---

## ⚙️ Requisitos previos

- Node.js
- SQL Server
- ODBC Driver 17 o 18 for SQL Server
- Git

---

## 🔧 Configuración del backend

### 1. Clonar repositorio

```bash
git clone https://github.com/TU_USUARIO/bravo-store.git
cd bravo-store/backend
```

2. Instalar dependencias
```bash
npm install
```

3. Variables de entorno

Crear archivo .env basado en .env.example

```bash
PORT=3000
DB_SERVER=localhost
DB_DATABASE=BravoStoreBD
JWT_SECRET=bravo_store_secret
```

4. Configurar base de datos

 1. Crear base de datos:
```sql
CREATE DATABASE BravoStoreBD;

 1. Crear base de datos:
```

 2. Ejecutar scripts:
```sql
- database/schema.sql
- database/seed.sql
```


5. Ejecutar servidor
```bash
npm run dev
```

🌐 Base URL API
```bash
http://localhost:3000/api
```

📡 Endpoints

📂 Categorías
- GET /categories
- GET /categories/:id
- POST /categories
- PUT /categories/:id
- DELETE /categories/:id

🛒 Productos
- GET /products
- GET /products/:id
- GET /products?category=1
- POST /products
- PUT /products/:id
- DELETE /products/:id

👤 Usuarios
- GET /users/profile/:id

⭐ Favoritos
- GET /favorites/:userId
- POST /favorites
- DELETE /favorites/:id

📝 Reseñas
- GET /reviews/product/:productId
- POST /reviews
- DELETE /reviews/:id

🧠 Características implementadas
- CRUD completo de categorías
- CRUD completo de productos
- Perfil de usuario en solo lectura
- Gestión de favoritos
- Sistema de reseñas con validación de compra
- Validaciones en backend
- Consultas parametrizadas (seguridad)
- Arquitectura por capas (controllers, services, routes)

📌 Estado del proyecto

Backend funcional con los módulos principales del sistema de comercio electrónico Bravo Store.
