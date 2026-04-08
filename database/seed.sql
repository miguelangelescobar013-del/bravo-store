USE BravoStoreBD;
GO

INSERT INTO Categorias (nombre, descripcion)
VALUES 
('Camisetas', 'Prendas superiores casuales y deportivas'),
('Pantalones', 'Jeans, joggers y pantalones deportivos'),
('Accesorios', 'Gorras, bolsos, medias y complementos');
GO

INSERT INTO Usuarios (nombre, correo, contrasena, direccion, telefono)
VALUES
('Miguel Escobar', 'miguel@bravo.com', '123456', 'Medellín', '3001234567'),
('Juan Perez', 'juan@bravo.com', '123456', 'Bello', '3019876543');
GO

INSERT INTO Productos (nombre, descripcion, precio, stock, id_categoria)
VALUES
('Camiseta Oversize Negra', 'Camiseta urbana color negro', 85000, 20, 1),
('Jogger Gris', 'Pantalón jogger cómodo', 110000, 15, 2),
('Gorra Classic', 'Gorra ajustable unisex', 45000, 30, 3);
GO