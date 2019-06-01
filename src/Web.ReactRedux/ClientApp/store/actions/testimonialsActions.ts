import { Testimonial } from "@store/entities";
import { fetchData, ItemsAction, addItems, setCurrent, CurrentAction, deleteEntity, submitFormData } from "./genericActions";
import { GLOBALS, Routes } from "@scripts/constants";
import { ActionTypes } from "./actionTypes";
import { decodeHTML, formatString } from "@scripts/utils";

export function fetchTestimonials() {
    return fetchData<Testimonial[]>({
        url: GLOBALS.api.testimonials,
        requestActionType: ActionTypes.REQUEST_TESTIMONIALS,
        success: addTestimonials,
        errorTitle: "fetch testimonials error"
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
        requestActionType: ActionTypes.REQUEST_TESTIMONIALS,
        success: setCurrentTestimonial,
        errorTitle: "fetch testimonial error"
    });
}

export function setCurrentTestimonial(testimonial: Testimonial): CurrentAction<Testimonial> {
    return setCurrent<Testimonial>(testimonial, ActionTypes.CURRENT_TESTIMONIAL);
}

export function deleteTestimonial(testimonialId: number) {
    return deleteEntity({
        entityId: testimonialId,
        urlTemplate: GLOBALS.api.testimonial,
        requestActionType: ActionTypes.REQUEST_TESTIMONIALS,
        success: fetchTestimonials,
        errorTitle: "delete testimonial error"
    });
}

export const addTestimonial = (testimonialData: FormData) =>
    submitTestimonialData(testimonialData, "POST", "add testimonial error");

export const updateTestimonial = (testimonialData: FormData) =>
    submitTestimonialData(testimonialData, "PUT", "update testimonial error");

function submitTestimonialData(testimonialData: FormData, method: "POST" | "PUT", errorTitle: string) {
    return submitFormData({
        url: GLOBALS.api.testimonials,
        method,
        formData: testimonialData,
        successRedirectUrl: Routes.TESTIMONIALS,
        requestActionType: ActionTypes.REQUEST_TESTIMONIALS,
        completedActionType: ActionTypes.REQUEST_TESTIMONIALS_COMPLETED,
        errorTitle
    });
}