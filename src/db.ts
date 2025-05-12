import pg from 'pg';

type Config = {
    user: string;
    port: number;
    database: string
}

const config: Config = {
    user: 'jazzam',
    // password: '',
    // host: 'host',
    port: 5432,
    database: 'chat-db',
}

const client = new pg.Client(config);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');
    } catch (err) {
        console.error('Connection error:', err);
    }
}
await connectDB();
export { client };