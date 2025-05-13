import { Router, Request, Response } from 'express';
import Users from '../controllers/users';
import {UserProps} from '../models/users';

const router = Router();

router.get('/', async (_req: Request, res: Response<UserProps[]>) => {
    try {
        const ctrl = new Users();
        const response = await ctrl.findAll();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json([]);
    }
});

export default router;