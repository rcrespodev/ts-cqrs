import {test, wantCommand} from "./commandBus_test";
import {BaseCommand} from "../../src/command/baseCommand";
import {Command} from "../../src/command/command";

export function CommandBusTestCases(): test[] {
    return [
        {
            name: "correct request. All command has linked handler and payloads are ok",
            args: {
                commands: new Map<string, Command<any>>(
                    [
                        [
                            "123e4567-e89b-12d3-a456-426614174000",
                            new BaseCommand("new_user", "123e4567-e89b-12d3-a456-426614174000", {newUser: true})
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174001",
                            new BaseCommand("delete_user", "123e4567-e89b-12d3-a456-426614174001", {deleteUser: true})
                        ],
                        [
                            "20354d7a-e4fe-47af-8ff6-187bca92f3f1",
                            new BaseCommand("new_user", "20354d7a-e4fe-47af-8ff6-187bca92f3f1", {newUser: true})
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174003",
                            new BaseCommand("update_user", "123e4567-e89b-12d3-a456-426614174003", {updateUser: true})
                        ],
                    ]
                )
            },
            want: {
                commands: new Map<string, wantCommand>(
                    [
                        [
                            "123e4567-e89b-12d3-a456-426614174000",
                            {
                                response: {
                                    _ResponseCode: 1,
                                    _ResponsePkg: "user",
                                    _ResponseText: "",
                                    _ResponseVars: [],
                                    _StatusCode: 0
                                },
                            },
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174001",
                            {
                                response: {
                                    _ResponseCode: 2,
                                    _ResponsePkg: "user",
                                    _ResponseText: "",
                                    _ResponseVars: [],
                                    _StatusCode: 0
                                },
                            },
                        ],
                        [
                            "20354d7a-e4fe-47af-8ff6-187bca92f3f1",
                            {
                                response: {
                                    _ResponseCode: 1,
                                    _ResponsePkg: "user",
                                    _ResponseText: "",
                                    _ResponseVars: [],
                                    _StatusCode: 2
                                },
                            },
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174003",
                            {
                                response: {
                                    _ResponseCode: 5,
                                    _ResponsePkg: "user",
                                    _ResponseText: "",
                                    _ResponseVars: [],
                                    _StatusCode: 0
                                },
                            },
                        ],
                    ]
                ),
            }
        },
        {
            name: "bad request. Command 123e4567-e89b-12d3-a456-426614174001 dont have command handler",
            args: {
                commands: new Map<string, Command<any>>(
                    [
                        [
                            "123e4567-e89b-12d3-a456-426614174000",
                            new BaseCommand("new_user", "123e4567-e89b-12d3-a456-426614174000", {newUser: true})
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174001",
                            new BaseCommand("user", "123e4567-e89b-12d3-a456-426614174001", {deleteUser: true})
                        ],
                        [
                            "20354d7a-e4fe-47af-8ff6-187bca92f3f1",
                            new BaseCommand("new_user", "20354d7a-e4fe-47af-8ff6-187bca92f3f1", {newUser: true})
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174003",
                            new BaseCommand("update_user", "123e4567-e89b-12d3-a456-426614174003", {updateUser: true})
                        ],
                    ]
                )
            },
            want: {
                commands: new Map<string, wantCommand>(
                    [
                        [
                            "123e4567-e89b-12d3-a456-426614174000",
                            {
                                response: {
                                    _ResponseCode: 1,
                                    _ResponsePkg: "user",
                                    _ResponseText: "",
                                    _ResponseVars: [],
                                    _StatusCode: 0
                                },
                            },
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174001",
                            {
                                response: {
                                    _ResponseCode: 0,
                                    _ResponsePkg: "",
                                    _ResponseText: "there is not command handler linked to command id user.",
                                    _ResponseVars: [],
                                    _StatusCode: 1
                                },
                            },
                        ],
                        [
                            "20354d7a-e4fe-47af-8ff6-187bca92f3f1",
                            {
                                response: {
                                    _ResponseCode: 1,
                                    _ResponsePkg: "user",
                                    _ResponseText: "",
                                    _ResponseVars: [],
                                    _StatusCode: 2
                                },
                            },
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174003",
                            {
                                response: {
                                    _ResponseCode: 5,
                                    _ResponsePkg: "user",
                                    _ResponseText: "",
                                    _ResponseVars: [],
                                    _StatusCode: 0
                                },
                            },
                        ],
                    ]
                ),
            }
        },
    ]
}