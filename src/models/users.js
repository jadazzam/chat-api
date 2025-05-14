import PoolDB from "../db";
class Users {
    constructor() {
        this.pool = new PoolDB();
    }
    async findAll() {
        try {
            const res = await this.pool.query('SELECT id, name, email FROM users');
            return res.rows;
        }
        catch (e) {
            console.error("Error in Users Model findAll:", e);
            throw e;
        }
    }
    async create(payload) {
        try {
            const query = `
                INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3) RETURNING *;
            `;
            const values = [payload.name, payload.email, payload.password];
            const res = await this.pool.query(query, values);
            return res.rows[0];
        }
        catch (e) {
            console.error("Error in Users Model findAll:", e);
            throw e;
        }
    }
}
export default Users;
