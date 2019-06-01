import { ServiceInfo } from "@store/entities";
import { ActionTypes } from "./actionTypes";
import { GLOBALS, Routes } from "@scripts/constants";
import { fetchData, setCurrent, deleteEntity, submitFormData, ItemsAction, addItems, CurrentAction } from "./genericActions";
import { decodeHTML, formatString } from "@scripts/utils";

export function fetchServices() {
    return fetchData<ServiceInfo[]>({
        url: GLOBALS.api.services,
        requestActionType: ActionTypes.REQUEST_SERVICES,
        success: addServices,
        errorTitle: "fetch services error"
    });
}

function addServices(services: ServiceInfo[]): ItemsAction<ServiceInfo> {
    return addItems(services, false, ActionTypes.SERVICES);
}

export function fetchService(serviceId: number) {
    let uriTemplate: string = decodeHTML(GLOBALS.api.service);
    let url: string = formatString(uriTemplate, serviceId);
    return fetchData<ServiceInfo>({
        url,
        requestActionType: ActionTypes.REQUEST_SERVICES,
        success: setCurrentService,
        errorTitle: "fetch service error"
    });
}

export function setCurrentService(service: ServiceInfo): CurrentAction<ServiceInfo> {
    return setCurrent<ServiceInfo>(service, ActionTypes.CURRENT_SERVICE);
}

export function deleteService(serviceId: number) {
    return deleteEntity({
        entityId: serviceId,
        urlTemplate: GLOBALS.api.service,
        requestActionType: ActionTypes.REQUEST_SERVICES,
        success: fetchServices,
        errorTitle: "delete service error"
    });
}

export const addService = (serviceData: FormData) => submitServiceData(serviceData, "POST", "add service error");

export const updateService = (serviceData: FormData) => submitServiceData(serviceData, "PUT", "update service error");

function submitServiceData(serviceData: FormData, method: "POST" | "PUT", errorTitle: string) {
    return submitFormData({
        url: GLOBALS.api.services,
        method,
        formData: serviceData,
        successRedirectUrl: Routes.SERVICES,
        requestActionType: ActionTypes.REQUEST_SERVICES,
        completedActionType: ActionTypes.REQUEST_SERVICES_COMPLETED,
        errorTitle
    });
}