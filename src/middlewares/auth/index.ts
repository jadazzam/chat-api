import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET

class AuthMiddleware {

    static checkJwtSecret(): boolean {
        return !!process.env.JWT_SECRET
    }


    static verifyToken(req: Request, res: Response, next: NextFunction): void {
        try {
            if (!JWT_SECRET) res.status(500).json({message: "Error JWT token"})
            const cookies = cookie.parse(req.headers.cookie || '');
            const token = cookies.auth_token;
            if (!token) {
                res.status(401).json({message: 'Not authorized: No token provided'});
            }
            (req as any).user = jwt.verify(token || '', JWT_SECRET || '');
            next();
        } catch (err) {
            console.error("Error JWT verification failed:", err);
            res.status(403).json({message: 'Invalid token', error: err});
        }
    }

    static decodeToken(token: string | undefined) {
        if (token?.startsWith('Bearer ')) token = token.split("Bearer ").pop()
        return token && jwt.verify(token, process.env.JWT_SECRET || '');
    }

    static async createToken(payload: { email: string; name: string, id: string }): Promise<string> {
        const {email, name, id} = payload
        if (!this.checkJwtSecret()) throw new Error('Error signing in');
        try {
            return jwt.sign({
                email,
                name,
                id
            }, process.env.JWT_SECRET || '', {expiresIn: '7d'})
        } catch (err) {
            console.error("Error JWT create token", err)
            throw err
        }

    }
}

export default AuthMiddleware;