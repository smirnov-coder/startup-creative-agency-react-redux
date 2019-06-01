import { WorkExample } from "@store/entities";
import { fetchData, addItems, ItemsAction, deleteEntity, CurrentAction, setCurrent, submitFormData } from "./genericActions";
import { GLOBALS, Routes } from "@scripts/constants";
import { ActionTypes } from "./actionTypes";
import { decodeHTML, formatString } from "@scripts/utils";

export function fetchWorks() {
    return fetchData<WorkExample[]>({
        url: GLOBALS.api.works,
        requestActionType: ActionTypes.REQUEST_WORKS,
        success: addWorks,
        errorTitle: "fetch works error"
    });
}

function addWorks(works: WorkExample[]): ItemsAction<WorkExample> {
    return addItems(works, false, ActionTypes.WORKS);
}

export function deleteWorkExample(workExampleId: number) {
    return deleteEntity({
        entityId: workExampleId,
        urlTemplate: GLOBALS.api.workExample,
        requestActionType: ActionTypes.REQUEST_WORKS,
        success: fetchWorks,
        errorTitle: "delete work example error"
    });
}

export function setCurrentWorkExample(workExample: WorkExample): CurrentAction<WorkExample> {
    return setCurrent<WorkExample>(workExample, ActionTypes.CURRENT_WORK_EXAMPLE);
}

export const addWorkExample = (workExampleData: FormData) =>
    submitWorkExampleData(workExampleData, "POST", "add work example error");

export const updateWorkExample = (workExampleData: FormData) =>
    submitWorkExampleData(workExampleData, "PUT", "update work example error");

function submitWorkExampleData(workExampleData: FormData, method: "POST" | "PUT", errorTitle: string) {
    return submitFormData({
        url: GLOBALS.api.works,
        method,
        formData: workExampleData,
        successRedirectUrl: Routes.WORKS,
        requestActionType: ActionTypes.REQUEST_WORKS,
        completedActionType: ActionTypes.REQUEST_WORKS_COMPLETED,
        errorTitle
    });
}

export function fetchWorkExample(workExampleId: number) {
    let uriTemplate: string = decodeHTML(GLOBALS.api.workExample); //console.log("template", uriTemplate);//
    let url: string = formatString(uriTemplate, workExampleId); //console.log("url", url);//
    return fetchData<WorkExample>({
        url,
        requestActionType: ActionTypes.REQUEST_WORKS,
        success: setCurrentWorkExample,
        errorTitle: "fetch work example error"
    });
}