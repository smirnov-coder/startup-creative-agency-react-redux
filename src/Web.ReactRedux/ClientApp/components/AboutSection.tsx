import * as React from "react";
import { Section } from "./Section";
import { ISectionHeaderProps } from "./SectionHeader";
import { AboutUs } from "./AboutUs";
import TeamCarousel from "../containers/TeamCarousel";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./AboutSection.scss";

export class AboutSection extends React.Component {
    render(): JSX.Element {
        const headerProps: ISectionHeaderProps = {
            mixinClass: "about-section__header",
            title: "About us",
            subtitle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr amet"
        };
        return (
            <section className="about-section" id="about">
                <Section {...headerProps}>
                    <div className="about-section__content">
                        <div className="about-section__text row">
                            <AboutUs />
                        </div>
                        <div className="about-section__carousel">
                            <TeamCarousel />
                        </div>
                    </div>
                </Section>
            </section>
        );
    }
}


