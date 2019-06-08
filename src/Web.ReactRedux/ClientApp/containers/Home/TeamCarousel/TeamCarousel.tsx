import * as React from "react";
import * as $ from "jquery";
import { compose } from "redux";
import { DomainUser } from "@store/entities";
import { TeamMember } from "@components/Home/TeamMember";
import Loader from "@components/Shared/Loader";
import { withLoader } from "@containers/Admin/withLoader";
import { withDataFeed } from "@containers/Admin/withDataFeed";
import OwlCarousel from "@owl.carousel/OwlCarousel";
import { Options } from "@owl.carousel/options";
import "@bootstrap/css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "./TeamCarousel.scss";

interface TeamCarouselProps {
    items: DomainUser[];
}

class TeamCarousel extends React.Component<TeamCarouselProps> {
    render(): JSX.Element {
        let { items } = this.props;
        let owlOptions = this.getOwlCarouselOptions();
        return (
            <section className="team">
                <h3 className="sr-only">Our Team</h3>
                <OwlCarousel className="team__carousel" {...owlOptions} onRefreshed={this.addTeamMemberHover}>
                    {items.map((item, index) => (
                        <TeamMember key={index} {...item} />
                    ))}
                </OwlCarousel>
            </section>
        );
    }

    getOwlCarouselOptions(): Options {
        let carouselNavClass = "team__carousel-nav";
        let prevButtonClass = "carousel-nav-button team__carousel-nav-button-prev";
        let nextButtonClass = "carousel-nav-button team__carousel-nav-button-next";
        let prevButtonIcon = "<i class=\"fa fa-angle-left\"></i>";
        let nextButtonIcon = "<i class=\"fa fa-angle-right\"></i>";
        return {
            items: 0,
            margin: 30,
            loop: true,
            dots: false,
            nav: true,
            navContainerClass: carouselNavClass,
            navClass: [prevButtonClass, nextButtonClass],
            navText: [prevButtonIcon, nextButtonIcon],
            responsiveClass: true,
            responsive: {
                0: { items: 1 },
                480: { items: 2 },
                768: { items: 3 },
                992: { items: 4 }
            }
        };
    }

    // Из-за особенностей работы (и недостатков) OwlCarousel, приходится вешать обработчик события наведения мыши здесь.
    addTeamMemberHover(): void {
        let $teamMember = $(".team-member");
        let overlaySelector = ".team-member__img-overlay";
        let duration: number = 100;
        // .hover() + .fadeToggle() работает как-то криво.
        $teamMember.mouseenter(function () {
            $(this).find(overlaySelector).fadeIn({ duration });
        });
        $teamMember.mouseleave(function () {
            $(this).find(overlaySelector).fadeOut({ duration });
        });
    }
}

const composed = compose(
    withLoader(Loader, state => state.users.isLoading),
    withDataFeed(state => state.users.items, "items")
);

export default composed(TeamCarousel);