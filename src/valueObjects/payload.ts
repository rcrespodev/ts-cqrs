export class Payload<T> {
    private readonly _payload: T

    constructor(payload: T) {
        if (payload === undefined) {
            throw new Error("Payload can´t be undefined")
        }
        this._payload = payload
    }

    Payload(): T {
        return this._payload
    }
}