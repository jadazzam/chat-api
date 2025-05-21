import {MessageType} from "../types/messages";
import MessagesModel from "../models/messages";
import {UserGetType} from "../types/users";

class MessagesController {
    private messagesModel: MessagesModel = new MessagesModel()
    private user: Pick<UserGetType, "id" | "name" | "email">;

    constructor(props: { user: Omit<UserGetType, "password"> }) {
        this.user = props.user

    }

    async findByUser(): Promise<MessageType[]> {
        try {
            return await this.messagesModel.findByParam("user_id", this.user.id)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async create(payload: Omit<MessageType, "id" | "created_at" | "user_id">): Promise<MessageType> {
        try {
            const allowedKeys: (keyof typeof payload)[] = ["content", "room_id"]
            allowedKeys.forEach((key) => {
                if (payload[key] === undefined || payload[key] === null) throw new Error(`Message Create missing key ${key}`)
                if (typeof payload[key] !== "string") throw new Error(`Message Create key ${key} is incorrect type`)
            })
            Object.keys(payload).forEach((key) => {
                if (!allowedKeys.includes(key as typeof allowedKeys[number])) throw new Error(`Message Create key ${key} not allowed`)
            })

            return await this.messagesModel.create({...payload, user_id: this.user.id})
        } catch (err) {
            console.log(err)
            throw err
        }
    }


}

export default MessagesController