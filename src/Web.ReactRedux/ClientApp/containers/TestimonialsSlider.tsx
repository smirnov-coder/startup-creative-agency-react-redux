import * as React from "react";
import { ITestimonial } from "../store/entities";
import { connect } from "react-redux";
import { AppState } from "../store/reducers/rootReducer";
import OwlCarousel from "../assets/lib/owl.carousel-customized/OwlCarousel";
import { Options } from "../assets/lib/owl.carousel-customized/OwlCarousel";
import { Testimonial } from "../components/Testimonial";
import "./TestimonialsSlider.scss";


interface ITestimonialsSliderProps {
    isLoading: boolean;
    items: ITestimonial[];
}

class TestimonialsSlider extends React.Component<ITestimonialsSliderProps> {
    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let owlOptions = this.getOwlCarouselOptions();
        return /* /// TODO: Add loader. */isLoading ? <div>Loading...Please wait.</div> :
            <OwlCarousel className="testimonials-slider" {...owlOptions}>
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

interface IStateProps {
    isLoading: boolean;
    items: ITestimonial[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.testimonialsReducer.testimonials.isLoading,
        items: state.testimonialsReducer.testimonials.items
    };
}

export default connect(mapStateToProps, null)(TestimonialsSlider);