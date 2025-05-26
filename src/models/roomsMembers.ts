import PoolDB from "../db";
import {RoomsMembersType} from "../types/roomsMembers";

class RoomsMembersModel {
    private pool: PoolDB

    constructor() {
        this.pool = new PoolDB();
    }

    async findByParam(param: "user_id" | "room_id", value: unknown) {
        try {
            const query = `SELECT *
                           FROM rooms_members
                           WHERE ${param} = $1`
            const res = await this.pool.query(query, [value])
            return res.rows as RoomsMembersType[];
        } catch (e) {
            console.error("Error RoomsMembersModel findByParam", e);
            throw e
        }
    }
}

export default RoomsMembersModel