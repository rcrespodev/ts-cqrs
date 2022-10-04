import {
    NewResponseCommand,
    Response,
    ResponseCode,
    ResponsePkg,
    ResponseText,
    ResponseVars,
    StatusCode
} from "./response";

type NewBaseCommand = {
    ResponseCode: ResponseCode,
    ResponsePkg: ResponsePkg,
    ResponseVars: ResponseVars,
    ResponseText: ResponseText,
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

export class BaseResponse implements Response {
    private readonly _StatusCode: StatusCode
    private readonly _ResponseCode: ResponseCode
    private readonly _ResponsePkg: ResponsePkg
    private readonly _ResponseVars: ResponseVars
    private readonly _ResponseText: ResponseText

    constructor(command: NewResponseCommand) {
        this._StatusCode = command.StatusCode
        this._ResponseCode = command.ResponseCode
        this._ResponsePkg = command.ResponsePkg
        this._ResponseVars = command.ResponseVars
        this._ResponseText = command.ResponseText
    }

    ResponseText(): string {
        return this._ResponseText
    }

    ResponseCode(): ResponseCode {
        return this._ResponseCode;
    }

    ResponsePkg(): ResponsePkg {
        return this._ResponsePkg;
    }

    ResponseVars(): ResponseVars {
        return this._ResponseVars;
    }

    StatusCode(): StatusCode {
        return this._StatusCode;
    }
}

export class ResponseHandler {
    private _response: Response | undefined

    constructor() {
        this._response = undefined
    }

    // SaveResponse() only store the target response if this._response is undefined or
    // if target response is most important in the order or priorities.
    // The priority of responses are the follow:
    // Internal Error: StatusCode=1 --> Is the most important type of response. He overwrites any existing response.
    // Bad request: StatusCode=2 --> This only overwrites success response.
    // Success: StatusCode=0 --> The less important. Can be overwritten by internalError or badRequest.
    SaveResponse(command: NewResponseCommand) {
        const newResponse = new BaseResponse(command)
        if (this._response === undefined) {
            this._response = newResponse
            return
        }

        if (this.checkPriority(this._response.StatusCode(), newResponse.StatusCode())) {
            this._response = newResponse
        }
        return
    }

    Response(): Response | undefined {
        return this._response
    }

    private checkPriority(actualStatus: StatusCode, targetStatus: StatusCode): boolean {
        const priorities = [1, 2, 0] // array sorted by most important to less important.
        let actualStatusCode = priorities.indexOf(actualStatus)
        let targetStatusCode = priorities.indexOf(targetStatus)
        return targetStatusCode < actualStatusCode;
    }
}