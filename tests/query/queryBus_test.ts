import {Query} from "../../src/query/query";
import {ResponseCode, ResponsePkg, ResponseText, ResponseVars, StatusCode} from "../../src/response/response";
import {QueryTestCases} from "./queryTestCases";
import {QueryBusTestCases} from "./queryBusTestCases";
import {QueryBus} from "../../src/query/queryBus";
import {MockHandlerGetCustomer, MockHandlerGetUser} from "./mockHandlers";
import {Id} from "../../src/valueObjects/id";

type args = {
    queries: Map<string, Query<any, any>>
}

type want = {
    queries: Map<string, wantQuery>
}

export type wantQuery = {
    response: {
        _StatusCode: StatusCode, // 0=success, 1=internal_error, 2=bad_request
        _ResponseCode: ResponseCode,
        _ResponsePkg: ResponsePkg,
        _ResponseVars: ResponseVars,
        _ResponseText: ResponseText,
    },
    data: any
}

export type test = {
    name: string,
    args: args,
    want: want,
}

const tests = QueryBusTestCases()

describe("Query Bus", () => {
    test.each(tests)("%s", ({name, args, want}) => {
        const queryBus = new QueryBus([
            {
                handler: new MockHandlerGetUser(), id: new Id("get_user"),
            },
            {
                handler: new MockHandlerGetCustomer(), id: new Id("get_customer"),
            },
        ])

        const queries: Query<any, any>[] = []
        args.queries.forEach((query) => {
            queries.push(query)
        })

        queryBus.Handle(queries)
        queries.forEach((gotQuery) => {
            const wantQuery = want.queries.get(gotQuery.Uuid().String())
            expect(wantQuery).toBeDefined()
            // @ts-ignore
            expect(gotQuery.ResponseHandler().Response()).toEqual(wantQuery.response)
            // @ts-ignore
            expect(gotQuery.Data()).toEqual(wantQuery.data)
        })
    })
})