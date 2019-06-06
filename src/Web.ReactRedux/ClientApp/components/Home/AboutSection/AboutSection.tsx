import * as React from "react";
import { Section } from "@components/Home/Section";
import { SectionHeader } from "@components/Home/SectionHeader";
import Dash, { DashModifiers } from "@components/Home/Dash";
import AboutUs from "@components/Home/AboutUs";
import TeamCarousel from "@containers/Home/TeamCarousel";
import "@bootstrap/css";
import "./AboutSection.scss";

const AboutSection: React.SFC = () => {
    return (
        <div className="about-section" id="about">
            <Section>
                <Section.Header>
                    <SectionHeader>
                        <SectionHeader.Title>
                            About us
                        </SectionHeader.Title>
                        <SectionHeader.Separator>
                            <Dash modifiers={[DashModifiers.Colors.GREY]} />
                        </SectionHeader.Separator>
                        <SectionHeader.Subtitle>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr amet
                        </SectionHeader.Subtitle>
                    </SectionHeader>
                </Section.Header>
                <Section.Content>
                    <div className="about-section__content">
                        <div className="about-section__text row">
                            <AboutUs />
                        </div>
                        <div className="about-section__carousel">
                            <TeamCarousel />
                        </div>
                    </div>
                </Section.Content>
            </Section>
        </div>
    );
}

export default AboutSection;