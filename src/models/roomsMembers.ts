import PoolDB from "../db";
import {RoomsMembersType} from "../types/roomsMembers";

class RoomsMembersModel {
    private pool: PoolDB = new PoolDB();

    async findByParam(param: "user_id" | "room_id", value: string) {
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

    async findByParams({userId, roomId}: { userId: string, roomId: string }) {
        try {
            let query = 'SELECT * FROM rooms_members';
            const values = [];
            const conditions = [];
            if (userId) {
                values.push(userId);
                conditions.push(`user_id = $${values.length}`);
            }
            if (roomId) {
                values.push(roomId);
                conditions.push(`room_id = $${values.length}`);
            }
            console.log("conditions ???", conditions)
            if (conditions.length) {
                query += ' WHERE ' + conditions.join(' AND ');
            }
            const res = await this.pool.query(query, values);
            return res.rows as RoomsMembersType[];
        } catch (e) {
            console.error('Error RoomsMembersModel findByParams', e);
            throw e;
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
                  AND user_id = $4
                  AND left_at IS NULL RETURNING *;
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