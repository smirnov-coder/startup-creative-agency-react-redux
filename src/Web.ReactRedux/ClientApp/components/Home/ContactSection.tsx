import * as React from "react";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { Dash, DashModifiers } from "./Dash";
import Contacts from "../../containers/Home/Contacts";
import "./ContactSection.scss";
import ContactForm from "../../containers/Home/ContactForm";

export class ContactSection extends React.Component {
    render(): JSX.Element {
        return (
            <div className="contact-section" id="contact">
                <Section>
                    <Section.Header>
                        <SectionHeader>
                            <SectionHeader.Title>
                                Get in touch
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
                        <div className="contact-section__content row">
                            <div className="contact-section__contacts col-sm-4">
                                <Contacts />
                            </div>
                            <div className="contact-section__contact-form col-sm-8">
                                <ContactForm />
                            </div>
                        </div>
                    </Section.Content>
                </Section>
            </div>
        );
    }
}