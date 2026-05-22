# 🛍️ Bravo Store

Aplicación móvil de e-commerce desarrollada con React Native, Expo y TypeScript, conectada a una API REST y base de datos SQL Server.

## 🚀 Tecnologías utilizadas

### Frontend
- React Native
- Expo
- TypeScript

### Backend
- Node.js
- Express
- TypeScript


### Base de Datos
- SQL Server

## 📁 Estructura del proyecto

- `backend/`: API REST
- `database/`: scripts SQL (creación e inserción)
- `mobile/`: app React Native

## Características principales
- Visualización de productos
- Categorías Hombre y Mujer
- Carrito de compras
- Favoritos
- Login simulado
- Selección de tallas
- Simulación de pagos
- API REST conectada al frontend
- Diseño responsive para móvil

### Instalación Frontend

```bash
cd mobile
npm install
npx expo start
```

### Instalación Backend

```bash
cd backend
npm install
npm run dev
```

### Servidor backend:
```bash
http://localhost:3000
```
### Base de datos
1. Abrir SQL Server Management Studio
2. Ejecutar primero:
```bash
database/schema.sql
```
3. Luego ejecutar:
```bash
database/seed.sql
```

### API REST

La API utiliza arquitectura REST y responde en formato JSON.

Principales módulos:

- Productos
- Categorías
- Usuarios
- Pedidos
- Pagos
- Favoritos
- Reseñas

### Compilación y ejecución
Frontend
```bash
npx expo start
```
Backend
```bash
npm run dev
```