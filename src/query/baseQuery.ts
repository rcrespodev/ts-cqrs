import {Query} from "./query";
import {Message} from "../message/message";
import {BaseMessage} from "../message/baseMessage";
import {ResponseHandler} from "../response/baseResponse";
import {Payload} from "../valueObjects/payload";
import {Uuid} from "../valueObjects/uuid";
import {Id} from "../valueObjects/id";

export class BaseQuery<PayloadType, DataType> implements Query<PayloadType, DataType> {
    private _data: DataType | undefined
    private _message: Message<PayloadType>
    private readonly _responseHandler: ResponseHandler

    constructor(id: string, uuid: string, payload: PayloadType) {
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

    Data(): DataType {
        return <DataType>this._data;
    }

    SaveData(data: DataType): void {
        this._data = data
    }
}