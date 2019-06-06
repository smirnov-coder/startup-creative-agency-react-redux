import { push } from "connected-react-router";
import { WorkExample } from "@store/entities";
import { GLOBALS, Routes, HttpMethod } from "@scripts/constants";
import { decodeHTML, formatString } from "@scripts/utils";
import {
    fetchData,
    addItems,
    ItemsAction,
    deleteEntity,
    CurrentAction,
    setCurrent,
    submitFormData,
    ActionTypes,
    createNonPayloadAction
} from "@store/actions";

export function fetchWorks() {
    let url: string = GLOBALS.api.works;
    return fetchData<WorkExample[]>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS_COMPLETED)),
        success: addWorks,
        errorMessage: `Failed to fetch work examples from ${url}.`
    });
}

function addWorks(works: WorkExample[]): ItemsAction<WorkExample> {
    return addItems(works, false, ActionTypes.WORKS);
}

export function deleteWorkExample(workExampleId: number) {
    return deleteEntity({
        entityId: workExampleId,
        urlTemplate: GLOBALS.api.workExample,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS_COMPLETED)),
        success: fetchWorks(),
        errorMessage: `Failed to fetch wotk example with ID = ${workExampleId}.`
    });
}

export function setCurrentWorkExample(workExample: WorkExample): CurrentAction<WorkExample> {
    return setCurrent<WorkExample>(workExample, ActionTypes.CURRENT_WORK_EXAMPLE);
}

export function addWorkExample(workExampleData: FormData) {
    return submitWorkExampleData(workExampleData, HttpMethod.POST, `Failed to create new work example.`);
}

export function updateWorkExample(workExampleData: FormData) {
    return submitWorkExampleData(workExampleData, HttpMethod.PUT,
        `Failed to update work example with ID = ${workExampleData.get("Id")}`);
}

function submitWorkExampleData(workExampleData: FormData, method: HttpMethod, errorMessage: string) {
    return submitFormData({
        url: GLOBALS.api.works,
        method,
        formData: workExampleData,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS_COMPLETED)),
        success: dispatch => dispatch(push(Routes.WORKS)),
        errorMessage
    });
}

export function fetchWorkExample(workExampleId: number) {
    let uriTemplate: string = decodeHTML(GLOBALS.api.workExample);
    let url: string = formatString(uriTemplate, workExampleId);
    return fetchData<WorkExample>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS_COMPLETED)),
        success: setCurrentWorkExample,
        errorMessage: `Failed to fetch work example with ID = ${workExampleId}.`
    });
}