import * as React from "react";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { AboutUs } from "./AboutUs";
import TeamCarousel from "../containers/TeamCarousel";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./AboutSection.scss";
import { Dash, DashColors } from "./Dash";

export class AboutSection extends React.Component {
    render(): JSX.Element {
        return (
            <section className="about-section" id="about">
                <Section>
                    <Section.Header>
                        <SectionHeader>
                            <SectionHeader.Title>
                                About us
                            </SectionHeader.Title>
                            <SectionHeader.Separator>
                                <Dash color={DashColors.GREY} />
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
            </section>
        );
    }
}


