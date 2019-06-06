import * as React from "react";
import { Section } from "@components/Home/Section";
import { SectionHeader } from "@components/Home/SectionHeader";
import Dash, { DashModifiers } from "@components/Home/Dash";
import Contacts from "@containers/Home/Contacts";
import ContactForm from "@containers/Home/ContactForm";
import "./ContactSection.scss";

const ContactSection: React.SFC = () => {
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

export default ContactSection;