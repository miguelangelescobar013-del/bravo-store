import { Request, Response } from 'express';
import { getUserProfileById } from '../services/user.services';
import { getProductById } from '../services/product.service';
import {
  createOrder,
  createOrderDetail,
  getOrderById,
  getOrderDetailsByOrderId,
  getOrdersByUserId
} from '../services/order.service';

export const postOrder = async (req: Request, res: Response) => {
  try {
    const { id_usuario, items } = req.body || {};

    if (!id_usuario || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'id_usuario e items son obligatorios'
      });
    }

    const user = await getUserProfileById(Number(id_usuario));

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      });
    }

    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const { id_producto, cantidad } = item;

      if (!id_producto || !cantidad || isNaN(Number(id_producto)) || isNaN(Number(cantidad))) {
        return res.status(400).json({
          ok: false,
          message: 'Cada item debe tener id_producto y cantidad numéricos'
        });
      }

      const product = await getProductById(Number(id_producto));

      if (!product) {
        return res.status(404).json({
          ok: false,
          message: `Producto con id ${id_producto} no encontrado`
        });
      }

      if (Number(cantidad) <= 0) {
        return res.status(400).json({
          ok: false,
          message: 'La cantidad debe ser mayor a 0'
        });
      }

      if (Number(cantidad) > product.stock) {
        return res.status(400).json({
          ok: false,
          message: `Stock insuficiente para el producto ${product.nombre}`
        });
      }

      const subtotal = Number(product.precio) * Number(cantidad);
      total += subtotal;

      validatedItems.push({
        id_producto: Number(id_producto),
        cantidad: Number(cantidad),
        precio_unitario: Number(product.precio)
      });
    }

    const id_pedido = await createOrder(Number(id_usuario), total);

    for (const item of validatedItems) {
      await createOrderDetail(
        id_pedido,
        item.id_producto,
        item.cantidad,
        item.precio_unitario
      );
    }

    return res.status(201).json({
      ok: true,
      message: 'Pedido creado correctamente',
      data: {
        id_pedido,
        total
      }
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);

    return res.status(500).json({
      ok: false,
      message: 'Error al crear pedido'
    });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del pedido debe ser numérico'
      });
    }

    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: 'Pedido no encontrado'
      });
    }

    const details = await getOrderDetailsByOrderId(id);

    return res.status(200).json({
      ok: true,
      message: 'Pedido obtenido correctamente',
      data: {
        ...order,
        detalles: details
      }
    });
  } catch (error) {
    console.error('Error al obtener pedido:', error);

    return res.status(500).json({
      ok: false,
      message: 'Error al obtener pedido'
    });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
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

    const orders = await getOrdersByUserId(userId);

    return res.status(200).json({
      ok: true,
      message: 'Pedidos del usuario obtenidos correctamente',
      data: orders
    });
  } catch (error) {
    console.error('Error al obtener pedidos del usuario:', error);

    return res.status(500).json({
      ok: false,
      message: 'Error al obtener pedidos del usuario'
    });
  }
};