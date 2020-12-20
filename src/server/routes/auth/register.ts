import db from '../../db';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords';
import { createToken } from '../../utils/tokens';

const router = Router();

// POST /auth/register
router.post('/', async (req, res) => {
    const newAuthorDTO = req.body;
    newAuthorDTO.password = generateHash(newAuthorDTO.password); // The right hand side of the equal sign evaluates first
    // It takes the plain text password, passes it through to algorithm, and generates a hash and salted password, and then reassigns itself to itself
    try {
        const cannedResponse = await db.authors.insert(newAuthorDTO);
        const token = createToken({ userid: cannedResponse.insertId }) // comes from interface IPayload
        res.json(token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Register Error', error })
    }
})

export default router;