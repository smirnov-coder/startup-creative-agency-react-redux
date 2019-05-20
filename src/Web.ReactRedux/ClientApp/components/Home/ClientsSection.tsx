import * as React from "react";
import { Section } from "./Section";
import BrandsCarousel from "../../containers/Home/BrandsCarousel";
import TestimonialsSlider from "../../containers/Home/TestimonialsSlider";
import "./ClientsSection.scss";

export class ClientsSection extends React.Component {
    render(): JSX.Element {
        return (
            <section className="clients-section" id="clients">
                <h2 className="sr-only">Our Happy Clients</h2>
                <Section>
                    <Section.Content>
                        <section className="clients-section__brands">
                            <h3 className="sr-only">Brands</h3>
                            <BrandsCarousel />
                        </section>
                        <section className="clients-section__testimonials">
                            <h3 className="sr-only">Testimonials</h3>
                            <TestimonialsSlider />
                        </section>
                    </Section.Content>
                </Section>
            </section>
        );
    } 
}