import * as React from "react";
//import { Section } from "./Section";
//import { SectionHeader } from "./SectionHeader";
import ServiceList from "@containers/Home/ServiceList";
import "@bootstrap/css";
import "./ServicesSection.scss";
import { SectionHeader } from "../SectionHeader";
import { Section } from "../Section";
import Dash, { DashModifiers } from "../Dash";
//import Dash, { DashModifiers } from "./Dash";

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