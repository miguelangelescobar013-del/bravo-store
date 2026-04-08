import sql from '../config/db';

export const getAllProducts = async (categoryId?: number) => {
  const request = new sql.Request();

  if (categoryId) {
    request.input('categoryId', sql.Int, categoryId);

    const result = await request.query(`
      SELECT p.*, c.nombre AS categoria_nombre
      FROM Productos p
      INNER JOIN Categorias c ON p.id_categoria = c.id_categoria
      WHERE p.id_categoria = @categoryId
    `);

    return result.recordset;
  }

  const result = await request.query(`
    SELECT p.*, c.nombre AS categoria_nombre
    FROM Productos p
    INNER JOIN Categorias c ON p.id_categoria = c.id_categoria
  `);

  return result.recordset;
};

export const getProductById = async (id: number) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);

  const result = await request.query(`
    SELECT p.*, c.nombre AS categoria_nombre
    FROM Productos p
    INNER JOIN Categorias c ON p.id_categoria = c.id_categoria
    WHERE p.id_producto = @id
  `);

  return result.recordset[0];
};

export const createProduct = async (
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number,
  id_categoria: number
) => {
  const request = new sql.Request();
  request.input('nombre', sql.VarChar(100), nombre);
  request.input('descripcion', sql.VarChar(100), descripcion);
  request.input('precio', sql.Int, precio);
  request.input('stock', sql.Int, stock);
  request.input('id_categoria', sql.Int, id_categoria);

  await request.query(`
    INSERT INTO Productos (nombre, descripcion, precio, stock, id_categoria)
    VALUES (@nombre, @descripcion, @precio, @stock, @id_categoria)
  `);
};

export const updateProduct = async (
  id: number,
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number,
  id_categoria: number
) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);
  request.input('nombre', sql.VarChar(100), nombre);
  request.input('descripcion', sql.VarChar(100), descripcion);
  request.input('precio', sql.Int, precio);
  request.input('stock', sql.Int, stock);
  request.input('id_categoria', sql.Int, id_categoria);

  await request.query(`
    UPDATE Productos
    SET nombre = @nombre,
        descripcion = @descripcion,
        precio = @precio,
        stock = @stock,
        id_categoria = @id_categoria
    WHERE id_producto = @id
  `);
};

export const deleteProduct = async (id: number) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);

  await request.query(`
    DELETE FROM Productos
    WHERE id_producto = @id
  `);
};