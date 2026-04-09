import { Request, Response } from 'express';
import { getUserProfileById } from '../services/user.services';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del usuario debe ser numérico'
      });
    }

    const user = await getUserProfileById(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      ok: true,
      data: user
    });
  } catch (error) {
    console.error('Error al obtener perfil del usuario:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al obtener perfil del usuario'
    });
  }
};