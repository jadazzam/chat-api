import { Pool, PoolConfig, QueryResult } from 'pg';

class PoolDB {
    private config: Readonly<PoolConfig>;
    private pool: Pool | null = null;

    constructor() {
        this.config = {
            user: process.env.DB_USER,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST || 'localhost',
            password: process.env.DB_PASSWORD,
        };
    }

    private init(): Pool {
        if (!this.pool) {
            try {
                this.pool = new Pool(this.config);
                console.log("Connected to PostgreSQL pool");
            } catch (e) {
                console.error("Failed to initialize pool:", e);
                throw e;
            }
        }
        return this.pool;
    }

    async query(sql: string, params?: any[]): Promise<QueryResult> {
        const pool = this.init();
        try {
            return pool.query(sql, params);
        } catch (e) {
            console.error(`Query failed: ${sql}`, e);
            throw e;
        }
    }
}

export default PoolDB;