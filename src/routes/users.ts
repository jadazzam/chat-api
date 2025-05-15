import {Request, Response, Router} from 'express';
import Users from '../controllers/users';
import {UserGetType} from "../types/users";

const router = Router();

router.get('/', async (_req: Request, res: Response<UserGetType[] | Partial<Error>>) => {
    try {
        const ctrl = new Users();
        const response = await ctrl.findAll();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({message: "get users error"});
    }
});

router.get('/:id', async (_req: Request, res: Response<UserGetType[] | Partial<Error>>) => {
    try {
        const {id} = _req.params
        const ctrl = new Users();
        const response = await ctrl.findById(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({message: "get users error"});
    }
});

router.post('/', async (_req: Request, res: Response<UserGetType | Partial<Error>>) => {
    try {
        const ctrl = new Users();
        const payload = {
            name: _req.body.name,
            email: _req.body.email,
            password: _req.body.password,
        }
        const response: UserGetType | Partial<Error> = await ctrl.create(payload);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({message: "create user error"});
    }
})
export default router;