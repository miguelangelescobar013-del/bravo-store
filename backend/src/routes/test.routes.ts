import { Router, Request, Response } from 'express';
import sql from '../config/db';

const router = Router();

router.get('/db-test', async (_req: Request, res: Response) => {
  try {
    const result = await sql.query('SELECT * FROM Categorias');
    res.status(200).json({
      ok: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('Error en db-test:', error);
    res.status(500).json({
      ok: false,
      message: 'Error al consultar la base de datos'
    });
  }
});

export default router;