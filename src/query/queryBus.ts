import {Id} from "../valueObjects/id";
import {CommandHandler} from "../command/commandHandler";
import {Command} from "../command/command";
import {NewInternalErrorCommand} from "../response/baseResponse";
import {QueryHandler} from "./queryHandler";
import {Query} from "./query";

export type NewQueryBusCommand = {
    id: Id
    handler: QueryHandler<any, any>
}

export class QueryBus {
    // @ts-ignore
    private handlers: Map<string, QueryHandler>

    constructor(handlers: NewQueryBusCommand[]) {
        if (handlers.length === 0) {
            throw new Error("Handlers can´t be undefined")
        }

        this.handlers = new Map<string, QueryHandler<any, any>>()

        handlers.forEach((handler) => {
            this.handlers.set(handler.id.String(), handler.handler)
        })
    }

    Handle(queries: Query<any, any>[]): void {
        queries.forEach((query) => {
            const handler = this.handlers.get(query.Id().String())
            if (handler === undefined) {
                const idError: NewInternalErrorCommand = {
                    ResponseCode: 0,
                    ResponsePkg: "",
                    ResponseVars: [],
                    StatusCode: 1,
                    ResponseText: `there is not query handler linked to command id ${query.Id().String()}.`,
                }
                query.ResponseHandler().SaveResponse(idError)
                return
            }
            handler.Handle(query)
        })
        return
    }
}