import { Dispatch } from "redux";
import { ActionTypes } from "./actionTypes";
import { ServiceInfo, BlogPost } from "@store/entities";
import { ContactMessage } from "@containers/Home/ContactForm";
import { push, replace } from "connected-react-router";
import { MyProfilePageModel } from "@containers/Admin/MyProfilePage";
import { encodeHTML } from "@scripts/utils";

//const initMyProfilePage = (model: MyProfilePageModel): InitMyProfilePageAction => {
//    return {
//        type: "INIT_MY_PROFILE_PAGE",
//        userName: model.userWidget.userName,
//        photo: model.userWidget.photo,
//        isAuthenticated: true,
//        isAdmin: model.isAdmin,
//        user: model.user,
//        newMessagesCount: model.newMessagesCount
//    };
//}

//export const updateUserProfile = (userName: string, formData: FormData) => (dispatch: Dispatch) => {
//    //console.log("formData", formData);//
//    dispatch(requestBegin());
//    let accessToken: string = readAccessToken();
//    let options: RequestInit = {
//        method: "PUT",
//        body: formData,
//        headers: !accessToken ? {} : {
//            Authorization: `Bearer ${accessToken}`
//        }
//    };
//    return fetch(`/api/users/${userName}/profile`, options)
//        .then((response: Response) => response.json())
//        .then((data: any) => {
//            //console.log("data", data);//
//            let details: OperationDetails = data as OperationDetails
//            if (!details) {
//                details = {
//                    isError: true,
//                    message: "A validation error occurred while processing your request."
//                };
//            }
//            let notification: Notification = {
//                id: Date.now(),
//                type: details.isError ? "error" : "success",
//                text: $("<div />").text(details.message).html() // HTML encode with jQuery.
//            };
//            dispatch(addNotification(notification))
//            getMyProfilePageModel()(dispatch)
//                .then(() => dispatch(push("/admin/myprofile")));
//        })
//        .catch((error: Error) => {
//            console.error(error, "updateUserProfile error");//
//        });
//}



//interface ServicesPageModel {
//    userWidget: {
//        userName: string,
//        photo: string
//    };
//    items: ServiceInfo[];
//    isAdmin: boolean;
//    newMessagesCount: number;
//}


//const initServicesPage = (model: ServicesPageModel): any => {
//    return {
//        type: "INIT_SERVICES_PAGE",
//        userName: model.userWidget.userName,
//        photo: model.userWidget.photo,
//        isAuthenticated: true,
//        isAdmin: model.isAdmin,
//        services: model.items,
//        newMessagesCount: model.newMessagesCount
//    };
//}

//export const deleteService = (serviceId: number) => (dispatch: Dispatch) => {
//    /// TODO: Отрефакторить.
//    dispatch(requestBegin());
//    let accessToken: string = readAccessToken();
//    let options: RequestInit = {
//        method: "DELETE",
//        headers: !accessToken ? {} : {
//            Authorization: `Bearer ${accessToken}`
//        }
//    };
//    return fetch(`/api/services/${serviceId}`, options)
//        .then((response: Response) => response.json())
//        .then((data: any) => {
//            let details: OperationDetails = data as OperationDetails
//            if (!details) {
//                details = {
//                    isError: true,
//                    message: "A validation error occurred while processing your request."
//                };
//            }
//            let notification: Notification = {
//                id: Date.now(),
//                type: details.isError ? "error" : "success",
//                text: encodeHTML(details.message)
//            };
//            dispatch(addNotification(notification))
//            getServicesPageModel()(dispatch)
//                .then(() => dispatch(push("/admin/services")));
//        })
//        .catch((error: Error) => {
//            console.error(error, "deleteService error");//
//        });
//}

//interface AddServicePageModel {
//    userWidget: UserInfo;
//    isAdmin: boolean;
//    newMessagesCount: number;
//}


//const initAddServicePage = (model: AddServicePageModel): any => {
//    return {
//        type: "INIT_ADD_SERVICE_PAGE",
//        userName: model.userWidget.userName,
//        photo: model.userWidget.photo,
//        isAuthenticated: true,
//        isAdmin: model.isAdmin,
//        newMessagesCount: model.newMessagesCount
//    };
//}

//interface EditServicePageModel {
//    userWidget: UserInfo;
//    isAdmin: boolean;
//    newMessagesCount: number;
//    item: ServiceInfo;
//}


//const initEditServicePage = (model: EditServicePageModel): any => {
//    return {
//        type: "INIT_EDIT_SERVICE_PAGE",
//        userName: model.userWidget.userName,
//        photo: model.userWidget.photo,
//        isAuthenticated: true,
//        isAdmin: model.isAdmin,
//        newMessagesCount: model.newMessagesCount,
//        item: model.item
//    };
//}

//export const addService = (formData: FormData) => (dispatch: Dispatch) => {
//    dispatch(requestBegin());
//    let accessToken: string = readAccessToken();
//    let options: RequestInit = {
//        method: "POST",
//        headers: !accessToken ? {} : {
//            Authorization: `Bearer ${accessToken}`
//        },
//        body: formData
//    };
//    return fetch(`/api/services`, options)
//        .then((response: Response) => {
//            return response.json();
//        })
//        .then((data: OperationDetails | ValidationProblemDetails) => {
//            let isValidationError: boolean = "title" in data;
//            let details: OperationDetails = null;
//            if (isValidationError) {
//                details = {
//                    isError: true,
//                    message: "A validation error occurred while processing your request."
//                }
//            } else {
//                details = <OperationDetails>data;
//            }
//            let notification: Notification = {
//                id: Date.now(),
//                type: details.isError ? "error" : "success",
//                text: encodeHTML(details.message)
//            };
//            dispatch(addNotification(notification))
//            if (!isValidationError) {
//                dispatch(push("/admin/services"));
//            } else {
//                dispatch(requestEnd());
//            }
//        })
//        .catch((error: Error) => {
//            console.error(error, "addService error");//
//        });
//}

//export const updateService = (serviceId: number, formData: FormData) => (dispatch: Dispatch) => {
//    dispatch(requestBegin());
//    let accessToken: string = readAccessToken();
//    let options: RequestInit = {
//        method: "PUT",
//        headers: !accessToken ? {} : {
//            Authorization: `Bearer ${accessToken}`
//        },
//        body: formData
//    };
//    return fetch(`/api/services/${serviceId}`, options)
//        .then((response: Response) => {
//            return response.json();
//        })
//        .then((data: OperationDetails | ValidationProblemDetails) => {
//            let isValidationError: boolean = "title" in data;
//            let details: OperationDetails = null;
//            if (isValidationError) {
//                details = {
//                    isError: true,
//                    message: (data as ValidationProblemDetails).title
//                }
//            } else {
//                details = <OperationDetails>data;
//            }
//            let notification: Notification = {
//                id: Date.now(),
//                type: details.isError ? "error" : "success",
//                text: encodeHTML(details.message)
//            };
//            dispatch(addNotification(notification))
//            if (!isValidationError) {
//                dispatch(push("/admin/services"));
//            } else {
//                dispatch(requestEnd());
//            }
//        })
//        .catch((error: Error) => {
//            console.error(error, "updateService error");//
//        });
//}