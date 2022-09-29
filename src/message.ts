export interface NewMessageCommand {
    StatusCode: StatusCode,
    MessageCode: MessageCode,
    MessagePkg: MessagePkg,
    MessageVars: MessageVars,
}

export interface Message {
    StatusCode(): StatusCode,

    MessageCode(): MessageCode,

    MessagePkg(): MessagePkg,

    MessageVars(): MessageVars,
}

export type StatusCode = 0 | 1 | 2 // 0=success, 1=internal_error, 2=bad_request
export type MessageCode = number
export type MessagePkg = string
export type MessageVars = string[]

type NewBaseCommand = {
    MessageCode: MessageCode,
    MessagePkg: MessagePkg,
    MessageVars: MessageVars,
}

export type NewSuccessCommand = NewBaseCommand & {
    StatusCode: 0,
}

export type NewInternalErrorCommand = NewBaseCommand & {
    StatusCode: 1,
}

export type NewBadRequestCommand = NewBaseCommand & {
    StatusCode: 2,
}

export class BaseMessage implements Message {
    private readonly _StatusCode: StatusCode
    private readonly _MessageCode: MessageCode
    private readonly _MessagePkg: MessagePkg
    private readonly _MessageVars: MessageVars

    constructor(command: NewMessageCommand) {
        this._StatusCode = command.StatusCode
        this._MessageCode = command.MessageCode
        this._MessagePkg = command.MessagePkg
        this._MessageVars = command.MessageVars
    }

    MessageCode(): MessageCode {
        return this._MessageCode;
    }

    MessagePkg(): MessagePkg {
        return this._MessagePkg;
    }

    MessageVars(): MessageVars {
        return this._MessageVars;
    }

    StatusCode(): StatusCode {
        return this._StatusCode;
    }

}