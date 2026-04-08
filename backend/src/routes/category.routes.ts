import { Router } from 'express';
import {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  removeCategory
} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', postCategory);
router.put('/:id', putCategory);
router.delete('/:id', removeCategory);

export default router;