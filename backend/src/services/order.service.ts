import sql from '../config/db';

export const createOrder = async (
  id_usuario: number,
  total: number
) => {
  const request = new sql.Request();

  request.input('id_usuario', sql.Int, id_usuario);
  request.input('total', sql.Int, total);

  const result = await request.query(`
    INSERT INTO Pedidos (id_usuario, fecha, estado, total)
    OUTPUT INSERTED.id_pedido
    VALUES (@id_usuario, GETDATE(), '1', @total)
  `);

  return result.recordset[0].id_pedido;
};

export const createOrderDetail = async (
  id_pedido: number,
  id_producto: number,
  cantidad: number,
  precio_unitario: number
) => {
  const request = new sql.Request();

  request.input('id_pedido', sql.Int, id_pedido);
  request.input('id_producto', sql.Int, id_producto);
  request.input('cantidad', sql.Int, cantidad);
  request.input('precio_unitario', sql.Int, precio_unitario);

  await request.query(`
    INSERT INTO Pedido_Detalle (id_pedido, id_producto, cantidad, precio_unitario)
    VALUES (@id_pedido, @id_producto, @cantidad, @precio_unitario)
  `);
};

export const getOrderById = async (id_pedido: number) => {
  const request = new sql.Request();
  request.input('id_pedido', sql.Int, id_pedido);

  const result = await request.query(`
    SELECT 
      p.id_pedido,
      p.id_usuario,
      u.nombre AS usuario_nombre,
      p.fecha,
      p.estado,
      p.total
    FROM Pedidos p
    INNER JOIN Usuarios u ON p.id_usuario = u.id_usuario
    WHERE p.id_pedido = @id_pedido
  `);

  return result.recordset[0];
};

export const getOrderDetailsByOrderId = async (id_pedido: number) => {
  const request = new sql.Request();
  request.input('id_pedido', sql.Int, id_pedido);

  const result = await request.query(`
    SELECT
      pd.id_detalle,
      pd.id_producto,
      pr.nombre AS producto_nombre,
      pd.cantidad,
      pd.precio_unitario,
      (pd.cantidad * pd.precio_unitario) AS subtotal
    FROM Pedido_Detalle pd
    INNER JOIN Productos pr ON pd.id_producto = pr.id_producto
    WHERE pd.id_pedido = @id_pedido
  `);

  return result.recordset;
};

export const getOrdersByUserId = async (id_usuario: number) => {
  const request = new sql.Request();
  request.input('id_usuario', sql.Int, id_usuario);

  const result = await request.query(`
    SELECT 
      id_pedido,
      id_usuario,
      fecha,
      estado,
      total
    FROM Pedidos
    WHERE id_usuario = @id_usuario
    ORDER BY fecha DESC
  `);

  return result.recordset;
};