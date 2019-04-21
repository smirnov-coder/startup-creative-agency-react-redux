import IDomaiUser from "./IDomainUser";

export interface IBaseEntity {
    Id: number,
    CreatedOn: Date
}

export interface ICreatorEntity extends IBaseEntity {
    CreatedBy: IDomaiUser
}

export interface IUpdatableEntity extends ICreatorEntity {
    LastUpdatedOn: Date,
    LastUpdatedBy: IDomaiUser
}