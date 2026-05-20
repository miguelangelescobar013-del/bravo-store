import { Router } from 'express';
import {
  postOrder,
  getOrder,
  getUserOrders
} from '../controllers/order.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gestión de pedidos
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - items
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_producto:
 *                       type: integer
 *                       example: 1
 *                     cantidad:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido creado correctamente
 */
router.post('/', postOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido obtenido correctamente
 */
router.get('/:id', getOrder);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Obtener pedidos de un usuario
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedidos obtenidos correctamente
 */
router.get('/user/:userId', getUserOrders);

export default router;