import sql from '../config/db';

export const getFavoritesByUserId = async (userId: number) => {
  const request = new sql.Request();
  request.input('userId', sql.Int, userId);

  const result = await request.query(`
    SELECT 
      f.id_favorito,
      f.id_usuario,
      f.id_producto,
      p.nombre,
      p.descripcion,
      p.precio,
      p.stock,
      p.id_categoria
    FROM Favoritos f
    INNER JOIN Productos p ON f.id_producto = p.id_producto
    WHERE f.id_usuario = @userId
  `);

  return result.recordset;
};

export const addFavorite = async (userId: number, productId: number) => {
  const request = new sql.Request();
  request.input('userId', sql.Int, userId);
  request.input('productId', sql.Int, productId);

  await request.query(`
    INSERT INTO Favoritos (id_usuario, id_producto)
    VALUES (@userId, @productId)
  `);
};

export const deleteFavorite = async (favoriteId: number) => {
  const request = new sql.Request();
  request.input('favoriteId', sql.Int, favoriteId);

  await request.query(`
    DELETE FROM Favoritos
    WHERE id_favorito = @favoriteId
  `);
};

export const getFavoriteById = async (favoriteId: number) => {
  const request = new sql.Request();
  request.input('favoriteId', sql.Int, favoriteId);

  const result = await request.query(`
    SELECT * FROM Favoritos
    WHERE id_favorito = @favoriteId
  `);

  return result.recordset[0];
};

export const getFavoriteByUserAndProduct = async (userId: number, productId: number) => {
  const request = new sql.Request();
  request.input('userId', sql.Int, userId);
  request.input('productId', sql.Int, productId);

  const result = await request.query(`
    SELECT * FROM Favoritos
    WHERE id_usuario = @userId AND id_producto = @productId
  `);

  return result.recordset[0];
};