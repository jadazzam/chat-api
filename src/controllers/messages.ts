import {MessageType} from "../types/messages";
import MessagesModel from "../models/messages";
import {UserRequestType} from "../types/users";

class MessagesController {
    private messagesModel: MessagesModel = new MessagesModel()
    private user: UserRequestType;

    constructor(props: { user: UserRequestType }) {
        this.user = props.user

    }

    async findByParam(param: "id" | "user_id" | "room_id", id?: string): Promise<MessageType[]> {
        try {
            if (param === "user_id") id = this.user.id;
            if (!id) throw new Error(`Error Messages Controller: missing param`)
            const allowedParams = ["id", "user_id", "room_id"];
            if (!allowedParams.includes(param)) {
                throw new Error(`Invalid parameter: ${param}`)
            }
            return await this.messagesModel.findByParam(param, id)
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async create(payload: Omit<MessageType, "id" | "created_at" | "user_id">): Promise<MessageType> {
        try {
            const allowedKeys: (keyof typeof payload)[] = ["content", "room_id"]
            Object.keys(payload).forEach((key) => {
                if (!allowedKeys.includes(key as typeof allowedKeys[number])) throw new Error(`Message Create key ${key} not allowed`)
            })
            allowedKeys.forEach((key) => {
                if (payload[key] === undefined || payload[key] === null) throw new Error(`Message Create missing key ${key}`)
                if (typeof payload[key] !== "string") throw new Error(`Message Create key ${key} is incorrect type`)
            })
            return await this.messagesModel.create({...payload, user_id: this.user.id})
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async update(id: string, payload: Pick<MessageType, "content">): Promise<MessageType> {
        try {
            const allowedKeys: (keyof typeof payload)[] = ["content"]
            Object.keys(payload).forEach((key) => {
                if (!allowedKeys.includes(key as typeof allowedKeys[number])) throw new Error(`Message Create key ${key} not allowed`)
            })
            allowedKeys.forEach((key) => {
                if (payload[key] === undefined || payload[key] === null) throw new Error(`Message Create missing key ${key}`)
                if (typeof payload[key] !== "string") throw new Error(`Message Create key ${key} is incorrect type`)
            })
            return await this.messagesModel.update(id, payload)
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

export default MessagesController