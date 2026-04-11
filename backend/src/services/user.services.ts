import sql from '../config/db';

export const getUserProfileById = async (id: number) => {
  const request = new sql.Request();
  request.input('id', sql.Int, id);

  const result = await request.query(`
    SELECT 
      id_usuario,
      nombre,
      correo,
      direccion,
      telefono
    FROM Usuarios
    WHERE id_usuario = @id
  `);

  return result.recordset[0];
};