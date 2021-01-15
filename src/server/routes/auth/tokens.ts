import { Router } from 'express';
import * as passport from 'passport';

const router = Router();

router.get('/verify', passport.authorize('jwt') , async (req, res) => res.sendStatus(200));

export default router;

// Use this router to check if a token is valid or not