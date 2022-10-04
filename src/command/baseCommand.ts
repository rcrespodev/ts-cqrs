import {Command} from "./command";
import {Id} from "../valueObjects/id";
import {Uuid} from "../valueObjects/uuid";
import {Payload} from "../valueObjects/payload";
import {Message} from "../message/message";
import {BaseMessage} from "../message/baseMessage";
import {ResponseHandler} from "../response/baseResponse";

export class BaseCommand<PayloadType extends any> implements Command<PayloadType> {
    private _message: Message<PayloadType>
    private readonly _responseHandler: ResponseHandler

    constructor(id: string, uuid: string, payload: PayloadType) {
        // @ts-ignore
        this._message = new BaseMessage({id: id, uuid: uuid}, payload)
        this._responseHandler = new ResponseHandler()
    }

    ResponseHandler(): ResponseHandler {
        return this._responseHandler
    }

    Id(): Id {
        return this._message.Id()
    }

    Payload(): Payload<PayloadType> {
        return this._message.Payload()
    }

    Uuid(): Uuid {
        return this._message.Uuid()
    }
}