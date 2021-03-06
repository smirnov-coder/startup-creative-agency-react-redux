﻿import * as React from "react";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Routes } from "@scripts/constants";
import { SocialLink } from "@store/entities";
import { Section } from "@components/Home/Section";
import { SectionHeader } from "@components/Home/SectionHeader";
import Dash, { DashModifiers } from "@components/Home/Dash";
import SocialLinkItem, { SocialLinkModifiers } from "@components/Home/SocialLink";
import { Menu } from "@components/Home/Menu";
import Loader from "@components/Shared/Loader";
import { withLoader } from "@containers/Admin/withLoader";
import { withDataFeed } from "@containers/Admin/withDataFeed";
import "./Footer.scss";

interface FooterProps {
    items: SocialLink[];
}

const Footer: React.SFC<FooterProps> = ({ items }: FooterProps) => {
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
                                <Menu className="footer__socials" modifiers={["menu--style-inline"]}>
                                    {items.map((socialLink, index) => (
                                        <Menu.Item key={index} className="footer__socials-item">
                                            <SocialLinkItem url={socialLink.Url}
                                                icon={icons[socialLink.NetworkName]}
                                                modifiers={[SocialLinkModifiers.Shape.ROUND]} />
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </SectionHeader.Title>
                            <SectionHeader.Separator>
                                <Dash modifiers={[DashModifiers.Colors.WHITE]} />
                            </SectionHeader.Separator>
                            <SectionHeader.Subtitle>
                                <p className="footer__copyright">
                                    &copy; 2015-{new Date().getFullYear()} Startup.
                                    Designed by ShapedTheme. Programmed by Yury Smirnov.
                                </p>
                                <Link to={Routes.MY_PROFILE} className="footer__link">Manage Site</Link>
                            </SectionHeader.Subtitle>
                        </SectionHeader>
                    </div>
                </Section.Header>
            </Section>
        </div>
    );
}

const FooterLoader = () => <Loader modifiers={["loader--color-white"]} />;

const composed = compose(
    withLoader(FooterLoader, state => state.contacts.isLoading),
    withDataFeed(state => state.contacts.socialLinks, "items")
);

export default composed(Footer);