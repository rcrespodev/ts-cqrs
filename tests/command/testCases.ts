import {test} from "./command_test";

export function CommandTestCases(): test[] {
    return [
        {
            name: "commandId null",
            args: {
                commandId: "",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [],
                payload: {},
            },
            want: {
                commandId: "",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: true,
                    error: new Error("CommandId cannot be undefined or initial"),
                },
                message: undefined,
                payload: undefined,
                checkPayloadType: false,
            },
        },
        {
            name: "commandUuid undefined",
            args: {
                commandId: "test_id",
                commandUuid: "",
                messagesCommands: [],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "",
                error: {
                    wantError: true,
                    error: new Error("CommandUuid cannot be undefined or initial"),
                },
                message: undefined,
                payload: undefined,
                checkPayloadType: false,
            },
        },
        {
            name: "commandUuid don´t have uuidv4 format.",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426",
                messagesCommands: [],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426",
                error: {
                    wantError: true,
                    error: new Error("CommandUuid must have UUID@v4 format."),
                },
                message: undefined,
                payload: {},
                checkPayloadType: false,
            },
        },
        {
            name: "undefined payload",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [],
                payload: undefined,
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: true,
                    error: new Error("Payload can´t be undefined"),
                },
                message: undefined,
                payload: undefined,
                checkPayloadType: false,
            },
        },
        {
            name: "correct args with single success message",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [
                    {
                        StatusCode: 0,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                ],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                message: {
                    _StatusCode: 0,
                    _MessageCode: 0,
                    _MessagePkg: "testPkg",
                    _MessageVars: ["var1", "var2"],
                },
                payload: {},
                checkPayloadType: false,
            },
        },
        {
            name: "correct args with single internal error message",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [
                    {
                        StatusCode: 1,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                ],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                message: {
                    _StatusCode: 1,
                    _MessageCode: 0,
                    _MessagePkg: "testPkg",
                    _MessageVars: ["var1", "var2"],
                },
                payload: {},
                checkPayloadType: false,
            },
        },
        {
            name: "correct args with single bad request message",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [
                    {
                        StatusCode: 2,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                ],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                message: {
                    _StatusCode: 2,
                    _MessageCode: 0,
                    _MessagePkg: "testPkg",
                    _MessageVars: ["var1", "var2"],
                },
                payload: {},
                checkPayloadType: false,
            },
        },
        {
            name: "correct args with two messages: bad request, success, internalError",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [
                    {
                        StatusCode: 2,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                    {
                        StatusCode: 0,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                    {
                        StatusCode: 1,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                ],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                message: {
                    _StatusCode: 1,
                    _MessageCode: 0,
                    _MessagePkg: "testPkg",
                    _MessageVars: ["var1", "var2"],
                },
                payload: {},
                checkPayloadType: false,
            },
        },
        {
            name: "correct args with two messages: success, internalError, bad request",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [
                    {
                        StatusCode: 0,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                    {
                        StatusCode: 1,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                    {
                        StatusCode: 2,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                ],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                message: {
                    _StatusCode: 1,
                    _MessageCode: 0,
                    _MessagePkg: "testPkg",
                    _MessageVars: ["var1", "var2"],
                },
                payload: {},
                checkPayloadType: false,
            },
        },
        {
            name: "correct args with two messages: internalError, bad request, success",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [
                    {
                        StatusCode: 1,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                    {
                        StatusCode: 2,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                    {
                        StatusCode: 0,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                ],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                message: {
                    _StatusCode: 1,
                    _MessageCode: 0,
                    _MessagePkg: "testPkg",
                    _MessageVars: ["var1", "var2"],
                },
                payload: {},
                checkPayloadType: false,
            },
        },
        {
            name: "check the type assertion in payload type.",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                messagesCommands: [
                    {
                        StatusCode: 1,
                        MessageCode: 0,
                        MessagePkg: "testPkg",
                        MessageVars: ["var1", "var2"],
                    },
                ],
                payload: {},
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                message: {
                    _StatusCode: 1,
                    _MessageCode: 0,
                    _MessagePkg: "testPkg",
                    _MessageVars: ["var1", "var2"],
                },
                payload: {},
                checkPayloadType: true,
            },
        }
    ]
}