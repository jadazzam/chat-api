import { Pool } from 'pg';
class PoolDB {
    constructor() {
        this.pool = null;
        this.config = {
            user: process.env.DB_USER,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST || 'localhost',
            password: process.env.DB_PASSWORD,
        };
    }
    init() {
        if (!this.pool) {
            try {
                this.pool = new Pool(this.config);
                console.log("Connected to PostgresSQL pool");
            }
            catch (e) {
                console.error("Failed to initialize pool:", e);
                throw e;
            }
        }
        return this.pool;
    }
    async query(sql, params) {
        const pool = this.init();
        try {
            return pool.query(sql, params);
        }
        catch (e) {
            console.error(`Query failed: ${sql}`, e);
            throw e;
        }
    }
}
export default PoolDB;
