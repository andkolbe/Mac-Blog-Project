import { Router } from 'express';
import * as passport from 'passport';
import { ReqUser } from '../../utils/types';

const router = Router();

// GET /api/lulz
router.get('/', passport.authenticate('jwt'), (req: ReqUser, res) => {
    
    res.json({ msg: 'LULZ', test: req.user });
    
});

export default router;