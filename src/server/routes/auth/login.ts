import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import db from '../../db';
import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { ReqUser } from '../../utils/types';

const router = Router();

// POST auth/login
router.post('/', passport.authenticate('local'), async (req: ReqUser, res) => { // login is always an authenticate request. Use authenticate when you are creating a token
    // we need to write a post route because we will be sending up a req.body that has the username and password we're trying to log in with
    // putting the passport middleware after the request means it will intercept our request before it is complete 
    
    const token = createToken({ userid: req.user.id }) 
    // userid comes from interface IPayload
    // req.user is created when you log in using a passport strategy
    
    // you create a new token every time you log in 
        res.json(token);
})

// How to write a login route without passport

// router.post('/', async (req: ReqUser, res) => {
//     const loginAttempt = req.body;
//     try {
//         const [userRecord] = await db.authors.find('email', loginAttempt.email);
//         if (userRecord && bcrypt.compareSync(loginAttempt.password, userRecord.password)) { // check if the plain text password and salted and hashed passwords are the same
//             delete userRecord.password;
//             const token = createToken({ userid: userRecord.id }) 
//             res.json(token);
//         } else {
//             res.json('email or password is wrong')
//             you don't want to write if else logic specifying if the email or password is singularly wrong. That makes it easier for someone to hack your code
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: 'Derp', error: error.message })
//     }
 
//  })

// authentication deals with logging in and registering 

export default router;