import * as React from "react";
import { compose } from "redux";
import { Testimonial } from "@store/entities";
import Loader from "@components/Shared/Loader";
import TestimonialItem from "@components/Home/Testimonial";
import { withLoader } from "@containers/Admin/withLoader";
import { withDataFeed } from "@containers/Admin/withDataFeed";
import OwlCarousel from "@owl.carousel/OwlCarousel";
import { Options } from "@owl.carousel/options";
import "owl.carousel/dist/assets/owl.carousel.css";
import "./TestimonialsSlider.scss";

interface TestimonialsSliderProps {
    items: Testimonial[];
}

class TestimonialsSlider extends React.Component<TestimonialsSliderProps> {
    render(): JSX.Element {
        let { items } = this.props;
        let owlOptions = this.getOwlCarouselOptions();
        return (
            <OwlCarousel className="testimonials-slider" {...owlOptions}>
                {items.map((testimonial, index) => (
                    <TestimonialItem key={index} {...testimonial} />
                ))}
            </OwlCarousel>
        );
    }

    getOwlCarouselOptions(): Options {
        return {
            items: 1,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            loop: true,
            nav: false,
            dots: true,
            dotsClass: "testimonials-slider__dots",
            dotClass: "testimonials-slider__dot"
        };
    }
}

const composed = compose(
    withLoader(Loader, state => state.testimonials.isLoading),
    withDataFeed(state => state.testimonials.items, "items")
);

export default composed(TestimonialsSlider);