import * as React from "react";
import { IDomainUser } from "../store/entities";
import { AppState } from "../store/reducers/rootReducer";
import { connect } from "react-redux";
import { TeamMember } from "../components/TeamMember";
import OwlCarousel from "../assets/lib/owl.carousel-customized/OwlCarousel";
import { Options } from "../assets/lib/owl.carousel-customized/OwlCarousel";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./TeamCarousel.scss";

interface ITeamCarouselProps {
    isLoading: boolean;
    items: IDomainUser[];
}

class TeamCarousel extends React.Component<ITeamCarouselProps> {
    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let owlOptions = this.getOwlCarouselOptions();
        return (
            <section className="team">
                <h3 className="sr-only">Our Team</h3>
                {/* /// TODO: Add loader. */isLoading ? <div>Loading... Please wait.</div> :
                    <OwlCarousel className="team__carousel" {...owlOptions} onRefreshed={this.addTeamMemberHover}>
                        {items.map(teamMember => (
                            <TeamMember key={teamMember.Id} {...teamMember} />
                        ))}
                    </OwlCarousel>
                }
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
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        }
    }

    // Из-за особенностей работы (и недостатков) OwlCarousel, приходится вешать обработчик события наведения мыши здесь.
    addTeamMemberHover(): void {
        if ($) {
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
        } else {
            throw new Error("jQuery '$' is required.");
        }
    }
}

interface IStateProps {
    isLoading: boolean;
    items: IDomainUser[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.teamMembersReducer.teamMembers.isLoading,
        items: state.teamMembersReducer.teamMembers.items
    };
}

export default connect(mapStateToProps, null)(TeamCarousel);