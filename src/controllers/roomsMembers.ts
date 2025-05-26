import {UserGetType} from "../types/users";
import RoomsMembersModel from "../models/roomsMembers";

class RoomsMembersController {
    private user: Pick<UserGetType, "id" | "name" | "email">;
    private roomsMembersModel: RoomsMembersModel = new RoomsMembersModel();

    constructor(props: { user: Pick<UserGetType, "id" | "name" | "email"> }) {
        this.user = props.user;
    }

    async findByParam() {
        try {
            return await this.roomsMembersModel.findByParam("user_id", this.user.id)
        } catch (e) {
            console.error("Error Controller Rooms Members find", e)
            throw e
        }
    }
}

export default RoomsMembersController;