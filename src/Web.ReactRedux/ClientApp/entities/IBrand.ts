import { IUpdatableEntity } from "./IBaseEntity";

interface IBrand extends IUpdatableEntity {
    Name: string,
    ImagePath: string
}

export default IBrand;