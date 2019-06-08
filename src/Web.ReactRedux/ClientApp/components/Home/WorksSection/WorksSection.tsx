import * as React from "react";
import { Section } from "@components/Home/Section";
import { SectionHeader } from "@components/Home/SectionHeader";
import Dash, { DashModifiers } from "@components/Home/Dash";
import Gallery from "@containers/Home/Gallery";
import "./WorksSection.scss";

const WorksSection: React.SFC = () => {
    return (
        <div className="works-section" id="works">
            <Section>
                <Section.Header>
                    <SectionHeader>
                        <SectionHeader.Title>
                            Latest works
                        </SectionHeader.Title>
                        <SectionHeader.Separator>
                            <Dash modifiers={[DashModifiers.Colors.GREY]} />
                        </SectionHeader.Separator>
                    </SectionHeader>
                </Section.Header>
                <Section.Content>
                    <div className="works-section__content">
                        <Gallery />
                    </div>
                </Section.Content>
            </Section>
        </div>
    );
}

export default WorksSection;