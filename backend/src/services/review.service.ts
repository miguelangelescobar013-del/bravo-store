import sql from '../config/db';

export const getReviewsByProductId = async (productId: number) => {
  const request = new sql.Request();
  request.input('productId', sql.Int, productId);

  const result = await request.query(`
    SELECT 
      r.id_resena,
      r.id_usuario,
      r.id_pedido,
      r.id_producto,
      r.calificacion,
      r.comentario,
      r.fecha,
      u.nombre AS usuario_nombre
    FROM Resenas r
    INNER JOIN Usuarios u ON r.id_usuario = u.id_usuario
    WHERE r.id_producto = @productId
    ORDER BY r.fecha DESC
  `);

  return result.recordset;
};

export const getReviewById = async (reviewId: number) => {
  const request = new sql.Request();
  request.input('reviewId', sql.Int, reviewId);

  const result = await request.query(`
    SELECT * FROM Resenas
    WHERE id_resena = @reviewId
  `);

  return result.recordset[0];
};

export const createReview = async (
  id_usuario: number,
  id_pedido: number,
  id_producto: number,
  calificacion: number,
  comentario: string
) => {
  const request = new sql.Request();
  request.input('id_usuario', sql.Int, id_usuario);
  request.input('id_pedido', sql.Int, id_pedido);
  request.input('id_producto', sql.Int, id_producto);
  request.input('calificacion', sql.Int, calificacion);
  request.input('comentario', sql.VarChar(250), comentario);

  await request.query(`
    INSERT INTO Resenas (id_usuario, id_pedido, id_producto, calificacion, comentario, fecha)
    VALUES (@id_usuario, @id_pedido, @id_producto, @calificacion, @comentario, GETDATE())
  `);
};

export const deleteReview = async (reviewId: number) => {
  const request = new sql.Request();
  request.input('reviewId', sql.Int, reviewId);

  await request.query(`
    DELETE FROM Resenas
    WHERE id_resena = @reviewId
  `);
};

export const getOrderById = async (orderId: number) => {
  const request = new sql.Request();
  request.input('orderId', sql.Int, orderId);

  const result = await request.query(`
    SELECT * FROM Pedidos
    WHERE id_pedido = @orderId
  `);

  return result.recordset[0];
};

export const userPurchasedProductInOrder = async (
  userId: number,
  orderId: number,
  productId: number
) => {
  const request = new sql.Request();
  request.input('userId', sql.Int, userId);
  request.input('orderId', sql.Int, orderId);
  request.input('productId', sql.Int, productId);

  const result = await request.query(`
    SELECT pd.*
    FROM Pedido_Detalle pd
    INNER JOIN Pedidos p ON pd.id_pedido = p.id_pedido
    WHERE p.id_usuario = @userId
      AND p.id_pedido = @orderId
      AND pd.id_producto = @productId
  `);

  return result.recordset[0];
};