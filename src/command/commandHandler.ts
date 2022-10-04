import {Command} from "./command";

export interface CommandHandler<T> {
    Handle(command: Command<T>): void
}