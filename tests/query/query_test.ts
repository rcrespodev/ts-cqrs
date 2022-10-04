import {expect, jest, test} from '@jest/globals';
import {
    ResponseCode,
    ResponsePkg,
    ResponseVars,
    NewResponseCommand,
    StatusCode, ResponseText,
} from "../../src/response/response";
import {NewBadRequestCommand, NewInternalErrorCommand, NewSuccessCommand} from "../../src/response/baseResponse";
import {QueryTestCases} from "./queryTestCases";
import {Query} from "../../src/query/query";
import {BaseQuery} from "../../src/query/baseQuery";

type MockData = {
    field1: string
    field2: number
}

type args = {
    commandId: string,
    commandUuid: string,
    payload: any,
    responseCommands: NewResponseCommand[],
    data: MockData
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
    }
    data: MockData
}

export type test = {
    name: string,
    args: args,
    want: want,
}

const tests = QueryTestCases()

describe("Query Tests", () => {
    test.each(tests)("%s", ({name, args, want}) => {
        console.log(name)
        let query: Query<typeof args.payload, typeof args.data>
        try {
            query = new BaseQuery(args.commandId, args.commandUuid, args.payload)
        } catch (e) {
            expect(want.error.wantError).toEqual(true)
            // @ts-ignore
            expect(want.error.error.message).toEqual(e.message)
            return
        }

        expect(want.error.wantError).toEqual(false)


        // check fields.
        expect(query.Uuid().String()).toEqual(want.commandUuid)
        expect(query.Id().String()).toEqual(want.commandId)
        expect(query.Payload().Payload()).toEqual(want.payload)

        // check message of query.
        if (args.responseCommands === undefined) {
            return
        }
        query = logMessages(query, args.responseCommands)
        expect(query.ResponseHandler().Response()).toEqual((want.response))
    })
})

function logMessages(query: Query<any, any>, responseCommands: NewResponseCommand[]): Query<any, any> {
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
                query.ResponseHandler().SaveResponse(success)
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
                query.ResponseHandler().SaveResponse(internalError)
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
                query.ResponseHandler().SaveResponse(badRequest)
                break
            }
        }
    }
    return query
}