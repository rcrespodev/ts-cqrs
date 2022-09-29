import {Message, NewMessageCommand} from "./message";

export interface Command {
    LogMessage(messageCommand: NewMessageCommand): void,

    Id(): CommandId,

    Uuid(): CommandUuid,

    Payload(): Payload,

    Message(): Message | undefined,
}

export type CommandId = string
export type CommandUuid = string
export type Payload = any