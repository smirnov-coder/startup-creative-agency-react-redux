import * as React from "react";
import { Section } from "../components/Section";
import { SectionHeader } from "../components/SectionHeader";
import { Dash, DashColors } from "../components/Dash";
import { ISocialLink } from "../store/entities";
import { AppState } from "../store/reducers/rootReducer";
import { connect } from "react-redux";
import { SocialLink, SocialLinkShapes } from "../components/SocialLink";
import "./Footer.scss";

interface IFooterProps {
    isLoading: boolean;
    items: ISocialLink[];
}

class Footer extends React.Component<IFooterProps> {
    constructor(props: IFooterProps) {
        super(props);
    }

    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let icons: any = {
            Facebook: "fa fa-facebook",
            Twitter: "fa fa-twitter",
            GooglePlus: "fa fa-google-plus",
            Linkedin: "fa fa-linkedin"
        };
        return (
            <div className="footer">
                <Section>
                    <Section.Header>
                        <div className="footer__content">
                            <SectionHeader>
                                <SectionHeader.Title>
                                    {isLoading ? <div>Loading... Please wait.</div> :
                                        <ul className="menu menu--style-inline footer__socials">
                                            {items.map(socialLink => (
                                                <li key={socialLink.NetworkName} className="menu__item footer__socials-item">
                                                    <SocialLink icon={icons[socialLink.NetworkName]}
                                                        shape={SocialLinkShapes.CIRCLE}
                                                        url={socialLink.Url} />
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </SectionHeader.Title>
                                <SectionHeader.Separator>
                                    <Dash color={DashColors.WHITE} />
                                </SectionHeader.Separator>
                                <SectionHeader.Subtitle>
                                    <p className="footer__copyright">
                                        &copy; 2015-{new Date().getFullYear()} Startup. 
                                        Designed by ShapedTheme. Programmed by Yury Smirnov.
                                    </p>
                                </SectionHeader.Subtitle>
                            </SectionHeader>
                        </div>
                    </Section.Header>
                </Section>
            </div>
        );
    }
}

interface IStateProps {
    isLoading: boolean;
    items: ISocialLink[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.socialLinksReducer.socialLinks.isLoading,
        items: state.socialLinksReducer.socialLinks.items
    };
}

export default connect(mapStateToProps, null)(Footer);