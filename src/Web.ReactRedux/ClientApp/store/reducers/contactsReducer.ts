import { ContactsState, initialState as appState } from "@store/state";
import { ContactsAction, ActionTypes, HomePageModelAction } from "@store/actions";

type ContactsActions =
    | HomePageModelAction
    | ContactsAction;

const initialState = appState.contacts;

export default function contactsReducer(state: ContactsState = initialState, action: ContactsActions): ContactsState {
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
                contactInfos: contacts,
                socialLinks: socialLinks
            };
        }

        case ActionTypes.CONTACTS: {
            let { contactInfos, socialLinks } = (action as ContactsAction).payload;
            return {
                isLoading: false,
                contactInfos,
                socialLinks
            };
        }

        default:
            return state;
    }
}