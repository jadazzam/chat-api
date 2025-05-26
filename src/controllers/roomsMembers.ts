import {UserGetType} from "../types/users";
import RoomsMembersModel from "../models/roomsMembers";
import {RoomsMembersType} from "../types/roomsMembers";

class RoomsMembersController {
    private user: Pick<UserGetType, "id" | "name" | "email">;
    private roomsMembersModel: RoomsMembersModel = new RoomsMembersModel();

    constructor(props: { user: Pick<UserGetType, "id" | "name" | "email"> }) {
        this.user = props.user;
    }

    async findByParam(param: "user_id" | "room_id" = "user_id", value: unknown = this.user.id): Promise<RoomsMembersType[]> {
        try {
            const allowedParams = ["user_id", "room_id"]
            if (!allowedParams.includes(param)) throw new Error(`findByParam ${param} not allowed`);
            return await this.roomsMembersModel.findByParam(param, value)
        } catch (e) {
            console.error("Error RoomsMembers Controller find", e)
            throw e
        }
    }

    async update(room_id: string, user_id: string, changes: {
        active: string
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
            if (active !== "false") throw new Error(`active value ${active} not supported`)
            // user can only quit room. If he joins ago, it will be a new row in rooms_members.
            // rooms_members row can only be deactivated. Activation not possible.
            return await this.roomsMembersModel.update(room_id, user_id, {active: false})
        } catch (e) {
            console.error("Error RoomsMembers Controller update", e)
            throw e
        }
    }


}

export default RoomsMembersController;