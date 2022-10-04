import {Command} from "./command";
import {CommandHandler} from "./commandHandler";
import {Id} from "../valueObjects/id";
import {NewInternalErrorCommand} from "../response/baseResponse";

export type NewCommandBusCommand = {
    id: Id
    handler: CommandHandler<any>
}

export class CommandBus {
    // @ts-ignore
    private handlers: Map<string, CommandHandler<any>>

    constructor(handlers: NewCommandBusCommand[]) {
        if (handlers.length === 0) {
            throw new Error("Handlers can´t be undefined")
        }

        this.handlers = new Map<string, CommandHandler<any>>()

        handlers.forEach((handler) => {
            this.handlers.set(handler.id.String(), handler.handler)
        })
    }

    Handle(commands: Command<any>[]): void {
        commands.forEach((command) => {
            const handler = this.handlers.get(command.Id().String())
            if (handler === undefined) {
                const idError: NewInternalErrorCommand = {
                    ResponseCode: 0,
                    ResponsePkg: "",
                    ResponseVars: [],
                    StatusCode: 1,
                    ResponseText: `there is not command handler linked to command id ${command.Id().String()}.`,
                }
                command.ResponseHandler().SaveResponse(idError)
                return
            }

            handler.Handle(command)
        })
        return
    }
}