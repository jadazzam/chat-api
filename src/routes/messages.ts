import {Request, Response, Router} from "express";
import MessagesController from "../controllers/messages";
import {UserGetType} from "../types/users";
import {MessageType} from "../types/messages";

const router = Router()

interface MessagesRequestProps extends Request {
    user: Omit<UserGetType, "password">;
}

router.get('/', async (req: Request, res: Response) => {
    try {
        const authUser = (req as MessagesRequestProps).user;
        const user = {
            id: authUser.id,
            email: authUser.email,
            created_at: authUser.created_at,
            name: authUser.name
        };
        const ctrl = new MessagesController({user: user});
        const messages: MessageType[] = await ctrl.findByUser();
        return res.status(200).json(messages);
    } catch (e) {
        console.error("Error Route GET messages", e);
        res.status(500).json({message: (e as Error).message});
    }
});


router.post('/', async (req: Request, res: Response) => {
    try {
        const authUser = (req as MessagesRequestProps).user;
        const user = {
            id: authUser.id,
            email: authUser.email,
            created_at: authUser.created_at,
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
export default router