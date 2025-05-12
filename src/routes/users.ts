import { Router, Request, Response } from 'express';
import Users, { userProps } from '../controllers/users';

const router = Router();

router.get('/', async (_req: Request, res: Response<userProps[]>) => {
    try {
        const userList: userProps[] = await Users.get();
        return res.status(200).json(userList);
    } catch (error) {
        return res.status(500).json([]);
    }
});

export default router;