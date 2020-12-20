import { Router } from 'express';
import * as passport from 'passport';
import { createToken } from '../../utils/tokens';
import { ReqUser } from '../../utils/types';

const router = Router();

router.post('/', passport.authenticate('local'), async (req: ReqUser, res) => {
    const token = createToken({ userid: req.user.id }) // comes from interface IPayload
        res.json(token);
})

export default router;