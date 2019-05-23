import { Testimonial } from "@store/entities";
import { Action } from "redux";

export interface AddTestimonialsAction extends Action {
    payload: {
        items: Testimonial[]
    };
}

export const addTestimonials = (testimonials: Testimonial[]): AddTestimonialsAction => {
    return {
        type: "ADD_TESTIMONIALS",
        payload: {
            items: testimonials
        }
    };
}