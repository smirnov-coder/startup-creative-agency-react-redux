import * as React from "react";
import { Section } from "@components/Home/Section";
import { SectionHeader } from "@components/Home/SectionHeader";
import { Dash, DashModifiers } from "@components/Home/Dash";
import { SocialLink as SocialLinkEntity } from "@store/entities";
import { connect } from "react-redux";
import { SocialLink, SocialLinkModifiers } from "@components/Home/SocialLink";
import "./Footer.scss";
import { Menu } from "@components/Home/Menu";
import { AppState } from "@store/state";
import Loader from "@components/Shared/Loader";

type FooterProps = StateProps;

class Footer extends React.Component<FooterProps> {
    constructor(props: FooterProps) {
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
                                    {isLoading ? <Loader modifiers={["loader--color-white"]} /> :
                                        <Menu className="footer__socials" modifiers={["menu--style-inline"]}>
                                            {items.map(socialLink => (
                                                <Menu.Item key={socialLink.NetworkName} className="footer__socials-item">
                                                    <SocialLink
                                                        icon={icons[socialLink.NetworkName]}
                                                        modifiers={[SocialLinkModifiers.Shape.ROUND]}
                                                        url={socialLink.Url} />
                                                </Menu.Item>
                                            ))}
                                        </Menu>
                                    }
                                </SectionHeader.Title>
                                <SectionHeader.Separator>
                                    <Dash modifiers={[DashModifiers.Colors.WHITE]} />
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

interface StateProps {
    isLoading: boolean;
    items: SocialLinkEntity[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.socialLinks.isLoading,
        items: state.socialLinks.items
    };
}

export default connect(mapStateToProps, null)(Footer);