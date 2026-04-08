import { Request, Response } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../services/category.service';

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({
      ok: true,
      data: categories
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      ok: false,
      message: 'Error al obtener categorías'
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        ok: false,
        message: 'Categoría no encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      data: category
    });
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({
      ok: false,
      message: 'Error al obtener categoría'
    });
  }
};

export const postCategory = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
      return res.status(400).json({
        ok: false,
        message: 'nombre y descripcion son obligatorios'
      });
    }

    await createCategory(nombre, descripcion);

    res.status(201).json({
      ok: true,
      message: 'Categoría creada correctamente'
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({
      ok: false,
      message: 'Error al crear categoría'
    });
  }
};

export const putCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
      return res.status(400).json({
        ok: false,
        message: 'nombre y descripcion son obligatorios'
      });
    }

    await updateCategory(id, nombre, descripcion);

    res.status(200).json({
      ok: true,
      message: 'Categoría actualizada correctamente'
    });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({
      ok: false,
      message: 'Error al actualizar categoría'
    });
  }
};

export const removeCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await deleteCategory(id);

    res.status(200).json({
      ok: true,
      message: 'Categoría eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({
      ok: false,
      message: 'Error al eliminar categoría'
    });
  }
};