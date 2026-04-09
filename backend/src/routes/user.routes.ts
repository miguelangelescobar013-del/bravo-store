import { Router } from 'express';
import { getUserProfile } from '../controllers/user.controller';

const router = Router();

router.get('/profile/:id', getUserProfile);

export default router;