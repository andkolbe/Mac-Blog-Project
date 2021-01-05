import { Router } from 'express';
import lulzRouter from './lulz';
import authorsRouter from './authors'; 
import blogsRouter from './blogs';
import blogtagsRouter from './blogtags';
import donateRouter from './donate';
import tagsRouter from './tags';


const router = Router();

router.use('/lulz', lulzRouter);
router.use('/authors', authorsRouter);
router.use('/blogs', blogsRouter); // /api/blogs
router.use('/blogtags', blogtagsRouter);
router.use('/donate', donateRouter);
router.use('/tags', tagsRouter);

export default router;