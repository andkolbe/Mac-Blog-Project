import db from '../../db';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords';
import { createToken } from '../../utils/tokens';

const router = Router();

// someone is going to fill out a form and submit it to register to the website. Needs to be a post request
// POST /auth/register
router.post('/', async (req, res) => {
    const newAuthorDTO = req.body; // req.body is all of our form data. ex: email, name, password
    newAuthorDTO.password = generateHash(newAuthorDTO.password); // The right hand side of the equal sign evaluates first
    // It takes the plain text password on the req.body, passes it through the algorithm and generates a hash and salted password, and then reassigns itself to itself
    try {
        const cannedResponse = await db.authors.insert(newAuthorDTO); // we want to register a new author on our blog site
        const token = createToken({ authorid: cannedResponse.insertId }) // cannedResponse.insertId represents the id of who was just insterted into the authors table // userid comes from interface IPayload
        res.json(token); // this will return a json web token. encoded not encrypted
        // this token is stored in state on our front end
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Register Error', error })
    }
})

export default router;