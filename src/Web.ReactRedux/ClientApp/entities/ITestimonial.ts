import { IUpdatableEntity } from "./IBaseEntity";

interface ITestimonial extends IUpdatableEntity {
    Author: string,
    Company: string,
    Text: string
}

export default ITestimonial;