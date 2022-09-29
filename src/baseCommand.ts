import {Command, CommandId, CommandUuid, Payload} from "./command";
import {validate} from 'uuid';
import {BaseMessage, Message, NewMessageCommand} from "./message";

export class BaseCommand implements Command {
    private readonly _id: CommandId
    private readonly _uuid: CommandUuid
    private readonly _payload: Payload
    private _message: Message | undefined

    constructor(id: CommandId, uuid: CommandUuid, payload: Payload) {
        this.checkNulls(id, "CommandId")
        this.checkNulls(uuid, "CommandUuid")
        this.checkNulls(payload, "Payload")
        if (!validate(uuid)) {
            throw new Error("CommandUuid must have UUID@v4 format.")
        }
        this._id = id
        this._uuid = uuid
        this._payload = payload
    }

    Message(): Message | undefined {
        return this._message
    }

    // LogMessage() only store the target message if this._message is undefined or
    // if target message is most important in the order or priorities.
    // The priority of messages are the follow:
    // Internal Error: StatusCode=1 --> Is the most important type of message. He overwrites any existing message.
    // Bad request: StatusCode=2 --> This only overwrites success messages.
    // Success: StatusCode=0 --> The less important. Can be overwritten by internalError or badRequest.
    LogMessage(messageCommand: NewMessageCommand): void {
        if (this._message === undefined) {
            this._message = new BaseMessage(messageCommand)
            return
        }

        const newMessage = new BaseMessage(messageCommand)
        if (this.checkPriority(this._message, newMessage)) {
            this._message = new BaseMessage(messageCommand)
        }
        return
    }

    Id(): CommandId {
        return this._id
    }

    Payload(): Payload {
        return this._payload
    }

    Uuid(): CommandUuid {
        return this._payload
    }

    checkNulls<T = CommandUuid | CommandId | Payload>(t: T, message: string): void {
        switch (typeof t) {
            case "string" : {
                if (t === "") {
                    throw new Error(`${message} cannot be undefined or initial`)
                }
                break
            }
            default : {
                if (t === undefined) {
                    throw new Error(`${message} can´t be undefined`)
                }
                break
            }
        }
    }

    private checkPriority(actualMessage: Message, targetMessage: Message): boolean {
        const priorities = [1, 2, 0] // array sorted by most important to less important.
        let actualStatusCode = priorities.indexOf(actualMessage.StatusCode())
        let targetStatusCode = priorities.indexOf(targetMessage.StatusCode())
        return targetStatusCode < actualStatusCode;
    }
}