import * as React from "react";
import { Section } from "@components/Home/Section";
import { SectionHeader } from "@components/Home/SectionHeader";
import Dash, { DashModifiers } from "@components/Home/Dash";
import ServiceList from "@containers/Home/ServiceList";
import "@bootstrap/css";
import "./ServicesSection.scss";

const ServicesSection: React.SFC = () => {
    return (
        <div className="services-section" id="services">
            <Section>
                <Section.Header>
                    <SectionHeader>
                        <SectionHeader.Title>
                            Services
                        </SectionHeader.Title>
                        <SectionHeader.Separator>
                            <Dash modifiers={[DashModifiers.Colors.GREY]} />
                        </SectionHeader.Separator>
                        <SectionHeader.Subtitle>
                            We offer ipsum dolor sit amet, consetetur sadipscing elitr amet
                        </SectionHeader.Subtitle>
                    </SectionHeader>
                </Section.Header>
                <Section.Content>
                    <div className="services-section__content">
                        <ServiceList />
                    </div>
                </Section.Content>
            </Section>
        </div>
    );
}

export default ServicesSection;