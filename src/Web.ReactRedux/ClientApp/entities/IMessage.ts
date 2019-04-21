import { IBaseEntity } from "./IBaseEntity";

interface IMessage extends IBaseEntity {
    Name: string,
    Email: string,
    Subject: string,
    Company: string,
    Text: string,
    IPAddress: string,
    IsRead: boolean
}

export default IMessage;