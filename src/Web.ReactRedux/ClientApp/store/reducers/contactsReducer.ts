import { ContactsState, initialState } from "@store/state";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";
import { ContactsAction } from "@store/actions/contactsActions";

type ContactsActions = 
    | HomePageModelAction
    | ContactsAction

export default function contactsReducer(state: ContactsState = initialState.contacts, action: ContactsActions): ContactsState {
    switch (action.type) {
        case ActionTypes.REQUEST_HOME_PAGE_MODEL:
        case ActionTypes.REQUEST_CONTACTS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_CONTACTS_COMPLETED: {
            return {
                ...state,
                isLoading: false
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

        case ActionTypes.CONTACTS: {
            let { contactInfos, socialLinks } = (action as ContactsAction).payload;
            return {
                isLoading: false,
                error: null,
                contactInfos,
                socialLinks
            };
        }

        default:
            return state;
    }
}