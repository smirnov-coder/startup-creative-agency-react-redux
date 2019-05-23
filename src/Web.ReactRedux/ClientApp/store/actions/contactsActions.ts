import { SocialLink, ContactInfo } from "@store/entities";
import { Action } from "redux";

export interface AddContactsAction extends Action {
    payload: {
        contactInfos: ContactInfo[],
        socialLinks: SocialLink[]
    };
}

export const addContacts = (contactInfos: ContactInfo[], socialLinks: SocialLink[]): AddContactsAction => {
    return {
        type: "ADD_CONTACTS",
        payload: {
            contactInfos,
            socialLinks
        }
    };
}