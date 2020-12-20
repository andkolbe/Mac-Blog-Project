import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => { // callback function to the database that runs after the router finds /
    try {
        const authors = await db.authors.all(); // gets all the authors stored in the database
        res.json(authors); // converts json to javascript and displays them
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Nope', error: error.message })
    }
})

router.post('/', async (req, res) => { // networking layer

    const authorDTO = req.body; 
    // DTO - a variable that holds the req.body so we don't pass the req.body from the networking layer directly into our query, which is the data layer

    try {
        const { insertId } = await db.authors.insert(authorDTO);
        res.json({ msg: 'registered author', id: insertId })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Nope', error: error.message })
    }
})

export default router;