import db from '../../db';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords'; // a hashed password is generated when a new user registers
import { createToken } from '../../utils/tokens';

const router = Router();

// someone is going to fill out a form and submit it to register to the website. Needs to be a post request
// POST /auth/register
router.post('/', async (req, res) => {
    const newAuthorDTO = req.body; // req.body is all of our form data. ex: email, name, password
    // console.log(newAuthorDTO); console logging the req body will have it show up in the terminal
    // res.json(newAuthorDTO); parsing the req.body will have it show up in postman
    newAuthorDTO.password = generateHash(newAuthorDTO.password); // The right hand side of the equal sign evaluates first
    // It takes the plain text password on the req.body, passes it through the algorithm and generates a hash and salted password, and then reassigns itself to itself
    try {
        const result = await db.authors.insert(newAuthorDTO); // we want to register a new author on our blog site
        const token = createToken({ userid: result.insertId }) // result.insertId represents the id of who was just inserted into the authors table // userid comes from interface IPayload
        // createToken takes one parameter: payload. The payload comes attached to the req.body of each individual user. Use the id to specify each user 
        res.json(token); // this will return a json web token on postman. encoded not encrypted
        // this token is stored in state on our front end until the user logs out
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Register Error', error })
    }
})

export default router;