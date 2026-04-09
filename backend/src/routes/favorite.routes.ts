import { Router } from 'express';
import {
  getFavorites,
  postFavorite,
  removeFavorite
} from '../controllers/favorite.controller';

const router = Router();

router.get('/:userId', getFavorites);
router.post('/', postFavorite);
router.delete('/:id', removeFavorite);

export default router;