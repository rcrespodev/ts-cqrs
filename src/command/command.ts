import {Message} from "../message/message";
import {ResponseHandler} from "../response/baseResponse";

export interface Command<PayloadType> extends Message<PayloadType> {
    ResponseHandler(): ResponseHandler
}