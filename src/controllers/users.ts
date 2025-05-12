import {client} from "../db";
export type userProps = {
    id: number;
    name: string;
    email: string;
    password: string;
};
class Users {
    static async get(): Promise<userProps[]> {
        const user = {
            id: 1,
            name: 'Alice',
            email: 'alice@gmail.com',
            password: 'password',
        };
        const resp = await client.query('SELECT * FROM users');
        console.log("resp in controller =>", resp)
        return Promise.resolve([user]); // return an array
    }
}

export default Users;