import * as React from "react";
import { Testimonial as TestimonialEntity } from "@store/entities";
import OwlCarousel from "../../assets/lib/owl.carousel-customized/OwlCarousel";
import { Options } from "../../assets/lib/owl.carousel-customized/OwlCarousel";
import Testimonial from "@components/Home/Testimonial";
import "./TestimonialsSlider.scss";
import Loader from "@components/Shared/Loader";
import { compose } from "redux";
import { withLoader } from "@containers/Admin/withLoader";
import { withDataFeed } from "@containers/Admin/withDataFeed";

interface TestimonialsSliderProps {
    items: TestimonialEntity[];
}

class TestimonialsSlider extends React.Component<TestimonialsSliderProps> {
    render(): JSX.Element {
        let { items } = this.props;
        let owlOptions = this.getOwlCarouselOptions();
        return (
            <OwlCarousel className="testimonials-slider" {...owlOptions}>
                {items.map((testimonial, index) => (
                    <Testimonial key={index} {...testimonial} />
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