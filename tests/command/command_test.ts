import {
    NewResponseCommand,
    ResponseCode,
    ResponsePkg,
    ResponseText,
    ResponseVars,
    StatusCode
} from "../../src/response/response";
import {CommandTestCases} from "./commandTestCases";
import {Command} from "../../src/command/command";
import {BaseCommand} from "../../src/command/baseCommand";
import {expect} from "@jest/globals";
import {NewBadRequestCommand, NewInternalErrorCommand, NewSuccessCommand} from "../../src/response/baseResponse";

type args = {
    commandId: string,
    commandUuid: string,
    payload: any,
    responseCommands: NewResponseCommand[],
}

type want = {
    commandId: string,
    commandUuid: string,
    payload: any,
    response: undefined | {
        _StatusCode: StatusCode, // 0=success, 1=internal_error, 2=bad_request
        _ResponseCode: ResponseCode,
        _ResponsePkg: ResponsePkg,
        _ResponseVars: ResponseVars,
        _ResponseText: ResponseText,
    },
    error: {
        wantError: boolean,
        error: Error | undefined,
    },
}

export type test = {
    name: string,
    args: args,
    want: want,
}

const tests = CommandTestCases()

describe("Command Tests", () => {
    test.each(tests)("%s", ({name, args, want}) => {
        console.log(name)
        let command: Command<typeof args.payload>
        try {
            command = new BaseCommand(args.commandId, args.commandUuid, args.payload)
        } catch (e) {
            expect(want.error.wantError).toEqual(true)
            // @ts-ignore
            expect(want.error.error.message).toEqual(e.message)
            return
        }

        expect(want.error.wantError).toEqual(false)


        // check fields.
        expect(command.Uuid().String()).toEqual(want.commandUuid)
        expect(command.Id().String()).toEqual(want.commandId)
        expect(command.Payload().Payload()).toEqual(want.payload)

        // check message of command.
        if (args.responseCommands === undefined) {
            return
        }
        command = logMessages(command, args.responseCommands)
        expect(command.ResponseHandler().Response()).toEqual((want.response))
    })
})

function logMessages(command: Command<any>, responseCommands: NewResponseCommand[]): Command<any> {
    for (const m of responseCommands) {
        switch (m.StatusCode) {
            case 0: {
                const success: NewSuccessCommand = {
                    ResponseCode: m.ResponseCode,
                    ResponsePkg: m.ResponsePkg,
                    ResponseVars: m.ResponseVars,
                    StatusCode: 0,
                    ResponseText: "",
                }
                command.ResponseHandler().SaveResponse(success)
                break
            }
            case 1: {
                const internalError: NewInternalErrorCommand = {
                    ResponseCode: m.ResponseCode,
                    ResponsePkg: m.ResponsePkg,
                    ResponseVars: m.ResponseVars,
                    StatusCode: 1,
                    ResponseText: "",
                }
                command.ResponseHandler().SaveResponse(internalError)
                break
            }
            case 2: {
                const badRequest: NewBadRequestCommand = {
                    ResponseCode: m.ResponseCode,
                    ResponsePkg: m.ResponsePkg,
                    ResponseVars: m.ResponseVars,
                    StatusCode: 2,
                    ResponseText: "",
                }
                command.ResponseHandler().SaveResponse(badRequest)
                break
            }
        }
    }
    return command
}