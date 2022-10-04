import {Message} from "./message";
import {Id} from "../valueObjects/id";
import {Payload} from "../valueObjects/payload";
import {Uuid} from "../valueObjects/uuid";

export type NewMessageCommand = {
    id: string
    uuid: string
}

export class BaseMessage<PayloadType extends any> implements Message<PayloadType> {
    private readonly _id: Id
    private readonly _uuid: Uuid
    private readonly _payload: Payload<PayloadType>

    constructor(command: NewMessageCommand, payload: PayloadType) {
        this._id = new Id(command.id)
        this._uuid = new Uuid(command.uuid)
        this._payload = new Payload<PayloadType>(payload)
    }

    Id(): Id {
        return this._id;
    }

    Payload(): Payload<PayloadType> {
        return this._payload;
    }

    Uuid(): Uuid {
        return this._uuid;
    }

}