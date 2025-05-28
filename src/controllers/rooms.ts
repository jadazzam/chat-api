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
            const allowedParams: string[] = ["name"];
            Object.keys(payload).forEach((key) => {
                if (!allowedParams.includes(key)) throw new Error('key not allowed');
            })
            allowedParams.forEach((param: string) => {
                if (!payload[param as keyof typeof payload]) throw new Error(`key not allowed: ${param}`);
            })
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