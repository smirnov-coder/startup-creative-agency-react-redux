import * as React from "react";
import { compose } from "redux";
import { Brand } from "@store/entities";
import Loader from "@components/Shared/Loader";
import { withLoader } from "@containers/Admin/withLoader";
import { withDataFeed } from "@containers/Admin/withDataFeed";
import OwlCarousel from "../../../assets/lib/owl.carousel-customized/OwlCarousel";
import { Options } from "../../../assets/lib/owl.carousel-customized/OwlCarousel";
import "@bootstrap/css";
import "./BrandsCarousel.scss";

interface BrandsCarouselProps {
    items: Brand[];
}

class BrandsCarousel extends React.Component<BrandsCarouselProps> {
    render(): JSX.Element {
        let owlOptions: Options = this.getOwlCarouselOptions();
        return (
            <OwlCarousel className="brands-carousel" {...owlOptions}>
                {this.props.items.map((brand, index) => (
                    <article key={index} className="brands-carousel__item">
                        <h4 className="sr-only">{brand.Name}</h4>
                        <img src={brand.ImagePath} className="brands-carousel__img" alt={brand.Name} />
                    </article>
                ))}
            </OwlCarousel>
        );
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

const composed = compose(
    withLoader(Loader, state => state.brands.isLoading),
    withDataFeed(state => state.brands.items, "items")
);

export default composed(BrandsCarousel);