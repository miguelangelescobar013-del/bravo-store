import sql from '../config/db';

export const getAllCategories = async () => {
  const result = await sql.query('SELECT * FROM Categorias');
  return result.recordset;
};

export const getCategoryById = async (id: number) => {
  const result = await sql.query(`
    SELECT * FROM Categorias WHERE id_categoria = ${id}
  `);
  return result.recordset[0];
};

export const createCategory = async (nombre: string, descripcion: string) => {
  await sql.query(`
    INSERT INTO Categorias (nombre, descripcion)
    VALUES ('${nombre}', '${descripcion}')
  `);
};

export const updateCategory = async (id: number, nombre: string, descripcion: string) => {
  await sql.query(`
    UPDATE Categorias
    SET nombre = '${nombre}', descripcion = '${descripcion}'
    WHERE id_categoria = ${id}
  `);
};

export const deleteCategory = async (id: number) => {
  await sql.query(`
    DELETE FROM Categorias
    WHERE id_categoria = ${id}
  `);
};