import UsersCtrl from "./users";
import AuthMiddleware from "../middlewares/auth";
import {UserGetType} from "../types/users";
import {comparePasswords} from "../common/bcrypt";

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
            const user: UserGetType | null = await this.usersCtrl.findByParam("email", email, true)
            if (!user) throw new Error("User not found")
            // must await, otherwise exception error not detected
            const isIdentical = await comparePasswords(payload.password, user.password ?? '')
            if (isIdentical) delete user.password
            else throw new Error('Error signin password is incorrect')
            const token: string = await AuthMiddleware.createToken({email, password})
            if (!token) throw new Error('Error creating token')
            return {user, token}
        } catch (err) {
            console.error("Error Auth Ctrl sign in", err)
            throw err
        }
    }

    async signUp(payload: { name: string, email: string; password: string }): Promise<{
        user: UserGetType
        token: string | undefined
    }> {
        try {
            if (!payload || !payload.email || !payload.password || !payload.name) {
                let field = ''
                if (!payload.email) field += 'email'
                if (!payload.password) field += ' password'
                if (!payload.name) field += ' name'
                throw new Error(`No user sign up info provided. Missing fields : ${field}`)
            }
            const {email, password} = payload
            let user: UserGetType | null = await this.usersCtrl.findByParam("email", email)
            if (user) throw new Error(`User ${email} already exists`)
            user = await this.usersCtrl.create(payload)
            const token: string = await AuthMiddleware.createToken({email, password})
            if (!token) throw new Error('Error creating token')
            return {user, token}
        } catch (err) {
            console.error("Error Auth Ctrl sign up", err)
            throw err
        }
    }
}

export default AuthController