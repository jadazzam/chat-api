import PoolDB from "../db";
import {MessageType} from "../types/messages";
import {QueryResult} from "pg";

class MessagesModel {
    private pool: PoolDB;

    constructor() {
        this.pool = new PoolDB();
    }

    async findByParam(param: string, value: string) {
        const allowedParams = ["id", "user_id", "room_id"];
        try {
            if (!allowedParams.includes(param)) {
                throw new Error(`Invalid parameter: ${param}`)
            }
            let query = `SELECT id, content, user_id, room_id
                         FROM messages
                         WHERE ${param} = $1`
            const res: QueryResult = await this.pool.query(query, [value]);
            return res.rows[0] as MessageType;
        } catch (e) {
            console.error('Error in Messages model findByParam', e);
            throw e
        }
    }
}

export default MessagesModel;