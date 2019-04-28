import * as React from "react";
import { Section } from "./Section";
import Gallery from "../containers/Gallery";
import "./WorksSection.scss";
import { SectionHeader } from "./SectionHeader";
import { Dash, DashModifiers } from "./Dash";

export class WorksSection extends React.Component {
    render(): JSX.Element {
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
}