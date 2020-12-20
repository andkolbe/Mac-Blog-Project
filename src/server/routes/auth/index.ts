import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';

const router = Router();

router.use('/register', registerRouter)
router.use('/login', loginRouter)

export default router;