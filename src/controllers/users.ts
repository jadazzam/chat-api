import UsersModel from '../models/users'
import {UserGetType, UserPostType} from "../types/users";

// find findById create update delete count exists
class Users {
    private usersModel = new UsersModel()

    async findAll(): Promise<UserGetType[]> {
        try {
            const response: UserGetType[] = await this.usersModel.findAll()
            return response
        } catch (err) {
            console.log("Error Users Ctrl ", err)
            throw err
        }
    }

    async create(payload: UserPostType): Promise<UserGetType | undefined> {
        try {
            return await this.usersModel.create(payload)
        } catch (err) {
            console.log("Error Users Ctrl ", err)
            throw err
        }
    }


}

export default Users;