export interface Response {

    StatusCode(): StatusCode

    ResponseCode(): ResponseCode,

    ResponsePkg(): ResponsePkg,

    ResponseVars(): ResponseVars,

    ResponseText(): ResponseText,
}

export type StatusCode = 0 | 1 | 2 // 0=success, 1=internal_error, 2=bad_request
export type ResponseCode = number
export type ResponsePkg = string
export type ResponseVars = string[]
export type ResponseText = string

export type NewResponseCommand = {
    StatusCode: StatusCode,
    ResponseCode: ResponseCode,
    ResponsePkg: ResponsePkg,
    ResponseVars: ResponseVars,
    ResponseText: ResponseText,
}