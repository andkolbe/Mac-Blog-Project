import { Router } from 'express';
import lulzRouter from './lulz';

const router = Router();

router.use('/lulz', lulzRouter);

export default router;