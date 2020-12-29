import * as passport from 'passport';
import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { ReqUser } from '../../utils/types';

const router = Router();

// POST auth/login
router.post('/', passport.authenticate('local'), async (req: ReqUser, res) => {
    // we need to write a post route because we will be sending up a req.body that has the username and password we're trying to log in with
    // putting the passport middleware after the request means it will intercept our request before it is complete 
    
    const token = createToken({ userid: req.user.id }) // comes from interface IPayload
        res.json(token);

})

export default router;