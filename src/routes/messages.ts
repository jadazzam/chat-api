import {Request, Response, Router} from "express";
import MessagesController from "../controllers/messages";
import {MessageType} from "../types/messages";
import {RequestWithUserType} from "../types/requests";

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const authUser = (req as RequestWithUserType).user;
        const user = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.name
        };
        const ctrl = new MessagesController({user: user});
        const messages: MessageType[] = await ctrl.findByParam("user_id");
        return res.status(200).json(messages);
    } catch (e) {
        console.error("Error Route GET messages", e);
        res.status(500).json({message: (e as Error).message});
    }
});


router.post('/', async (req: Request, res: Response) => {
    try {
        const authUser = (req as RequestWithUserType).user;
        const user = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.name,
        }
        const {body} = req
        const ctrl = new MessagesController({user: user});
        const message: MessageType = await ctrl.create(body);
        res.status(200).json(message);
    } catch (e) {
        console.error("Error Route POST message", e);
        res.status(500).json({message: (e as Error).message});
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const payload = req.body
        const authUser = (req as RequestWithUserType).user;
        const user = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.name,
        }
        const ctrl = new MessagesController({user: user});
        const message: MessageType = await ctrl.update(id, payload);
        res.status(200).json(message);
    } catch (e) {
        console.error("Error Route POST message", e);
        res.status(500).json({message: (e as Error).message});
    }
})

export default router