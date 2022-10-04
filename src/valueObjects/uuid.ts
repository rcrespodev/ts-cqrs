import {validate} from "uuid";

export class Uuid {
    private readonly _uuid: string

    constructor(uuid: string) {
        if (uuid === "") {
            throw new Error(`Uuid cannot be undefined or initial`)
        }

        if (!validate(uuid)) {
            throw new Error("Uuid must have UUID@v4 format.")
        }

        this._uuid = uuid
    }

    String(): string {
        return this._uuid
    }
}