import {Request, Response, Router} from 'express';
import AuthController from "../controllers/auth";
import {UserGetType} from "../types/users";
import cookie from 'cookie';


const router = Router();

router.post("/signin", async (req: Request, res: Response<{ user: UserGetType } | {
    message: string
}>) => {
    try {
        const ctrl = new AuthController()
        const {user, token} = await ctrl.signIn({
            email: req.body.email,
            password: req.body.password
        })
        res.setHeader('Set-Cookie', cookie.serialize('auth_token', token!, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // Sec * Min * Hours * Days
            path: '/',
        }));
        res.status(200).json({user});
    } catch (e: any) {
        console.error("Error sign in", e)
        res.status(401).json(e)
    }
})

router.post("/signup", async (req: Request, res: Response<{ user: UserGetType } | {
    message: string
}>) => {
    try {
        const ctrl = new AuthController()
        const {user, token} = await ctrl.signUp({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.setHeader('Set-Cookie', cookie.serialize('auth_token', token!, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // Sec * Min * Hours * Days
            path: '/',
        }));
        res.status(200).json({user});
    } catch (e: any) {
        console.error("Error sign in", e)
        res.status(401).json({message: e.message})
    }
})

export default router;