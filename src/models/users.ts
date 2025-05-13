import PoolDB from "../db";
import { QueryResult } from "pg";

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
}

class Users {
    private pool: PoolDB;

    constructor() {
        this.pool = new PoolDB();
    }

    async findAll(): Promise<UserProps[]> {
        try {
            const res: QueryResult = await this.pool.query('SELECT * FROM users');
            return res.rows as UserProps[];
        } catch (e) {
            console.error("Error in Users Model findAll:", e);
            throw e;
        }
    }
}

export default Users;