import * as React from "react";
import { Testimonial as TestimonialEntity } from "../../store/entities";
import { connect } from "react-redux";
import OwlCarousel from "../../assets/lib/owl.carousel-customized/OwlCarousel";
import { Options } from "../../assets/lib/owl.carousel-customized/OwlCarousel";
import { Testimonial } from "../../components/Home/Testimonial";
import "./TestimonialsSlider.scss";
import { Loader } from "../../components/Home/Loader";
import { AppState } from "../../store/state";

type TestimonialsSliderProps = StateProps;

class TestimonialsSlider extends React.Component<TestimonialsSliderProps> {
    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let owlOptions = this.getOwlCarouselOptions();
        return isLoading
            ? <Loader />
            : <OwlCarousel className="testimonials-slider" {...owlOptions}>
                {items.map(testimonial => (
                    <Testimonial key={testimonial.Id} {...testimonial} />
                ))}
              </OwlCarousel>
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
        }
    }
}

interface StateProps {
    isLoading: boolean;
    items: TestimonialEntity[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.testimonials.isLoading,
        items: state.testimonials.items
    };
}

export default connect(mapStateToProps, null)(TestimonialsSlider);