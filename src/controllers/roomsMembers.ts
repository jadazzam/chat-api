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
            if (!allowedParams.includes(param)) throw new Error(`Error RoomMembersController findByParam ${param} not allowed`);
            return await this.roomsMembersModel.findByParam(param, value)
        } catch (e) {
            console.error("Error Controller Rooms Members find", e)
            throw e
        }
    }
}

export default RoomsMembersController;