import { Router } from 'express';
import authorsRouter from './authors'; 
import blogsRouter from './blogs';
import blogtagsRouter from './blogtags';
import commentsRouter from './comments';
import contactRouter from './contact';
import donateRouter from './donate';
import tagsRouter from './tags';


const router = Router();

router.use('/authors', authorsRouter);
router.use('/blogs', blogsRouter); // /api/blogs
router.use('/blogtags', blogtagsRouter);
router.use('/comments', commentsRouter);
router.use('/contact', contactRouter);
router.use('/donate', donateRouter);
router.use('/tags', tagsRouter);

export default router;