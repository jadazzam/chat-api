import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

class AuthMiddleware {

    static checkJwtSecret(): boolean {
        return !!process.env.JWT_SECRET
    }


    static verifyToken(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization;
        try {
            if (!this.checkJwtSecret()) res.status(500).json({message: "Error JWT token"})
            if (!authHeader || !authHeader?.startsWith('Bearer ')) {
                res.status(500).json({message: "Error: Not authorized: No token provided"})
            }
            const token = authHeader?.split(' ')[1]
            const decoded = this.decodeToken(token)
            if (decoded) (req as any).user = decoded;
            else res.status(500).json({message: "Error: Not authorized: invalid token provided"})
            next()
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