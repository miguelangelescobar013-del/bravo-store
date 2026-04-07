USE BravoStoreBD;
GO

CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);
GO

CREATE TABLE Categorias (
    id_categoria INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Productos (
    id_producto INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    stock INT NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);
GO

CREATE TABLE Carrito (
    id_carrito INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    fecha_creacion DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
GO

CREATE TABLE Carrito_Detalle (
    id_detalle INT PRIMARY KEY IDENTITY(1,1),
    id_carrito INT,
    id_producto INT,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_carrito) REFERENCES Carrito(id_carrito),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
GO

CREATE TABLE Pedidos (
    id_pedido INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    fecha DATE NOT NULL,
    estado VARCHAR(100) CHECK (estado IN ('1','2','3','4')),
    total INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
GO

CREATE TABLE Pedido_Detalle (
    id_detalle INT PRIMARY KEY IDENTITY(1,1),
    id_pedido INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario INT NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
GO

CREATE TABLE Pagos (
    id_pago INT PRIMARY KEY IDENTITY(1,1),
    id_pedido INT,
    metodo_pago VARCHAR(20) NOT NULL CHECK (metodo_pago IN ('1','2','3','4')),
    estado_pago VARCHAR(20) NOT NULL CHECK (estado_pago IN ('1','2','3')),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
);
GO

CREATE TABLE Resenas (
    id_resena INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    id_pedido INT,
    id_producto INT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario VARCHAR(250),
    fecha DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
GO

CREATE TABLE Favoritos (
    id_favorito INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT,
    id_producto INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
GO