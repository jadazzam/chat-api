import PoolDB from "../db";
import {RoomsType} from "../types/rooms";

class RoomsModel {
    private pool: PoolDB = new PoolDB()

    async create(payload: { name: string, ownerId: string }): Promise<RoomsType> {
        try {
            const query = `INSERT INTO rooms (name, owner_id)
                           VALUES ($1, $2) RETURNING *`
            const response = await this.pool.query(query, [payload.name, payload.ownerId]);
            return response.rows[0] as RoomsType
        } catch (e) {
            console.error("Error RoomsModel Create", e)
            throw e
        }
    }
}

export default RoomsModel