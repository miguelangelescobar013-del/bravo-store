import sql from '../config/db';

export const createPayment = async (
  id_pedido: number,
  metodo_pago: string,
  estado_pago: string
) => {
  const request = new sql.Request();

  request.input('id_pedido', sql.Int, id_pedido);
  request.input('metodo_pago', sql.VarChar(20), metodo_pago);
  request.input('estado_pago', sql.VarChar(20), estado_pago);

  const result = await request.query(`
    INSERT INTO Pagos (id_pedido, metodo_pago, estado_pago)
    OUTPUT INSERTED.id_pago
    VALUES (@id_pedido, @metodo_pago, @estado_pago)
  `);

  return result.recordset[0].id_pago;
};

export const getPaymentByOrderId = async (id_pedido: number) => {
  const request = new sql.Request();

  request.input('id_pedido', sql.Int, id_pedido);

  const result = await request.query(`
    SELECT *
    FROM Pagos
    WHERE id_pedido = @id_pedido
  `);

  return result.recordset[0];
};