import {Message} from "../message/message";
import {ResponseHandler} from "../response/baseResponse";

export interface Query<PayloadType, DataType> extends Message<PayloadType> {
    ResponseHandler(): ResponseHandler

    SaveData(data: DataType): void

    Data(): DataType
}