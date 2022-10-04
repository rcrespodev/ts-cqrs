import {test} from "./query_test";

export function QueryTestCases(): test[] {
    return [
        {
            name: "queryId null",
            args: {
                commandId: "",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: true,
                    error: new Error("Id cannot be undefined or initial"),
                },
                response: undefined,
                payload: undefined,
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "queryUuid undefined",
            args: {
                commandId: "test_id",
                commandUuid: "",
                responseCommands: [],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "",
                error: {
                    wantError: true,
                    error: new Error("Uuid cannot be undefined or initial"),
                },
                response: undefined,
                payload: undefined,
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "queryUuid don´t have uuidv4 format.",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426",
                responseCommands: [],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426",
                error: {
                    wantError: true,
                    error: new Error("Uuid must have UUID@v4 format."),
                },
                response: undefined,
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "undefined payload",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [],
                payload: undefined,
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: true,
                    error: new Error("Payload can´t be undefined"),
                },
                response: undefined,
                payload: undefined,
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "correct args with single success message",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [
                    {
                        StatusCode: 0,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                ],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                response: {
                    _StatusCode: 0,
                    _ResponseCode: 0,
                    _ResponsePkg: "testPkg",
                    _ResponseVars: ["var1", "var2"],
                    _ResponseText: "",
                },
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "correct args with single internal error message",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [
                    {
                        StatusCode: 1,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                ],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                response: {
                    _StatusCode: 1,
                    _ResponseCode: 0,
                    _ResponsePkg: "testPkg",
                    _ResponseVars: ["var1", "var2"],
                    _ResponseText: "",
                },
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "correct args with single bad request message",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [
                    {
                        StatusCode: 2,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                ],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                response: {
                    _StatusCode: 2,
                    _ResponseCode: 0,
                    _ResponsePkg: "testPkg",
                    _ResponseVars: ["var1", "var2"],
                    _ResponseText: "",
                },
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "correct args with two messages: bad request, success, internalError",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [
                    {
                        StatusCode: 2,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                    {
                        StatusCode: 0,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                    {
                        StatusCode: 1,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                ],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                response: {
                    _StatusCode: 1,
                    _ResponseCode: 0,
                    _ResponsePkg: "testPkg",
                    _ResponseVars: ["var1", "var2"],
                    _ResponseText: "",
                },
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "correct args with two messages: success, internalError, bad request",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [
                    {
                        StatusCode: 0,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                    {
                        StatusCode: 1,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                    {
                        StatusCode: 2,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                ],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                response: {
                    _StatusCode: 1,
                    _ResponseCode: 0,
                    _ResponsePkg: "testPkg",
                    _ResponseVars: ["var1", "var2"],
                    _ResponseText: "",
                },
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "correct args with two messages: internalError, bad request, success",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [
                    {
                        StatusCode: 1,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                    {
                        StatusCode: 2,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                    {
                        StatusCode: 0,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                ],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                response: {
                    _StatusCode: 1,
                    _ResponseCode: 0,
                    _ResponsePkg: "testPkg",
                    _ResponseVars: ["var1", "var2"],
                    _ResponseText: "",
                },
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
        },
        {
            name: "check the type assertion in payload type.",
            args: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                responseCommands: [
                    {
                        StatusCode: 1,
                        ResponseCode: 0,
                        ResponsePkg: "testPkg",
                        ResponseVars: ["var1", "var2"],
                        ResponseText: "",
                    },
                ],
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
            want: {
                commandId: "test_id",
                commandUuid: "123e4567-e89b-12d3-a456-426614174000",
                error: {
                    wantError: false,
                    error: undefined,
                },
                response: {
                    _StatusCode: 1,
                    _ResponseCode: 0,
                    _ResponsePkg: "testPkg",
                    _ResponseVars: ["var1", "var2"],
                    _ResponseText: "",
                },
                payload: {},
                data: {
                    field1: "test data", field2: 0
                }
            },
        }
    ]
}