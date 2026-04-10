import { Router } from 'express';
import {
  getReviewsByProduct,
  postReview,
  removeReview
} from '../controllers/review.controller';

const router = Router();

router.get('/product/:productId', getReviewsByProduct);
router.post('/', postReview);
router.delete('/:id', removeReview);

export default router;