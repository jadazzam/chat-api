import {Request, Response, Router} from 'express';
import AuthController from "../controllers/auth";
import {UserGetType} from "../types/users";


const router = Router();

router.post("/signin", async (req: Request, res: Response<{ token: string | undefined, user: UserGetType } | {
    message: string
}>) => {
    try {
        const ctrl = new AuthController()
        const response = await ctrl.signIn({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(200).json(response);
    } catch (e: any) {
        console.error("Error sign in", e)
        return res.status(401).json({message: e.message})
    }
})

router.post("/signup", async (req: Request, res: Response<{ token: string | undefined, user: UserGetType } | {
    message: string
}>) => {
    try {
        const ctrl = new AuthController()
        const response = await ctrl.signUp({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.status(200).json(response);
    } catch (e: any) {
        console.error("Error sign in", e)
        return res.status(401).json({message: e.message})
    }
})

export default router;