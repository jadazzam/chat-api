import {Pool, PoolConfig} from 'pg';

class PoolDB {
    private config: Readonly<PoolConfig>;
    private pool: Pool | null = null;
    constructor() {
        this.config = {
            user: process.env.DB_USER,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
            database: process.env.DB_NAME
        }
    }

    private init(): Pool | null {
        if (!this.pool) {
            try {
                this.pool = new Pool(this.config)
                console.log("connected to pool - postgresql DB")
                return this.pool
            } catch(e) {
                console.error("pool =>", e);
            }
        }
        return this.pool
    }

     async query(req: string) {
        let pool = this.pool;
         if (!this.pool) {
              pool = this.init()
         }
         return await pool?.query(req);
     }
}

export default PoolDB