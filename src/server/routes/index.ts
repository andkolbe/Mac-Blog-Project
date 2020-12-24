import { Router } from 'express'; // we only need to import the router function from express
import apiRouter from './api';
import authRouter from './auth';

const router = Router(); // save the express middleware router in a variable 

router.use('/api', apiRouter);
router.use('/auth', authRouter)

export default router;