import {UserRequestType} from "../types/users";
import RoomsModel from "../models/rooms";

class RoomsController {
    private roomsModel = new RoomsModel()
    private user: UserRequestType

    constructor(user: UserRequestType) {
        this.user = user
    }

    async create(payload: { name: string }) {
        try {
            if (!payload.name) throw new Error("name is required");
            const room = {
                name: payload.name,
                ownerId: this.user.id,
            }
            return await this.roomsModel.create(room);
        } catch (e) {
            console.error("Error RoomsController Create", e)
            throw e
        }
    }
}

export default RoomsController