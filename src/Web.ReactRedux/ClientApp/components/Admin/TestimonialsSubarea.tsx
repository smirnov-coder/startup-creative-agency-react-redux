import * as React from "react";
import { Switch, Route, Redirect, match } from "react-router";
import { Routes } from "@scripts/constants";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import Loader from "@components/Shared/Loader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import { compose } from "redux";
import { Testimonial } from "@store/entities";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import { withDocumentTitle } from "./withDocumentTitle";
import { fetchTestimonials, addTestimonial, fetchTestimonial, updateTestimonial } from "@store/actions/testimonialsActions";
import TestimonialList from "@containers/Admin/TestimonialList";
import { TestimonialItemForm } from "@containers/Admin/TestimonialItemForm";
import { withDataFeed } from "@containers/Admin/withDataFeed";

const TestimonialsSubarea: React.SFC = () => {
    return (
        <Switch>
            <Route exact path={Routes.TESTIMONIALS} component={TestimonialsPage} />
            <Route path={Routes.ADD_TESTIMONIAL} component={AddTestimonialPage} />
            <Route path={Routes.EDIT_TESTIMONIAL} component={EditTestimonialPage} />
            <Redirect to={Routes.NOT_FOUND} />
        </Switch>
    );
}

// Testimonials page
const TestimonialsPage = compose(
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchTestimonials),
    withLoader(Loader, state => state.testimonials.isLoading),
    withPageContentWrapper("Testimonial List"),
    withDataFeed(state => state.testimonials.items, "items")
)(TestimonialList);

// AddTestimonial page
const AddTestimonialPage = compose(
    withPageContentWrapper("Add Testimonial"),
    withSubmitHandler(addTestimonial),
    withDataFeed(state => { return { Id: 0, Author: "", Company: "", Text: "" } as Testimonial }, "item")
)(TestimonialItemForm);

// EditTestimonial page
const EditTestimonialPage = compose(
    withInitializer(
        (routeMatch, actionCreator) => {
            let id: number = (routeMatch.params as any).id;
            return () => actionCreator(id);
        },
        fetchTestimonial
    ),
    withLoader(Loader, state => state.testimonials.isLoading || !state.testimonials.current),
    withPageContentWrapper((routeMatch: match) => `Edit Testimonial, ID: ${(routeMatch.params as any).id}`),
    withSubmitHandler(updateTestimonial),
    withDataFeed(state => state.testimonials.current, "item")
)(TestimonialItemForm);

export default withDocumentTitle("Startup ReactRedux Admin Testimonials")(TestimonialsSubarea);