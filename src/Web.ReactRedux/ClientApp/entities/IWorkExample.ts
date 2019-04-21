import { IUpdatableEntity } from "./IBaseEntity";

interface IWorkExample extends IUpdatableEntity {
    Name: string,
    Category: string,
    Description: string,
    ImagePath: string
}

export default IWorkExample;