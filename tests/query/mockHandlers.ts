import {QueryHandler} from "../../src/query/queryHandler";
import {Query} from "../../src/query/query";
import {NewResponseCommand} from "../../src/response/response";

export type GetUserQuery = {
    user: string
}

export type GetUserData = {
    userName: string
}

export class MockHandlerGetUser<T extends GetUserQuery, U extends GetUserData> implements QueryHandler<T, U>{
    Handle(query: Query<T, U>): void {
        const response: NewResponseCommand = {
            StatusCode: 0,
            ResponseCode: 1,
            ResponsePkg: "user",
            ResponseVars: [],
            ResponseText: "",
        }
        query.ResponseHandler().SaveResponse(response)
    }
}

export type GetCustomerQuery = {
    user: string
}

export type GetCustomerData = {
    userName: string
}

export class MockHandlerGetCustomer<T extends GetCustomerQuery, U extends GetCustomerData> implements QueryHandler<T, U>{
    Handle(query: Query<T, U>): void {
        const response: NewResponseCommand = {
            StatusCode: 0,
            ResponseCode: 1,
            ResponsePkg: "customer",
            ResponseVars: [],
            ResponseText: "",
        }
        query.ResponseHandler().SaveResponse(response)
    }
}