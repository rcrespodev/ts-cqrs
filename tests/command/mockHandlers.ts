import {CommandHandler} from "../../src/command/commandHandler";
import {Command} from "../../src/command/command";
import {ResponseCode, ResponsePkg, ResponseVars} from "../../src/response/response";
import {BaseCommand} from "../../src/command/baseCommand";

export type DeleteUserPayload = {
    deleteUser: boolean
}

export class MockHandlerDeleteUser implements CommandHandler<DeleteUserPayload>{
    Handle(command: Command<DeleteUserPayload>): void {
        console.log(command.Payload().Payload().deleteUser)
        command.ResponseHandler().SaveResponse({
            StatusCode: 0,
            ResponseCode: 2,
            ResponsePkg: "user",
            ResponseVars: [],
            ResponseText: "",
        })
        return
    }
}

export type NewUserPayload = {
    newUser: boolean
}

export class MockHandlerNewUser implements CommandHandler<NewUserPayload>{
    Handle(command: Command<NewUserPayload>): void {
        if (command.Uuid().String() === "20354d7a-e4fe-47af-8ff6-187bca92f3f1") {
            command.ResponseHandler().SaveResponse({
                StatusCode: 2,
                ResponseCode: 1,
                ResponsePkg: "user",
                ResponseVars: [],
                ResponseText: "",
            })
            return
        }

        command.ResponseHandler().SaveResponse({
            StatusCode: 0,
            ResponseCode: 1,
            ResponsePkg: "user",
            ResponseVars: [],
            ResponseText: "",
        })
        return
    }
}

export type UpdateUserPayload = {
    updateUser: boolean
}

export class MockHandlerUpdateUser<T extends UpdateUserPayload> implements CommandHandler<T>{
    Handle(command: Command<T>): void {
        console.log(command.Payload().Payload().updateUser)
        command.ResponseHandler().SaveResponse({
            StatusCode: 0,
            ResponseCode: 5,
            ResponsePkg: "user",
            ResponseVars: [],
            ResponseText: "",
        })
        return
    }
}