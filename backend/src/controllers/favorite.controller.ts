import { Request, Response } from 'express';
import { getUserProfileById } from '../services/user.services';
import { getProductById } from '../services/product.service';
import {
  getFavoritesByUserId,
  addFavorite,
  deleteFavorite,
  getFavoriteById,
  getFavoriteByUserAndProduct
} from '../services/favorite.service';

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del usuario debe ser numérico'
      });
    }

    const user = await getUserProfileById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      });
    }

    const favorites = await getFavoritesByUserId(userId);

    res.status(200).json({
      ok: true,
      data: favorites
    });
  } catch (error) {
    console.error('Error al obtener favoritos:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al obtener favoritos'
    });
  }
};

export const postFavorite = async (req: Request, res: Response) => {
  try {
    const { id_usuario, id_producto } = req.body || {};

    if (!id_usuario || !id_producto) {
      return res.status(400).json({
        ok: false,
        message: 'id_usuario e id_producto son obligatorios'
      });
    }

    if (isNaN(Number(id_usuario)) || isNaN(Number(id_producto))) {
      return res.status(400).json({
        ok: false,
        message: 'id_usuario e id_producto deben ser numéricos'
      });
    }

    const user = await getUserProfileById(Number(id_usuario));

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      });
    }

    const product = await getProductById(Number(id_producto));

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      });
    }

    const existingFavorite = await getFavoriteByUserAndProduct(
      Number(id_usuario),
      Number(id_producto)
    );

    if (existingFavorite) {
      return res.status(400).json({
        ok: false,
        message: 'El producto ya está en favoritos para este usuario'
      });
    }

    await addFavorite(Number(id_usuario), Number(id_producto));

    res.status(201).json({
      ok: true,
      message: 'Producto agregado a favoritos correctamente'
    });
  } catch (error) {
    console.error('Error al agregar favorito:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al agregar favorito'
    });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const favoriteId = Number(req.params.id);

    if (isNaN(favoriteId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del favorito debe ser numérico'
      });
    }

    const favorite = await getFavoriteById(favoriteId);

    if (!favorite) {
      return res.status(404).json({
        ok: false,
        message: 'Favorito no encontrado'
      });
    }

    await deleteFavorite(favoriteId);

    res.status(200).json({
      ok: true,
      message: 'Favorito eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al eliminar favorito'
    });
  }
};