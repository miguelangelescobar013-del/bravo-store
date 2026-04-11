import { Router } from 'express';
import {
  getFavorites,
  postFavorite,
  removeFavorite
} from '../controllers/favorite.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Gestión de favoritos
 */

/**
 * @swagger
 * /api/favorites/{userId}:
 *   get:
 *     summary: Obtener favoritos de un usuario
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Favoritos obtenidos correctamente
 */
router.get('/:userId', getFavorites);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Agregar un producto a favoritos
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_producto
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               id_producto:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Producto agregado a favoritos correctamente
 */
router.post('/', postFavorite);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Eliminar un favorito por ID
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del favorito
 *     responses:
 *       200:
 *         description: Favorito eliminado correctamente
 */
router.delete('/:id', removeFavorite);

export default router;