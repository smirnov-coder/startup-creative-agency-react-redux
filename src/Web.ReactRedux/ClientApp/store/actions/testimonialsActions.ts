import { push } from "connected-react-router";
import { Testimonial } from "@store/entities";
import { GLOBALS, Routes, HttpMethod } from "@scripts/constants";
import { decodeHTML, formatString } from "@scripts/utils";
import {
    fetchData,
    ItemsAction,
    addItems,
    setCurrent,
    CurrentAction,
    deleteEntity,
    submitFormData,
    ActionTypes,
    createNonPayloadAction
} from "@store/actions";

export function fetchTestimonials() {
    let url: string = GLOBALS.api.testimonials;
    return fetchData<Testimonial[]>({
        url: GLOBALS.api.testimonials,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_TESTIMONIALS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_TESTIMONIALS_COMPLETED)),
        success: addTestimonials,
        errorMessage: `Failed to fetch testimonials from ${url}.`
    });
}

function addTestimonials(testimonials: Testimonial[]): ItemsAction<Testimonial> {
    return addItems(testimonials, false, ActionTypes.TESTIMONIALS);
}

export function fetchTestimonial(testimonialId: number) {
    let template: string = decodeHTML(GLOBALS.api.testimonial);
    let url: string = formatString(template, testimonialId);
    return fetchData<Testimonial>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_TESTIMONIALS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_TESTIMONIALS_COMPLETED)),
        success: setCurrentTestimonial,
        errorMessage: `Failed to fetch testimonial with ID = ${testimonialId} from ${url}.`
    });
}

export function setCurrentTestimonial(testimonial: Testimonial): CurrentAction<Testimonial> {
    return setCurrent<Testimonial>(testimonial, ActionTypes.CURRENT_TESTIMONIAL);
}

export function deleteTestimonial(testimonialId: number) {
    return deleteEntity({
        entityId: testimonialId,
        urlTemplate: GLOBALS.api.testimonial,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_TESTIMONIALS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_TESTIMONIALS_COMPLETED)),
        success: fetchTestimonials(),
        errorMessage: `Failed to delete testimonial with ID = ${testimonialId}.`
    });
}

export function addTestimonial(testimonialData: FormData) {
    return submitTestimonialData(testimonialData, HttpMethod.POST, "Failed to create new testimonial.");
}

export function updateTestimonial(testimonialData: FormData) {
    return submitTestimonialData(testimonialData, HttpMethod.PUT,
        `Failed to update testimonial with ID = ${testimonialData.get("Id")}.`)
}

function submitTestimonialData(testimonialData: FormData, method: HttpMethod, errorMessage: string) {
    return submitFormData({
        url: GLOBALS.api.testimonials,
        method,
        formData: testimonialData,
        success: (dispatch) => dispatch(push(Routes.TESTIMONIALS)),
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_TESTIMONIALS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_TESTIMONIALS_COMPLETED)),
        errorMessage
    });
}