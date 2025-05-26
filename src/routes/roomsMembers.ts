import express, {Request, Response} from 'express';
import RoomsMembersController from "../controllers/roomsMembers";
import {UserGetType} from "../types/users";

const router = express.Router();

interface RoomsMembersRequest extends Request {
    user: Pick<UserGetType, "id" | "name" | "email">;
}

router.get('/', async (req: Request, res: Response) => {
    const user = (req as RoomsMembersRequest).user
    const sanitized = Object.assign({}, {id: user.id, email: user.email, name: user.name})
    const ctrl = new RoomsMembersController({user: sanitized});
    const response = await ctrl.findByParam()
    return res.status(200).send(response)
})
export default router