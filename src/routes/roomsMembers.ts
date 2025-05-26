import express, {Request, Response} from 'express';
import RoomsMembersController from "../controllers/roomsMembers";
import {UserGetType} from "../types/users";

const router = express.Router();

interface RoomsMembersRequest extends Request {
    user: Pick<UserGetType, "id" | "name" | "email">;
}

router.get('/', async (req: Request, res: Response) => {
    try {
        const user = (req as RoomsMembersRequest).user
        const sanitized = Object.assign({}, {id: user.id, email: user.email, name: user.name})
        const ctrl = new RoomsMembersController({user: sanitized});
        const response = await ctrl.findByParam()
        return res.status(200).json(response)
    } catch (e) {
        console.error('Error route GET rooms-members', e)
        res.status(500).json({error: (e as Error).message})
    }
})

interface RoomsMembersPutRequest extends RoomsMembersRequest {
    params: { roomId: string; userId: string };
    query: { active: string }
}

router.put('/:roomId/:userId', async (req: Request, res: Response) => {
    try {
        const {user} = req as RoomsMembersPutRequest
        let active = req.query.active as string
        const {roomId, userId} = req.params
        const sanitized = Object.assign({}, {id: user.id, email: user.email, name: user.name})
        const ctrl = new RoomsMembersController({user: sanitized});
        const response = await ctrl.update(roomId, userId, {active: active})
        return res.status(200).json(response)
    } catch (e) {
        console.error('Error route PUT rooms-members roomId and userId', e)
        res.status(500).json({error: (e as Error).message})
    }
})


export default router