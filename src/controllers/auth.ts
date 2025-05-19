import UsersCtrl from "./users";
import AuthMiddleware from "../middlewares/auth";
import {UserGetType} from "../types/users";

class AuthController {
    private usersCtrl = new UsersCtrl()

    async signIn(payload: { email: string; password: string }): Promise<{
        user: UserGetType
        token: string | undefined
    }> {
        try {
            if (!payload || !payload.email || !payload.password) {
                let field = ''
                if (!payload.email) field += 'email'
                if (!payload.password) field += ' password'
                throw new Error(`No user sign in info provided. Missing fields : ${field}`)
            }
            const {email, password} = payload
            const user: UserGetType = await this.usersCtrl.findByParam("email", email)
            if (!user) throw new Error("User not found")
            const token: string = await AuthMiddleware.createToken({email, password})
            if (!token) throw new Error('Error creating token')
            return {user, token}
        } catch (err) {
            console.error("Error Auth Ctrl sign in", err)
            throw err
        }
    }
}

export default AuthController