import { Router } from 'express';
import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  removeProduct
} from '../controllers/product.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos o filtrar por categoría
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID de la categoría para filtrar productos
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', getProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - precio
 *               - stock
 *               - id_categoria
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Chaqueta Urbana
 *               descripcion:
 *                 type: string
 *                 example: Chaqueta casual color negro
 *               precio:
 *                 type: integer
 *                 example: 150000
 *               stock:
 *                 type: integer
 *                 example: 12
 *               id_categoria:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 */
router.post('/', postProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - precio
 *               - stock
 *               - id_categoria
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               id_categoria:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 */
router.put('/:id', putProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', removeProduct);

export default router;