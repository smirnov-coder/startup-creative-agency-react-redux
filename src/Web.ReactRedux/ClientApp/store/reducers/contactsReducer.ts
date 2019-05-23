import { ContactsState, initialState } from "@store/state";
import { AddContactsAction } from "@store/actions/contactsActions";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";

type ContactsActions = 
    | AddContactsAction
    | HomePageModelAction

export default function contactsReducer(state: ContactsState = initialState.contacts, action: ContactsActions): ContactsState {
    switch (action.type) {
        case ActionTypes.REQUEST_HOME_PAGE_MODEL:
        case ActionTypes.REQUSET_CONTACTS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUSET_CONTACTS_COMPLETED: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.HOME_PAGE_MODEL: {
            let { contacts, socialLinks } = (action as HomePageModelAction).payload.model
            return {
                isLoading: false,
                error: null,
                contactInfos: contacts,
                socialLinks: socialLinks
            };
        }

        //case "ADD_CONTACTS": {
        //    let { contactInfos, socialLinks } = (action as AddContactsAction).payload
        //    return {
        //        isLoading: false,
        //        error: null,
        //        contactInfos,
        //        socialLinks
        //    };
        //}

        //case ActionTypes.ASSIGN_SOCIAL_LINKS: {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: null,
        //        socialLinks: action.items
        //    };
        //}

        //case ActionTypes.ASSIGN_ERROR: {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: action.error
        //    };
        //}

        default:
            return state;
    }
}