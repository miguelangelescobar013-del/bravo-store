USE BravoStoreBD;
GO

INSERT INTO Categorias (nombre, descripcion)
VALUES
('Hombre - Accesorios', 'Gorras, bolsos y complementos masculinos'),
('Hombre - Buzos', 'Buzos y suéteres para hombre'),
('Hombre - Calzado', 'Tenis deportivos y urbanos masculinos'),
('Hombre - Camisetas', 'Camisetas, playeras y camisas casuales'),
('Hombre - Pantalones', 'Pantalones y joggers para hombre'),
('Mujer - Accesorios', 'Collares, aretes, bolsos y complementos femeninos'),
('Mujer - Blusas', 'Blusas, tops y prendas superiores femeninas'),
('Mujer - Calzado', 'Tenis deportivos y urbanos femeninos'),
('Mujer - Chaquetas', 'Chaquetas y prendas exteriores femeninas'),
('Mujer - Pantalones', 'Jeans, pantalones y faldas femeninas');
GO

INSERT INTO Usuarios (nombre, correo, contrasena, direccion, telefono)
VALUES
('Miguel Escobar', 'miguel@bravo.com', '123456', 'Medellín', '3001234567'),
('Juan Perez', 'juan@bravo.com', '123456', 'Bello', '3019876543');
GO

INSERT INTO Productos (nombre, descripcion, precio, stock, id_categoria, tallas)
VALUES
-- Hombre - Accesorios
('Gorra negra bordado frontal', 'Gorra urbana negra con bordado frontal blanco y cierre ajustable.', 79900, 26, 1, 'Única'),
('Gorra béisbol minimalista', 'Gorra clásica de seis paneles con visera semicurva y ajuste posterior.', 69900, 30, 1, 'Única'),

-- Hombre - Buzos
('Sudadera básica cuello redondo', 'Sudadera ligera de felpa con puños, cuello y cintura acanalados.', 139900, 14, 2, 'S,M,L,XL'),
('Suéter de punto clásico', 'Suéter de punto fino con cuello redondo y acabados acanalados.', 149900, 13, 2, 'S,M,L,XL'),

-- Hombre - Calzado
('Tenis running contraste azul', 'Tenis running gris oscuro con soportes azules y suela amortiguada.', 229900, 15, 3, '39,40,41,42,43,44'),
('Tenis urbanos piel y gamuza', 'Tenis casuales blancos con recortes de gamuza gris y suela caramelo.', 239900, 12, 3, '39,40,41,42,43,44'),

-- Hombre - Camisetas
('Camisa estampada manga corta', 'Camisa casual fluida con estampado gráfico abstracto en tonos neutros.', 109900, 18, 4, 'S,M,L,XL'),
('Playera cuello Mao botones', 'Playera suave con cuello tipo Mao y detalle frontal de botones.', 89900, 20, 4, 'S,M,L,XL'),
('Playera básica cuello redondo', 'Playera lisa de algodón con corte recto regular y estilo minimalista.', 69900, 25, 4, 'S,M,L,XL'),
('Playera básica con bolsillo', 'Playera de algodón con bolsillo de parche en el pecho.', 79900, 22, 4, 'S,M,L,XL'),

-- Mujer - Accesorios
('Collar cuentas dije orgánico', 'Collar doble de cuentas marfil con dije dorado de aro orgánico.', 69900, 25, 6, 'Única'),
('Bolso tote camel con monedero', 'Bolso tote camel semirrígido con monedero desmontable incluido.', 149900, 10, 6, 'Única'),
('Set aretes minimalistas plata', 'Set de tres pares de aretes plateados con diseño minimalista.', 49900, 30, 6, 'Única'),
('Aretes flor cristal negro', 'Aretes dorados tipo flor con centro de cristal negro facetado.', 59900, 22, 6, 'Única'),
('Collar doble cadena dorada', 'Collar dorado de doble cadena con dije orgánico de acabado artesanal.', 79900, 18, 6, 'Única'),

-- Mujer - Blusas
('Top halter tie-dye asimétrico', 'Top halter enrollable con atado lateral y estampado tie-dye tierra.', 89900, 18, 7, 'XS,S,M,L'),
('Blusa encaje floral chocolate', 'Blusa ajustada de encaje floral semitransparente en tono chocolate.', 119900, 14, 7, 'XS,S,M,L'),
('Top halter negro cut-out', 'Top negro tipo halter con escote cruzado y abertura frontal sutil.', 79900, 20, 7, 'XS,S,M,L'),
('Top Bardot hombros descubiertos', 'Top negro con escote drapeado de hombros caídos y silueta entallada.', 99900, 16, 7, 'XS,S,M,L'),

-- Mujer - Calzado
('Tenis retro animal print', 'Tenis deportivos retro con malla blanca y detalles animal print.', 249900, 12, 8, '35,36,37,38,39,40'),
('Tenis training blanco crema', 'Tenis minimalistas blancos con paneles crema y suela estable.', 259900, 10, 8, '35,36,37,38,39,40'),
('Tenis running suela degradada', 'Tenis running salmón con talón violeta y suela degradada.', 239900, 14, 8, '35,36,37,38,39,40'),
('Tenis urbanos acolchados', 'Tenis urbanos de suela plana con costuras acolchadas y detalles metálicos.', 219900, 16, 8, '35,36,37,38,39,40'),

-- Mujer - Chaquetas
('Chaqueta punto grueso negra', 'Chaqueta negra de punto texturizado con cuello alto y cierre frontal.', 189900, 10, 9, 'S,M,L,XL'),
('Chaqueta denim negra urbana', 'Chaqueta denim negra con lavado desgastado, botones metálicos y bolsillos.', 209900, 12, 9, 'S,M,L,XL'),

-- Mujer - Pantalones
('Jean wide leg dobladillo', 'Jean wide leg azul oscuro con dobladillo grande y tiro medio alto.', 179900, 13, 10, '28,30,32,34,36'),
('Pantalón denim fluido sastrero', 'Pantalón holgado de denim ligero con caída fluida y pinzas frontales.', 169900, 11, 10, '28,30,32,34,36'),
('Falda midi lentejuelas negra', 'Falda midi negra con lentejuelas, tiro alto y abertura lateral.', 159900, 9, 10, 'XS,S,M,L'),
('Minifalda vaquera cruzada', 'Minifalda denim oscura con diseño frontal cruzado y costuras decorativas.', 129900, 15, 10, 'XS,S,M,L');
GO

INSERT INTO Pedidos (id_usuario, fecha, estado, total)
VALUES
(1, GETDATE(), '1', 159800),
(2, GETDATE(), '1', 239900);
GO

INSERT INTO Pedido_Detalle (id_pedido, id_producto, cantidad, precio_unitario)
VALUES
(1, 1, 1, 79900),
(1, 2, 1, 69900),
(2, 6, 1, 239900);
GO

INSERT INTO Favoritos (id_usuario, id_producto)
VALUES
(1, 3),
(1, 6),
(2, 16);
GO

INSERT INTO Pagos (id_pedido, metodo_pago, estado_pago)
VALUES
(1, 'PSE', 'Aprobado'),
(2, 'Credito', 'Pendiente');
GO

INSERT INTO Resenas (id_usuario, id_pedido, id_producto, calificacion, comentario, fecha)
VALUES
(1, 1, 1, 5, 'Muy buen producto, excelente calidad', GETDATE());
GO