import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';
import tokensRouter from './tokens';


const router = Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/tokens', tokensRouter);



export default router;