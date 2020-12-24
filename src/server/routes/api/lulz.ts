import { Router } from 'express';
import * as passport from 'passport';
import type { ReqUser } from '../../utils/types';

const router = Router();

// GET /api/lulz
router.get('/', passport.authenticate('jwt'), (req: ReqUser, res) => { 
    // you pass a string value into passport.authenticate with the stategy you want to use
    
    res.json({ msg: 'LULZ', test: req.user })
    
});

router.post('/', passport.authenticate('jwt'), async (req: ReqUser, res) => {

    const newBlog = req.body;
    const authorid = req.user.id; // represents the id of the user who is logged in

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'merp', error });
    }
})

export default router;