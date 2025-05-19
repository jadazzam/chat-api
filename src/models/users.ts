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
            const res: QueryResult = await this.pool.query('SELECT id, name, email, created_at FROM users');
            return res.rows as UserGetType[];
        } catch (e) {
            console.error("Error in Users Model findAll:", e);
            throw e;
        }
    }

    async findById(id: string): Promise<UserGetType> {
        try {
            const res: QueryResult = await this.pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
            return res.rows[0] as UserGetType;
        } catch (e) {
            console.error("Error in Users Model findById:", e);
            throw e;
        }
    }

    async findByParam(param: string, value: unknown, complete: boolean): Promise<UserGetType> {
        const allowedParams = ['name', 'email']; // Define allowed columns only
        if (!allowedParams.includes(param)) {
            throw new Error(`Invalid parameter for search: ${param}`);
        }
        try {
            let query = `SELECT id, name, email, created_at
                         FROM users
                         WHERE ${param} = $1`
            if (complete) query = `SELECT id, name, email, password, created_at
                                   FROM users
                                   WHERE ${param} = $1`
            const res: QueryResult = await this.pool.query(query, [value]);
            return res.rows[0] as UserGetType;
        } catch (e) {
            console.error("Error in Users Model findByParam:", e);
            throw e;
        }
    }

    async create(payload: UserPostType): Promise<UserGetType> {
        try {
            const query = `
                INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3) RETURNING id, name, email, created_at;
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