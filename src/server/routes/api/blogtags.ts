import { Router } from 'express';
import db from '../../db';


const router = Router();

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id); // will respond with NaN if a number isn't provided. NaN === falsy
    try {
        const [blogtags] = await db.blogtags.oneBlogTag(id);
        res.json(blogtags);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message }) // sends only the  message portion of the error to postman instead of the giant block message
    }
})

router.post('/', async (req, res) => {
    try {
        const { blogid, tagid } = req.body; // destructured from the blogtag db page
        await db.blogtags.insert(blogid, tagid);
        res.json({ msg: 'blogtag created' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const tagDTO = req.body
    try {
        await db.blogtags.update(tagDTO.newId, tagDTO.oldId, id)
        res.json({ msg: 'blogtag(s) changed' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        await db.blogtags.destroy(id);
        res.json({ msg: 'You have been banished to the shadow realm!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message })
    }
})

export default router;