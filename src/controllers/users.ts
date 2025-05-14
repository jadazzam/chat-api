import UsersModel from '../models/users'
import {UserGetType, UserPostType} from "../types/users";
import {hashPassword} from "../common/bcrypt";

// find findById create update delete count exists
class Users {
    private usersModel = new UsersModel()

    async findAll(): Promise<UserGetType[]> {
        try {
            const response: UserGetType[] = await this.usersModel.findAll()
            return response
        } catch (err) {
            console.error("Error Users Ctrl ", err)
            throw err
        }
    }

    async create(payload: UserPostType): Promise<UserGetType | Partial<Error>> {
        try {
            const {password} = payload
            const hashedPassword = hashPassword(password)
            if (hashedPassword) payload.password = hashedPassword
            else Error("create user error : password hash")
            return await this.usersModel.create(payload)
        } catch (err) {
            console.log("Error Users Ctrl ", err)
            throw err
        }
    }


}

export default Users;