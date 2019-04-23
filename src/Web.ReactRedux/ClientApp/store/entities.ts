export interface IBaseEntity {
    Id: number,
    CreatedOn: Date
}

export interface ICreatorEntity extends IBaseEntity {
    CreatedBy: IDomainUser
}

export interface IUpdatableEntity extends ICreatorEntity {
    LastUpdatedOn: Date,
    LastUpdatedBy: IDomainUser
}

export interface IBlogPost extends IUpdatableEntity {
    ImagePath: string,
    Title: string,
    Category: string,
    Content: string
}

export interface IBrand extends IUpdatableEntity {
    Name: string,
    ImagePath: string
}

export interface IContactInfo {
    Name: string,
    Caption: string,
    Values: string[]
}

export interface IDomainUser extends IUpdatableEntity {
    Identity: IUserIdentity,
    Profile: IUserProfile
}

export interface IMessage extends IBaseEntity {
    Name: string,
    Email: string,
    Subject: string,
    Company: string,
    Text: string,
    IPAddress: string,
    IsRead: boolean
}

export interface IServiceInfo extends IUpdatableEntity {
    Caption: string,
    Description: string,
    IconClass: string
}

export interface ISocialLink extends IBaseEntity {
    NetworkName: string,
    Url: string
}

export interface ITestimonial extends IUpdatableEntity {
    Author: string,
    Company: string,
    Text: string
}

export interface IUserIdentity {
    UserName: string,
    Email: string
}

export interface IUserProfile extends IBaseEntity {
    FirstName: string,
    LastName: string,
    PhotoFilePath: string,
    JobPosition: string,
    IsReadyForDisplay: boolean,
    DisplayAsTeamMember: boolean,
    SocialLinks: ISocialLink[]
}

export interface IWorkExample extends IUpdatableEntity {
    Name: string,
    Category: string,
    Description: string,
    ImagePath: string
}