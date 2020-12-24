import { Router } from 'express';
import db from '../../db';


const router = Router();

router.get('/', async (req, res) => {
    try {
        const blogtags = await db.blogtags.all();
        res.json(blogtags);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message }) 
    }
})

router.get('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid); // will respond with NaN if a number isn't provided. NaN === falsy
    try {
        const [blogtags] = await db.blogtags.oneBlogTag(blogid);
        res.json(blogtags);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message }) // sends only the  message portion of the error to postman instead of the giant block message
    }
})

router.post('/', async (req, res) => {
    try {
        const { tagid, blogid } = req.body; // destructured from the blogtag db page
        await db.blogtags.insert(blogid, tagid);
        res.json({ msg: 'blogtag created' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message })
    }
})

export default router;