import express, {Request, Response} from 'express';
import RoomsMembersController from "../controllers/roomsMembers";
import {RequestWithUserType} from "../types/requests"

const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const {user} = req as RequestWithUserType
        const sanitized = Object.assign({}, {id: user.id, email: user.email, name: user.name})
        const ctrl = new RoomsMembersController({user: sanitized});
        const response = await ctrl.findByParam()
        return res.status(200).json(response)
    } catch (e) {
        console.error('Error route GET rooms-members', e)
        res.status(500).json({error: (e as Error).message})
    }
})

interface RoomsMembersPostRequestType extends RequestWithUserType {
    params: { roomId: string; userId: string };
}

router.post('/', async (req: Request, res: Response) => {
    try {
        const {user} = req as RoomsMembersPostRequestType
        const {roomId, userId} = req.body
        const sanitized = Object.assign({}, {id: user.id, email: user.email, name: user.name})
        const ctrl = new RoomsMembersController({user: sanitized});
        const response = await ctrl.create({roomId, userId})
        return res.status(200).json(response)
    } catch (e) {
        console.error('Error route POST roomsMembers roomId and userId', e)
        res.status(500).json({message: `'Error route POST roomsMembers roomId and userId' ${e}`})
    }
})

interface RoomsMembersPutRequestType extends RequestWithUserType {
    body: { active: boolean }
}

router.put('/:roomId/:userId', async (req: Request, res: Response) => {
    try {
        const {user} = req as RoomsMembersPutRequestType
        const {active} = req.body as Record<"active", boolean>
        const {roomId, userId} = req.params
        const sanitized = Object.assign({}, {id: user.id, email: user.email, name: user.name})
        const ctrl = new RoomsMembersController({user: sanitized});
        const response = await ctrl.update(roomId, userId, {active})
        return res.status(200).json(response)
    } catch (e) {
        console.error('Error route PUT rooms-members roomId and userId', e)
        res.status(500).json({message: `Error route PUT rooms-members roomId and userId ${e}`})
    }
})


export default router