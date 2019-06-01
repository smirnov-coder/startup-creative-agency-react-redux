import { SocialLink, ContactInfo } from "@store/entities";
import { Action } from "redux";
import { fetchData, submitFormData } from "./genericActions";
import { GLOBALS, Routes } from "@scripts/constants";
import { ActionTypes } from "./actionTypes";

interface ContactsPageModel {
    ContactInfos: ContactInfo[];
    SocialLinks: SocialLink[];
}

export function fetchContacts() {
    return fetchData<ContactsPageModel>({
        url: GLOBALS.api.contacts,
        requestActionType: ActionTypes.REQUEST_CONTACTS,
        success: addContacts,
        errorTitle: "fetch contacts error"
    });
}

export interface ContactsAction extends Action {
    payload: {
        contactInfos: ContactInfo[];
        socialLinks: SocialLink[];
    }
}

const addContacts = ({ ContactInfos, SocialLinks }: ContactsPageModel): ContactsAction => {
    //console.log("infos", contactInfos);//
    //console.log("links", socialLinks);//
    return {
        type: ActionTypes.CONTACTS,
        payload: {
            contactInfos: ContactInfos,
            socialLinks: SocialLinks
        }
    };
}

export function saveContacts(contactsData: FormData) {
    return submitFormData({
        formData: contactsData,
        method: "POST",
        url: GLOBALS.api.contacts,
        requestActionType: ActionTypes.REQUEST_CONTACTS,
        completedActionType: ActionTypes.REQUEST_CONTACTS_COMPLETED,
        successRedirectUrl: Routes.CONTACTS,
        errorTitle: "save contacts error"
    });
}