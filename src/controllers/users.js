import UsersModel from '../models/users';
import { hashPassword } from "../common/bcrypt";
// find findById create update delete count exists
class Users {
    constructor() {
        this.usersModel = new UsersModel();
    }
    async findAll() {
        try {
            const response = await this.usersModel.findAll();
            return response;
        }
        catch (err) {
            console.error("Error Users Ctrl ", err);
            throw err;
        }
    }
    async create(payload) {
        try {
            const { password } = payload;
            console.log("password in ctrl =>", password);
            const hashedPassword = hashPassword(password);
            console.log("hashedPassword", hashedPassword);
            const response = await this.usersModel.create(payload);
            return response;
        }
        catch (err) {
            console.log("Error Users Ctrl ", err);
            throw err;
        }
    }
}
export default Users;
