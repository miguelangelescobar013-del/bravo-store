import sql from '../config/db';

export const getAllCategories = async () => {
  const result = await sql.query('SELECT * FROM Categorias');
  return result.recordset;
};

export const getCategoryById = async (id: number) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);

  const result = await request.query(`
    SELECT * FROM Categorias WHERE id_categoria = @id
  `);

  return result.recordset[0];
};

export const createCategory = async (nombre: string, descripcion: string) => {
  const request = new sql.Request();
  request.input('nombre', sql.VarChar(100), nombre);
  request.input('descripcion', sql.VarChar(100), descripcion);

  await request.query(`
    INSERT INTO Categorias (nombre, descripcion)
    VALUES (@nombre, @descripcion)
  `);
};

export const updateCategory = async (id: number, nombre: string, descripcion: string) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);
  request.input('nombre', sql.VarChar(100), nombre);
  request.input('descripcion', sql.VarChar(100), descripcion);

  await request.query(`
    UPDATE Categorias
    SET nombre = @nombre, descripcion = @descripcion
    WHERE id_categoria = @id
  `);
};

export const deleteCategory = async (id: number) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);

  await request.query(`
    DELETE FROM Categorias
    WHERE id_categoria = @id
  `);
};