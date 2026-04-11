import { Request, Response } from 'express';
import { getUserProfileById } from '../services/user.services';
import { getProductById } from '../services/product.service';
import {
  getReviewsByProductId,
  getReviewById,
  createReview,
  deleteReview,
  getOrderById,
  userPurchasedProductInOrder
} from '../services/review.service';

export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del producto debe ser numérico'
      });
    }

    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      });
    }

    const reviews = await getReviewsByProductId(productId);

    res.status(200).json({
      ok: true,
      data: reviews
    });
  } catch (error) {
    console.error('Error al obtener reseñas:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al obtener reseñas'
    });
  }
};

export const postReview = async (req: Request, res: Response) => {
  try {
    const { id_usuario, id_pedido, id_producto, calificacion, comentario } = req.body || {};

    if (
      !id_usuario ||
      !id_pedido ||
      !id_producto ||
      calificacion === undefined ||
      comentario === undefined
    ) {
      return res.status(400).json({
        ok: false,
        message: 'id_usuario, id_pedido, id_producto, calificacion y comentario son obligatorios'
      });
    }

    if (
      isNaN(Number(id_usuario)) ||
      isNaN(Number(id_pedido)) ||
      isNaN(Number(id_producto)) ||
      isNaN(Number(calificacion))
    ) {
      return res.status(400).json({
        ok: false,
        message: 'id_usuario, id_pedido, id_producto y calificacion deben ser numéricos'
      });
    }

    const rating = Number(calificacion);

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        ok: false,
        message: 'La calificación debe estar entre 1 y 5'
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

    const order = await getOrderById(Number(id_pedido));
    if (!order) {
      return res.status(404).json({
        ok: false,
        message: 'Pedido no encontrado'
      });
    }

    const purchased = await userPurchasedProductInOrder(
      Number(id_usuario),
      Number(id_pedido),
      Number(id_producto)
    );

    if (!purchased) {
      return res.status(400).json({
        ok: false,
        message: 'El usuario no tiene ese producto asociado a ese pedido'
      });
    }

    await createReview(
      Number(id_usuario),
      Number(id_pedido),
      Number(id_producto),
      rating,
      comentario
    );

    res.status(201).json({
      ok: true,
      message: 'Reseña creada correctamente'
    });
  } catch (error) {
    console.error('Error al crear reseña:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al crear reseña'
    });
  }
};

export const removeReview = async (req: Request, res: Response) => {
  try {
    const reviewId = Number(req.params.id);

    if (isNaN(reviewId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id de la reseña debe ser numérico'
      });
    }

    const review = await getReviewById(reviewId);

    if (!review) {
      return res.status(404).json({
        ok: false,
        message: 'Reseña no encontrada'
      });
    }

    await deleteReview(reviewId);

    res.status(200).json({
      ok: true,
      message: 'Reseña eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar reseña:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al eliminar reseña'
    });
  }
};