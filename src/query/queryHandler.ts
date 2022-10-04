import {Query} from "./query";

export interface QueryHandler<PayloadType, DataType> {
    Handle(query: Query<PayloadType, DataType>): void
}