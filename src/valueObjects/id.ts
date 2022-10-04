export class Id {
    private readonly _id: string

    constructor(id: string) {
        if (id === "") {
            throw new Error(`Id cannot be undefined or initial`)
        }

        this._id = id
    }

    String(): string {
        return this._id
    }
}