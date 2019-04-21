import { IUpdatableEntity } from "./IBaseEntity";
import IUserIdentity from "./IUserIdentity";
import IUserProfile from "./IUserProfile";

interface IDomaiUser extends IUpdatableEntity {
    Identity: IUserIdentity,
    Profile: IUserProfile
}

export default IDomaiUser;