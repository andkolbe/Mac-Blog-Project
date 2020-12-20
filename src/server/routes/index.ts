import { Router } from 'express'; // we only need to import the router function from express
import apiRouter from './api';
import authRouter from './auth';
import authorsRouter from './authors'; 
import blogsRouter from './blogs';
import blogtagsRouter from './blogtags';
import tagsRouter from './tags';

const router = Router(); // save the express middleware router in a variable 

router.use('/api', apiRouter);
router.use('/auth', authRouter)
router.use('/authors', authorsRouter);
router.use('/blogs', blogsRouter); // /api/blogs
router.use('/blogtags', blogtagsRouter);
router.use('/tags', tagsRouter);

export default router;