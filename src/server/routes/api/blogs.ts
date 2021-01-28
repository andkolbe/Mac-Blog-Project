import { Router } from 'express';
import { upload } from '../../utils/multer-s3';
import * as passport from 'passport';
import db from '../../db'; // points to the index.ts file in the db folder


// if someone wants to GET all or one blog post they shouldn't need a log in token
// they only need a token if they want to POST, PUT, or DELETE a blog

const router = Router();

router.get('/search', (req, res) => {
    console.log(req.query);
    res.json(`searching for blog post ${req.query.term}`);
})

router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id); // will respond with NaN if a number isn't provided. NaN === falsy
    try {
        if(id) { // truthy
            const [blog] = await db.blogs.one(id); // select statements will always return an array. Destructure using [] to get around that and only show us the object
            res.json(blog);
        } else { // falsy
            const blogs = await db.blogs.all();
            res.json(blogs);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message }) // sends only the  message portion of the error to postman instead of the giant block message
    }
})

// POST /api/blogs/
// Request Body { title: string, content: string, file: File }
router.post('/', upload.single('image'), async (req: any, res) => { // image matches the key on NewPost
    try {
        // console.log(req.body);
        // console.log(req.file);
        // res.json({ msg: `uploaded ${req.file.originalname}`, url: req.file.location })
        const blogDTO = req.body; // DTO don't mix network layer with data layer
        const image_url = req.file.location; // req.file is provided to us by multer. rea.file.location is the image url
        blogDTO.authorid = 1; // whoever is logged in will replace this eventually
        const result = await db.blogs.insert(blogDTO.title, blogDTO.content, blogDTO.authorid , image_url);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message })
    }
})

router.put('/:id', passport.authorize('jwt'), async (req, res) => {
    try {
        const id = Number(req.params.id);
        const blogDTO = req.body; 
        const result = await db.blogs.update(id, blogDTO);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'my code sucks :(', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db.blogs.destroy(id);
        res.json({ msg: 'You have been banished to the shadow realm!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'this sucks', error: error.message })
    }
})

export default router;