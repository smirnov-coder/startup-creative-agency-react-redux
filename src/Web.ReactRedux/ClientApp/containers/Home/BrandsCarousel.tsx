﻿import * as React from "react";
import { Brand } from "@store/entities";
import { connect } from "react-redux";
import OwlCarousel from "../../assets/lib/owl.carousel-customized/OwlCarousel";
import { Options } from "../../assets/lib/owl.carousel-customized/OwlCarousel";
import "@bootstrap/css";
import "./BrandsCarousel.scss";
import { AppState } from "../../store/state";
import Loader from "@components/Shared/Loader";

type BrandsCarouselProps = StateProps;

class BrandsCarousel extends React.Component<BrandsCarouselProps> {
    constructor(props: BrandsCarouselProps) {
        super(props);
    }

    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let owlOptions: Options = this.getOwlCarouselOptions();
        return isLoading
            ? <Loader />
            : <OwlCarousel className="brands-carousel" {...owlOptions}>
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

interface StateProps {
    isLoading: boolean;
    items: Brand[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.brands.isLoading,
        items: state.brands.items
    };
}

export default connect(mapStateToProps, null)(BrandsCarousel);