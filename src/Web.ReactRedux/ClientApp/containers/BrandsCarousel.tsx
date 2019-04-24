import * as React from "react";
import { IBrand } from "../store/entities";
import { connect } from "react-redux";
import { AppState } from "../store/reducers/rootReducer";
import OwlCarousel from "../assets/lib/owl.carousel-customized/OwlCarousel";
import { Options } from "../assets/lib/owl.carousel-customized/OwlCarousel";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./BrandsCarousel.scss";
import "owl.carousel/dist/assets/owl.carousel.css";

interface IBrandsCarouselProps {
    isLoading: boolean;
    items: IBrand[];
}

class BrandsCarousel extends React.Component<IBrandsCarouselProps> {
    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let owlOptions = this.getOwlCarouselOptions();
        return isLoading ? <div>Loading...Please wait.</div> :
            <OwlCarousel className="brands-carousel" {...owlOptions}>
                {items.map(brand => (
                    <article key={brand.Id} className="brands-carousel__item">
                        <h4 className="sr-only">{brand.Name}</h4>
                        <img src={brand.ImagePath} className="brands-carousel__img" alt={brand.Name} />
                    </article>
                ))}
            </OwlCarousel>
    }

    getOwlCarouselOptions(): Options {
        return {
            autoplay: true,
            autoplayTimeout: 3000,
            loop: true,
            items: 5,
            nav: false,
            dots: false,
            margin: 60,
            //
            // Автор OwlCarousel почему-то не добавил функцию движения слайдов слева направо в реализацию 
            // карусели для React. Пришлось расковырять библиотеку и добавить эту возможность самому.
            //
            rtl: true, // Слайды движутся слева направо.
            //
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 2
                },
                600: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                }
            }
        }
    }
}

interface IStateProps {
    isLoading: boolean;
    items: IBrand[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.brandsReducer.brands.isLoading,
        items: state.brandsReducer.brands.items
    };
}

//interface IDispatchProps {
//    getPageModel: () => void
//}

//const mapDispatchToProps = (dispatch: Dispatch<ServicesActions>): IDispatchProps => {
//    return {
//        getPageModel: bindActionCreators(getPageModel, dispatch)
//    };
//}

export default connect(mapStateToProps, null)(BrandsCarousel);