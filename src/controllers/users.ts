import UsersModel, {UserProps} from '../models/users'

class Users {
    private usersModel = new UsersModel()

    async findAll(): Promise<UserProps[] | undefined> {
        try {
            const res = await this.usersModel.findAll()
            return res
        } catch(err) {
            console.log("Error Users Ctrl ",err)
            throw err
        }
    }
}

export default Users;