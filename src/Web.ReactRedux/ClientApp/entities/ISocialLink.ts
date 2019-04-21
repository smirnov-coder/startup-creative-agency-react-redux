import { IBaseEntity } from "./IBaseEntity";

interface ISocialLink extends IBaseEntity {
    NetworkName: string,
    Url: string
}

export default ISocialLink;