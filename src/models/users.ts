import PoolDB from "../db";
import {QueryResult} from "pg";
import {UserGetType, UserPostType} from "../types/users";

class Users {
    private pool: PoolDB;

    constructor() {
        this.pool = new PoolDB();
    }

    async findAll(): Promise<UserGetType[]> {
        try {
            const res: QueryResult = await this.pool.query('SELECT id, name, email FROM users');
            return res.rows as UserGetType[];
        } catch (e) {
            console.error("Error in Users Model findAll:", e);
            throw e;
        }
    }

    async create(payload: UserPostType): Promise<UserGetType> {
        try {
            const query = `
                INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3) RETURNING *;
            `;
            const values = [payload.name, payload.email, payload.password];
            const res: QueryResult = await this.pool.query(query, values);
            return res.rows[0] as UserGetType;
        } catch (e) {
            console.error("Error in Users Model findAll:", e);
            throw e;
        }
    }
}

export default Users;