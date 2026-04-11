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

INSERT INTO Pedidos (id_usuario, fecha, estado, total)
VALUES
(1, GETDATE(), '1', 85000),
(2, GETDATE(), '1', 110000);
GO

INSERT INTO Pedido_Detalle (id_pedido, id_producto, cantidad, precio_unitario)
VALUES
(1, 1, 1, 85000),
(2, 2, 1, 110000);
GO

INSERT INTO Favoritos (id_usuario, id_producto)
VALUES
(1, 2),
(1, 3),
(2, 1);
GO

INSERT INTO Pagos (id_pedido, metodo_pago, estado_pago)
VALUES
(1, '1', '2'),
(2, '2', '1');
GO

INSERT INTO Resenas (id_usuario, id_pedido, id_producto, calificacion, comentario, fecha)
VALUES
(1, 1, 1, 5, 'Muy buen producto, excelente calidad', GETDATE());
GO