import UsersModel from '../models/users'
import {UserGetType, UserPostType} from "../types/users";
import {hashPassword} from "../common/bcrypt";

// find findById create update delete count exists
class Users {
    private usersModel = new UsersModel()

    async findAll(): Promise<UserGetType[]> {
        try {
            return await this.usersModel.findAll()
        } catch (err) {
            console.error("Error users ctrl findAll ", err)
            throw err
        }
    }

    async findById(id: string): Promise<UserGetType | Partial<Error>> {
        try {
            return await this.usersModel.findById(id)
        } catch (err) {
            console.log("Error users ctrl findById", err)
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