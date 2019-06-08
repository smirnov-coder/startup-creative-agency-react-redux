import { push } from "connected-react-router";
import { ServiceInfo } from "@store/entities";
import { GLOBALS, Routes, HttpMethod } from "@scripts/constants";
import { decodeHTML, formatString } from "@scripts/utils";
import {
    ActionTypes,
    fetchData,
    setCurrent,
    deleteEntity,
    submitFormData,
    ItemsAction,
    addItems,
    CurrentAction,
    createNonPayloadAction
} from "@store/actions";

export function fetchServices() {
    let url: string = GLOBALS.api.services;
    return fetchData<ServiceInfo[]>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_SERVICES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_SERVICES_COMPLETED)),
        success: addServices,
        errorMessage: `Failed to fetch services from ${url}.`
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
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_SERVICES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_SERVICES_COMPLETED)),
        success: setCurrentService,
        errorMessage: `Failed to fetch srevice with ID = ${serviceId}.`
    });
}

export function setCurrentService(service: ServiceInfo): CurrentAction<ServiceInfo> {
    return setCurrent<ServiceInfo>(service, ActionTypes.CURRENT_SERVICE);
}

export function deleteService(serviceId: number) {
    return deleteEntity({
        entityId: serviceId,
        urlTemplate: GLOBALS.api.service,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_SERVICES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_SERVICES_COMPLETED)),
        success: fetchServices(),
        errorMessage: `Failed to delete service with ID = ${serviceId}.`
    });
}

export function addService(serviceData: FormData) {
    return submitServiceData(serviceData, HttpMethod.POST, "Failed to create new service.");
}

export function updateService(serviceData: FormData) {
    return submitServiceData(serviceData, HttpMethod.PUT, `Failed to update service with ID = ${serviceData.get("Id")}.`);
}

function submitServiceData(serviceData: FormData, method: HttpMethod, errorMessage: string) {
    return submitFormData({
        url: GLOBALS.api.services,
        method,
        formData: serviceData,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_SERVICES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_SERVICES_COMPLETED)),
        success: (dispatch) => dispatch(push(Routes.SERVICES)),
        errorMessage
    });
}