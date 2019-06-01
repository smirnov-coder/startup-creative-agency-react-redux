export interface BaseEntity {
    Id: number,
    CreatedOn: Date
}

export interface CreatorEntity extends BaseEntity {
    CreatedBy: DomainUser
}

export interface UpdatableEntity extends CreatorEntity {
    LastUpdatedOn: Date,
    LastUpdatedBy: DomainUser
}

export interface BlogPost extends UpdatableEntity {
    ImagePath: string,
    Title: string,
    Category: string,
    Content: string
}

export interface Brand extends UpdatableEntity {
    Name: string,
    ImagePath: string
}

export interface ContactInfo {
    Name: string,
    Caption: string,
    Values: {
        Value: string
    }[]
}

export interface DomainUser extends UpdatableEntity {
    Identity: UserIdentity,
    Profile: UserProfile
}

export interface Message extends BaseEntity {
    Name: string,
    Email: string,
    Subject: string,
    Company: string,
    Text: string,
    IPAddress: string,
    IsRead: boolean
}

export interface ServiceInfo extends UpdatableEntity {
    Caption: string,
    Description: string,
    IconClass: string
}

export interface SocialLink extends BaseEntity {
    NetworkName: string,
    Url: string
}

export interface Testimonial extends UpdatableEntity {
    Author: string,
    Company: string,
    Text: string
}

export interface UserIdentity {
    UserName: string,
    Email: string
}

export interface UserProfile extends BaseEntity {
    FirstName: string,
    LastName: string,
    PhotoFilePath: string,
    JobPosition: string,
    IsReadyForDisplay: boolean,
    DisplayAsTeamMember: boolean,
    SocialLinks: SocialLink[]
}

export interface WorkExample extends UpdatableEntity {
    Name: string,
    Category: string,
    Description: string,
    ImagePath: string
}