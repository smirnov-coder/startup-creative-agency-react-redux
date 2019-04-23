import * as React from "react";
import { ISectionHeaderProps } from "./SectionHeader";
import { Section } from "./Section";
import Gallery from "../containers/Gallery";
import "./WorksSection.scss";

export class WorksSection extends React.Component {
    render(): JSX.Element {
        const headerProps: ISectionHeaderProps = {
            mixinClass: "works-section__header",
            title: "Latest works",
        };
        return (
            <section className="works-section" id="works">
                <Section {...headerProps}>
                    <div className="works-section__content">
                        <Gallery />
                    </div>
                </Section>
            </section>
        );
    }
}