import { Request, Response } from 'express';
import { getCategoryById } from '../services/category.service';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/product.service';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const categoryId = req.query.category ? Number(req.query.category) : undefined;

    if (req.query.category && isNaN(Number(req.query.category))) {
      return res.status(400).json({
        ok: false,
        message: 'El parámetro category debe ser numérico'
      });
    }

    const products = await getAllProducts(categoryId);

    res.status(200).json({
      ok: true,
      data: products
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al obtener productos'
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del producto debe ser numérico'
      });
    }

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      });
    }

    res.status(200).json({
      ok: true,
      data: product
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al obtener producto'
    });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio, stock, id_categoria } = req.body || {};

    if (!nombre || !descripcion || precio === undefined || stock === undefined || !id_categoria) {
      return res.status(400).json({
        ok: false,
        message: 'nombre, descripcion, precio, stock e id_categoria son obligatorios'
      });
    }

    if (isNaN(Number(precio)) || isNaN(Number(stock)) || isNaN(Number(id_categoria))) {
      return res.status(400).json({
        ok: false,
        message: 'precio, stock e id_categoria deben ser numéricos'
      });
    }

    const category = await getCategoryById(Number(id_categoria));

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: 'La categoría indicada no existe'
      });
    }

    await createProduct(
      nombre,
      descripcion,
      Number(precio),
      Number(stock),
      Number(id_categoria)
    );

    res.status(201).json({
      ok: true,
      message: 'Producto creado correctamente'
    });
  } catch (error) {
    console.error('Error al crear producto:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al crear producto'
    });
  }
};

export const putProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, descripcion, precio, stock, id_categoria } = req.body || {};

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del producto debe ser numérico'
      });
    }

    if (!nombre || !descripcion || precio === undefined || stock === undefined || !id_categoria) {
      return res.status(400).json({
        ok: false,
        message: 'nombre, descripcion, precio, stock e id_categoria son obligatorios'
      });
    }

    if (isNaN(Number(precio)) || isNaN(Number(stock)) || isNaN(Number(id_categoria))) {
      return res.status(400).json({
        ok: false,
        message: 'precio, stock e id_categoria deben ser numéricos'
      });
    }

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      });
    }

    const category = await getCategoryById(Number(id_categoria));

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: 'La categoría indicada no existe'
      });
    }

    await updateProduct(
      id,
      nombre,
      descripcion,
      Number(precio),
      Number(stock),
      Number(id_categoria)
    );

    res.status(200).json({
      ok: true,
      message: 'Producto actualizado correctamente'
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al actualizar producto'
    });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del producto debe ser numérico'
      });
    }

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      });
    }

    await deleteProduct(id);

    res.status(200).json({
      ok: true,
      message: 'Producto eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);

    res.status(500).json({
      ok: false,
      message: 'Error al eliminar producto'
    });
  }
};