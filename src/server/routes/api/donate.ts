import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
    res.json('Test Donate');
})

export default router;