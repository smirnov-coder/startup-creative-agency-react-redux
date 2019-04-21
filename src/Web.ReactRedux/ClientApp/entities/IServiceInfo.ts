import { IUpdatableEntity } from "./IBaseEntity";

interface IServiceInfo extends IUpdatableEntity {
    Caption: string,
    Description: string,
    IconClass: string
}

export default IServiceInfo;