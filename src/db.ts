import {Pool} from 'pg';

type Config = {
    user: string | undefined;
    port: number | undefined;
    database: string | undefined;
}

const config : Config = {
    user: process.env.DB_USER,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    database: process.env.DB_NAME
}
let pool = null
try {
     pool = new Pool(config)
    console.log("connected to pool - postgresql DB")
} catch(e) {
    console.error("pool =>", e);
}

export default pool;