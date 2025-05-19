import UsersModel from '../models/users'
import {UserGetType, UserPostType} from "../types/users";
import {hashPassword} from "../common/bcrypt";

class UsersController {
    private usersModel = new UsersModel()

    async findAll(): Promise<UserGetType[]> {
        try {
            const response = await this.usersModel.findAll()
            if (!response) throw new Error(`Users not found`)
            return response
        } catch (err) {
            console.error("Error users ctrl findAll ", err)
            throw err
        }
    }

    async findById(id: string): Promise<UserGetType> {
        try {
            const response = await this.usersModel.findById(id)
            if (!response) throw new Error(`User with id ${id} not found`)
            return response
        } catch (err) {
            console.error("Error users ctrl findById", err)
            throw err
        }
    }

    async findByParam(param: string, value: unknown, complete = false): Promise<UserGetType | null> {
        try {
            const response = await this.usersModel.findByParam(param, value, complete)
            if (!response) return null
            return response
        } catch (err) {
            console.error("Error users ctrl findById", err)
            throw err
        }
    }

    async create(payload: UserPostType): Promise<UserGetType> {
        try {
            const {password} = payload
            const hashedPassword = hashPassword(password)
            if (hashedPassword) payload.password = hashedPassword
            else throw new Error("create user error : password hash")
            return await this.usersModel.create(payload)
        } catch (err) {
            console.error("Error Users Ctrl ", err)
            throw err
        }
    }


}

export default UsersController;