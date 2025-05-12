// src/controllers/users.ts
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
        return Promise.resolve([user]); // return an array
    }
}

export default Users;