import {test, wantQuery} from "./queryBus_test";
import {Query} from "../../src/query/query";
import {BaseQuery} from "../../src/query/baseQuery";

export function QueryBusTestCases(): test[] {
    return [
        {
            name: "Base test. One query don´t have linked handler",
            args: {
                queries: new Map<string, Query<any, any>>(
                    [
                        [
                            "123e4567-e89b-12d3-a456-426614174000",
                            new BaseQuery("get_user", "123e4567-e89b-12d3-a456-426614174000", {user: "user_id"})
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174001",
                            new BaseQuery("get_customer", "123e4567-e89b-12d3-a456-426614174001", {userName: "user_name"})
                        ],
                        [
                            "20354d7a-e4fe-47af-8ff6-187bca92f3f1",
                            new BaseQuery("invalid_id", "20354d7a-e4fe-47af-8ff6-187bca92f3f1", {user: "user_id"})
                        ],
                    ]
                )
            },
            want: {
                queries: new Map<string, wantQuery>(
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
                                data: undefined
                            },
                        ],
                        [
                            "123e4567-e89b-12d3-a456-426614174001",
                            {
                                response: {
                                    _ResponseCode: 1,
                                    _ResponsePkg: "customer",
                                    _ResponseText: "",
                                    _ResponseVars: [],
                                    _StatusCode: 0
                                },
                                data: undefined
                            },
                        ],
                        [
                            "20354d7a-e4fe-47af-8ff6-187bca92f3f1",
                            {
                                response: {
                                    _ResponseCode: 0,
                                    _ResponsePkg: "",
                                    _ResponseText: "there is not query handler linked to command id invalid_id.",
                                    _ResponseVars: [],
                                    _StatusCode: 1
                                },
                                data: undefined
                            },
                        ],
                    ]
                ),
            }
        },
    ]
}