import PoolDB from "../db";
import {MessageType} from "../types/messages";
import {QueryResult} from "pg";

class MessagesModel {
    private pool: PoolDB;

    constructor() {
        this.pool = new PoolDB();
    }

    async findByParam(param: string, value: string): Promise<MessageType[]> {
        try {
            let query = `SELECT id, content, user_id, room_id
                         FROM messages
                         WHERE ${param} = $1`
            const res: QueryResult = await this.pool.query(query, [value]);
            return res.rows as MessageType[];
        } catch (e) {
            console.error('Error in Messages model findByParam', e);
            throw e
        }
    }

    async create(payload: Pick<MessageType, "content" | "user_id" | "room_id">): Promise<MessageType> {
        try {
            const query = `INSERT INTO messages (content, user_id, room_id)
                           VALUES ($1, $2, $3) RETURNING *`
            const values = [payload.content, payload.user_id, payload.room_id]
            const response = await this.pool.query(query, values);
            return response.rows[0] as MessageType;
        } catch (e) {
            console.error("Error message models create", e)
            throw e
        }
    }

    async update(id: string, payload: Pick<MessageType, "content">): Promise<MessageType> {
        let query = ""
        let values: string[] = []
        if (payload.content) {
            query = `UPDATE messages
                     SET content = $1
                     WHERE id = $2 RETURNING *`
            values = [payload.content, id]
        }
        try {
            const response = await this.pool.query(query, values)
            return response.rows[0] as MessageType;
        } catch (e) {
            console.error('Error Messages model update', e);
            throw e
        }
    }
}

export default MessagesModel;