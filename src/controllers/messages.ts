import {MessageType} from "../types/messages";
import MessagesModel from "../models/messages";
import {UserGetType} from "../types/users";

interface MessagesControllerProps {
    user: Omit<UserGetType, "password">
}

class MessagesController {
    private messagesModel: MessagesModel = new MessagesModel()
    private user: Pick<UserGetType, "id" | "name" | "email">;

    constructor(props: { user: Omit<UserGetType, "password"> }) {
        this.user = props.user

    }

    async findByParam(): Promise<MessageType> {
        try {
            const res: MessageType = await this.messagesModel.findByParam("user_id", this.user.id)
            return res
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

export default MessagesController