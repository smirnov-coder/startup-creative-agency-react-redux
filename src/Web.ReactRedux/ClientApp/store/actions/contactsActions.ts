import { SocialLink, ContactInfo } from "@store/entities";
import { Action } from "redux";
import { fetchData, submitFormData } from "./genericActions";
import { GLOBALS, HttpMethod } from "@scripts/constants";
import { ActionTypes } from "./actionTypes";
import { createNonPayloadAction } from "./appActions";

interface ContactsPageModel {
    ContactInfos: ContactInfo[];
    SocialLinks: SocialLink[];
}

export function fetchContacts() {
    return fetchData<ContactsPageModel>({
        url: GLOBALS.api.contacts,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_CONTACTS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_CONTACTS_COMPLETED)),
        success: addContacts,
        errorMessage: `Failed to fetch contacts from ${GLOBALS.api.contacts}.`
    });
}

export interface ContactsAction extends Action {
    payload: {
        contactInfos: ContactInfo[];
        socialLinks: SocialLink[];
    }
}

const addContacts = ({ ContactInfos, SocialLinks }: ContactsPageModel): ContactsAction => {
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
        method: HttpMethod.POST,
        url: GLOBALS.api.contacts,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_CONTACTS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_CONTACTS_COMPLETED)),
        success: fetchContacts(),
        errorMessage: "Failed to save contacts."
    });
}