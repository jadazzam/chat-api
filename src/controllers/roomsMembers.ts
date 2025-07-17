import {UserGetType} from "../types/users";
import RoomsMembersModel from "../models/roomsMembers";
import {RoomsMembersType} from "../types/roomsMembers";

class RoomsMembersController {
    private user: Pick<UserGetType, "id" | "name" | "email">;
    private roomsMembersModel: RoomsMembersModel = new RoomsMembersModel();

    constructor(props: { user: Pick<UserGetType, "id" | "name" | "email"> }) {
        this.user = props.user;
    }

    async findByParam(param: "user_id" | "room_id" = "user_id", value: string = this.user.id): Promise<RoomsMembersType[]> {
        try {
            const allowedParams = ["user_id", "room_id"]
            if (!allowedParams.includes(param)) throw new Error(`findByParam ${param} not allowed`);
            return await this.roomsMembersModel.findByParam(param, value)
        } catch (e) {
            console.error("Error RoomsMembers Controller find", e)
            throw e
        }
    }

    async create(params: { roomId: string; userId: string }): Promise<RoomsMembersType> {
        try {
            const {roomId, userId} = params
            if (!roomId) throw new Error(`roomId param is required`);
            if (!userId) throw new Error(`userId param is required`);
            const rooms: RoomsMembersType[] = await this.roomsMembersModel.findByParams({roomId, userId})
            const isAlreadyMember: RoomsMembersType | undefined = rooms.find(_r => _r.left_at === null)
            if (isAlreadyMember) return isAlreadyMember
            return await this.roomsMembersModel.create({roomId, userId});
        } catch (e) {
            console.error("Error RoomsMembers Controller create", e)
            throw e
        }
    }

    async update(room_id: string, user_id: string, changes: {
        active: boolean
    }): Promise<RoomsMembersType> {
        try {
            if (!room_id) throw new Error("room_id must be provided");
            if (!user_id) throw new Error("user_id must be provided");
            const allowedChanges = ['active']
            const changesKeys = Object.keys(changes)
            changesKeys.forEach(key => {
                if (!allowedChanges.includes(key)) throw new Error(`update ${key} param is not allowed`);
            })
            let {active} = changes
            if (active !== false) throw new Error(`active value ${active} not supported`)
            // user can only quit room. If he joins ago, it will be a new row in rooms_members.
            // rooms_members row can only be deactivated. Activation not possible.
            return await this.roomsMembersModel.update(room_id, user_id, {active})
        } catch (e) {
            console.error("Error RoomsMembers Controller update", e)
            throw e
        }
    }


}

export default RoomsMembersController;