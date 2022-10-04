import {CommandBus, NewCommandBusCommand} from "../../src/command/commandBus";
import {Command} from "../../src/command/command";
import {ResponseCode, ResponsePkg, ResponseText, ResponseVars, StatusCode} from "../../src/response/response";
import {CommandBusTestCases} from "./commandBusTestCases";
import {Id} from "../../src/valueObjects/id";
import {MockHandlerDeleteUser, MockHandlerNewUser, MockHandlerUpdateUser, UpdateUserPayload} from "./mockHandlers";
import {expect} from "@jest/globals";
import {BaseCommand} from "../../src/command/baseCommand";

type args = {
    commands: Map<string, Command<any>>
}

type want = {
    commands: Map<string, wantCommand>
}

export type wantCommand = {
    // response: string
    response: {
        _StatusCode: StatusCode, // 0=success, 1=internal_error, 2=bad_request
        _ResponseCode: ResponseCode,
        _ResponsePkg: ResponsePkg,
        _ResponseVars: ResponseVars,
        _ResponseText: ResponseText,
    },
}

export type test = {
    name: string,
    args: args,
    want: want,
}

const tests = CommandBusTestCases()

describe("Command Bus", () => {
    test.each(tests)("%s", ({name, args, want}) => {
        const commandBus = new CommandBus([
            {
                handler: new MockHandlerNewUser(), id: new Id("new_user"),
            },
            {
                handler: new MockHandlerDeleteUser(), id: new Id("delete_user"),
            },
            {
                handler: new MockHandlerUpdateUser(), id: new Id("update_user"),
            }
        ])

        const commands: Command<any>[] = []
        args.commands.forEach((command) => {
            commands.push(command)
        })

        commandBus.Handle(commands)
        commands.forEach((gotCommand) => {
            const wantCommand = want.commands.get(gotCommand.Uuid().String())
            expect(wantCommand).toBeDefined()
            // @ts-ignore
            expect(gotCommand.ResponseHandler().Response()).toEqual(wantCommand.response)
        })
    })
})

// test("just test type assertion of payload", () => {
//     const command = new BaseCommand<UpdateUserPayload>("update_user", "123e4567-e89b-12d3-a456-426614174003", {User: true})
//     const commandBus = new CommandBus([
//         {
//             handler: new MockHandlerUpdateUser(), id: new Id("update_user"),
//         }
//     ])
//
//     commandBus.Handle([command])
//
// })