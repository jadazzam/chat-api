import PoolDB from "../db";
import {RoomsType} from "../types/rooms";

class RoomsModel {
    private pool: PoolDB = new PoolDB()

    async findAll(): Promise<RoomsType[]> {
        try {
            const query = `SELECT *
                           FROM rooms`
            const response = await this.pool.query(query);
            return response.rows as RoomsType[]
        } catch (e) {
            console.error("Error RoomsModel findAll", e)
            throw e
        }
    }

    async findByParam(param: "owner_id" | "id", value: string): Promise<RoomsType[]> {
        try {
            const query = `SELECT *
                           FROM rooms
                           WHERE ${param} = $1`
            const response = await this.pool.query(query, [value])
            return response.rows as RoomsType[]
        } catch (e) {
            console.error("Error RoomsModel findByParam", e)
            throw e
        }
    }

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