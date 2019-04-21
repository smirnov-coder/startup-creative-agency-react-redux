import { IBaseEntity } from "./IBaseEntity";
import ISocialLink from "./ISocialLink";

interface IUserProfile extends IBaseEntity {
    FirstName: string,
    LastName: string,
    PhotoFilePath: string,
    JobPosition: string,
    IsReadyForDisplay: boolean,
    DisplayAsTeamMember: boolean,
    SocialLinks: ISocialLink[]
}

export default IUserProfile;