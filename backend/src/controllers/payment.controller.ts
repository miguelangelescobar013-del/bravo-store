import { Request, Response } from 'express';
import { getOrderById } from '../services/order.service';
import {
  createPayment,
  getPaymentByOrderId
} from '../services/payment.service';

export const simulatePayment = async (req: Request, res: Response) => {
  try {
    const { id_pedido, metodo_pago } = req.body || {};

    if (!id_pedido || !metodo_pago) {
      return res.status(400).json({
        ok: false,
        message: 'id_pedido y metodo_pago son obligatorios'
      });
    }

    if (isNaN(Number(id_pedido))) {
      return res.status(400).json({
        ok: false,
        message: 'id_pedido debe ser numérico'
      });
    }

    const allowedMethods = ['Credito', 'PSE', 'Debito', 'Paypal'];

    if (!allowedMethods.includes(String(metodo_pago))) {
      return res.status(400).json({
        ok: false,
        message: 'metodo_pago debe ser 1, 2, 3 o 4'
      });
    }

    const order = await getOrderById(Number(id_pedido));

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: 'Pedido no encontrado'
      });
    }

    const existingPayment = await getPaymentByOrderId(Number(id_pedido));

    if (existingPayment) {
      return res.status(400).json({
        ok: false,
        message: 'Este pedido ya tiene un pago registrado'
      });
    }

    const estados = ['Pendiente', 'Aprobado', 'Rechazado'];
    const estado_pago = estados[Math.floor(Math.random() * estados.length)];

    const id_pago = await createPayment(
      Number(id_pedido),
      String(metodo_pago),
      estado_pago
    );

    return res.status(201).json({
      ok: true,
      message: 'Pago simulado correctamente',
      data: {
        id_pago,
        id_pedido: Number(id_pedido),
        metodo_pago: String(metodo_pago),
        estado_pago
      }
    });
  } catch (error) {
    console.error('Error al simular pago:', error);

    return res.status(500).json({
      ok: false,
      message: 'Error al simular pago'
    });
  }
};

export const getPaymentByOrder = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);

    if (isNaN(orderId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del pedido debe ser numérico'
      });
    }

    const order = await getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: 'Pedido no encontrado'
      });
    }

    const payment = await getPaymentByOrderId(orderId);

    if (!payment) {
      return res.status(404).json({
        ok: false,
        message: 'Pago no encontrado para este pedido'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Pago obtenido correctamente',
      data: payment
    });
  } catch (error) {
    console.error('Error al obtener pago:', error);

    return res.status(500).json({
      ok: false,
      message: 'Error al obtener pago'
    });
  }
};