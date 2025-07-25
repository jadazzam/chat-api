import {UserGetType, UserRequestType} from "../types/users";
import RoomsModel from "../models/rooms";
import {RoomsType} from "../types/rooms";
import MessagesController from "./messages";
import {MessageType} from "../types/messages";
import UsersController from "./users";

class RoomsController {
    private roomsModel = new RoomsModel()
    private user: UserRequestType

    constructor(user: UserRequestType) {
        this.user = user
    }

    async findAll() {
        try {
            return await this.roomsModel.findAll();
        } catch (e) {
            console.error("Error RoomsController findAll", e)
            throw e
        }
    }

    async findByParam(param: "id" | "owner_id", value: string, complete: boolean = false): Promise<{
        data: RoomsType[],
        messages?: MessageType[]
    }> {
        try {
            const allowedParams = ["id", "owner_id"]
            if (!allowedParams.includes(param)) throw new Error(`${param} not allowed`)
            if (!value) throw new Error(`value for ${param} required`)
            const response = await this.roomsModel.findByParam(param, value)
            let res = Object.assign({}, {data: response})
            if (complete) {
                const MessagesCtrler = new MessagesController({user: this.user})
                let messages: MessageType[] = await MessagesCtrler.findByParam('room_id', value)
                let usersIds: string[] = []
                for (const message of messages) {
                    if (usersIds.some(_u => _u === message.user_id)) continue
                    else usersIds.push(message.user_id)
                }
                if (usersIds.length) {
                    const UsersCtrler = new UsersController()
                    const users: UserGetType[] = await UsersCtrler.findByIds(usersIds)
                    messages = messages.map(_message => {
                        return Object.assign({}, _message, {user: users.find((_u: UserGetType) => _u.id === _message.user_id)})
                    })
                }
                res = Object.assign({}, res, {messages})
            }
            return res
        } catch (e) {
            console.error("Error RoomsController findByParam", e)
            throw e
        }
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