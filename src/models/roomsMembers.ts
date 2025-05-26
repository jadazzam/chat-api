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

    async create(params: { userId: string, roomId: string }) {
        try {
            const query = `INSERT INTO rooms_members (room_id, user_id)
                           VALUES ($1, $2) RETURNING *`;
            const {userId, roomId} = params
            const res = await this.pool.query(query, [roomId, userId])
            return res.rows[0] as RoomsMembersType;
        } catch (e) {
            console.error("Error RoomsMembersModel create", e);
            throw e
        }
    }

    async update(room_id: string, user_id: string, changes: { active: boolean }) {
        try {
            const query = `
                UPDATE rooms_members
                SET active  = $1,
                    left_at = $2
                WHERE room_id = $3
                  AND user_id = $4 RETURNING *;
            `;

            const now = new Date();
            const res = await this.pool.query(query, [changes.active, now, room_id, user_id]);
            return res.rows[0] as RoomsMembersType;
        } catch (e) {
            console.error("Error RoomsMembersModel findByParam", e);
            throw e
        }
    }


}

export default RoomsMembersModel