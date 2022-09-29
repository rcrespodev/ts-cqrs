import {expect, jest, test} from '@jest/globals';
import {Command, CommandId, CommandUuid, Payload} from "../../src/command"
import {
    MessageCode,
    MessagePkg,
    MessageVars, NewBadRequestCommand,
    NewInternalErrorCommand,
    NewMessageCommand,
    NewSuccessCommand,
    StatusCode
} from "../../src/message";
import {BaseCommand} from "../../src/baseCommand";
import {CommandTestCases} from "./testCases";

type args = {
    commandId: CommandId,
    commandUuid: CommandUuid,
    payload: Payload,
    messagesCommands: NewMessageCommand[],
}

type want = {
    commandId: string,
    commandUuid: string,
    payload: any,
    checkPayloadType: boolean,
    message: undefined | {
        _StatusCode: StatusCode, // 0=success, 1=internal_error, 2=bad_request
        _MessageCode: MessageCode,
        _MessagePkg: MessagePkg,
        _MessageVars: MessageVars,
    },
    error: {
        wantError: boolean,
        error: Error | undefined,
    }
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
        let command: Command
        try {
            command = new BaseCommand(args.commandId, args.commandUuid, args.payload)
        } catch (e) {
            expect(want.error.wantError).toEqual(true)
            // @ts-ignore
            expect(want.error.error.message).toEqual(e.message)
            return
        }

        expect(want.error.wantError).toEqual(false)


        // check message of command.
        if (args.messagesCommands === undefined) {
            return
        }
        command = logMessages(command, args.messagesCommands)
        expect(command.Message()).toEqual((want.message))
    })
})

function logMessages(command: Command, messages: NewMessageCommand[]): Command {
    for (const m of messages) {
        switch (m.StatusCode) {
            case 0: {
                const success: NewSuccessCommand = {
                    MessageCode: m.MessageCode,
                    MessagePkg: m.MessagePkg,
                    MessageVars: m.MessageVars,
                    StatusCode: 0
                }
                command.LogMessage(success)
                break
            }
            case 1: {
                const internalError: NewInternalErrorCommand = {
                    MessageCode: m.MessageCode,
                    MessagePkg: m.MessagePkg,
                    MessageVars: m.MessageVars,
                    StatusCode: 1
                }
                command.LogMessage(internalError)
                break
            }
            case 2: {
                const badRequest: NewBadRequestCommand = {
                    MessageCode: m.MessageCode,
                    MessagePkg: m.MessagePkg,
                    MessageVars: m.MessageVars,
                    StatusCode: 2
                }
                command.LogMessage(badRequest)
                break
            }
        }
    }
    return command
}