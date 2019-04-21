import { IUpdatableEntity } from "./IBaseEntity";

interface IBlogPost extends IUpdatableEntity {
    ImagePath: string,
    Title: string,
    Category: string,
    Content: string
}

export default IBlogPost;