import * as React from "react";
import { Section } from "./Section";
import { ISectionHeaderProps } from "./SectionHeader";
import ServiceList from "./ServiceList";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./ServicesSection.scss";

export class ServicesSection extends React.Component {
    render(): JSX.Element {
        const headerProps: ISectionHeaderProps = {
            mixinClass: "services-section__header",
            title: "Services",
            subtitle: "We offer ipsum dolor sit amet, consetetur sadipscing elitr amet"
        };
        return (
            <section className="services-section" id="services">
                <Section {...headerProps}>
                    <div className="services-section__content row">
                        <ServiceList />
                    </div>
                </Section>
            </section>
        )
    }
}