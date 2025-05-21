import {Request, Response, Router} from "express";
import MessagesController from "../controllers/messages";
import {UserGetType} from "../types/users";

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
        const messages = await ctrl.findByParam();
        return res.status(200).json(messages);
    } catch (e) {
        console.error("Error Route GET messages", e);
        res.status(500).json({message: (e as Error).message});
    }
});


// router.post('/', (req: Request, res: Response) => {
//     console.log("POST messages")
//     return;
// })
export default router