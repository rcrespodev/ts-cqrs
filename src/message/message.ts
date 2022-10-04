import {Id} from "../valueObjects/id";
import {Uuid} from "../valueObjects/uuid";
import {Payload} from "../valueObjects/payload";

// Message represents the minimum expression of data transferred between buses and handlers.
// Also, Command, Query and Event are composed with Message interface.
// Message.Uuid(): Each Message occurred in the application needs to be unique. You can use any string as key, but
//  the recommendation is an uuid type.

// Message.Id(): Id is to identify what is the kind of Message. For example:
//      CommandId´s: 'register_user', 'update_user', 'delete_user', etc.
//      EventId´s: 'user_registered', 'user_updated', 'user_deleted', etc.
//      QueryId´s: 'find_user_by_id', 'find_user_by_email', etc.
//  The messageId are used to link the command/event/query to the handlers in the bus.

// Message.Payload(): Can be understood as DTO to transport the data between different actors.
//  In case of commands, payload is the user requests/args.
//  In case of query's, payload is the user parameters.
//  In case of events, payload is the information that publisher chooses exposed to consumers.

export interface Message<PayloadType> {
    Id(): Id,

    Uuid(): Uuid,

    Payload(): Payload<PayloadType>,
}