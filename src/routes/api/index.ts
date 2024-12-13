import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtRouter from './thoughtRoutes.js';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRouter);

export default router;
