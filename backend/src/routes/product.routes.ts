import { Router } from 'express';
import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  removeProduct
} from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', removeProduct);

export default router;