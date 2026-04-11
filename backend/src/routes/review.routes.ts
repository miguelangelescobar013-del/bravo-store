import { Router } from 'express';
import {
  getReviewsByProduct,
  postReview,
  removeReview
} from '../controllers/review.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reseñas
 *   description: Gestión de reseñas
 */

/**
 * @swagger
 * /api/reviews/product/{productId}:
 *   get:
 *     summary: Obtener reseñas de un producto
 *     tags: [Reseñas]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Reseñas obtenidas correctamente
 */
router.get('/product/:productId', getReviewsByProduct);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Crear una reseña
 *     tags: [Reseñas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_pedido
 *               - id_producto
 *               - calificacion
 *               - comentario
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               id_pedido:
 *                 type: integer
 *                 example: 1
 *               id_producto:
 *                 type: integer
 *                 example: 1
 *               calificacion:
 *                 type: integer
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: Muy buen producto, excelente calidad
 *     responses:
 *       201:
 *         description: Reseña creada correctamente
 */
router.post('/', postReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Eliminar una reseña por ID
 *     tags: [Reseñas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Reseña eliminada correctamente
 */
router.delete('/:id', removeReview);

export default router;