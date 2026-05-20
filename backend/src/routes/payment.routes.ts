import { Router } from 'express';
import {
  simulatePayment,
  getPaymentByOrder
} from '../controllers/payment.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Gestión de pagos simulados
 */

/**
 * @swagger
 * /api/payments/simulate:
 *   post:
 *     summary: Simular pago de un pedido
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pedido
 *               - metodo_pago
 *             properties:
 *               id_pedido:
 *                 type: integer
 *                 example: 1
 *               metodo_pago:
 *                 type: string
 *                 example: "PSE"
 *     responses:
 *       201:
 *         description: Pago simulado correctamente
 */
router.post('/simulate', simulatePayment);

/**
 * @swagger
 * /api/payments/order/{orderId}:
 *   get:
 *     summary: Obtener pago por ID de pedido
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pago obtenido correctamente
 */
router.get('/order/:orderId', getPaymentByOrder);

export default router;