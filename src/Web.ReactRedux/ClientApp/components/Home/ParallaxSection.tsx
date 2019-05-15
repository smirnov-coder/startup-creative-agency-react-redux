import * as React from "react";
import { Section } from "./Section";
import { ButtonModifiers } from "./Button";
import "../../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./ParallaxSection.scss";
import smoothScroll from "../../scripts/smoothScroll";
import { LinkButton } from "./LinkButton";

export class ParallaxSection extends React.Component {
    render(): JSX.Element {
        let buttonModifiers: string[] = [
            ButtonModifiers.Color.WHITE,
            ButtonModifiers.Border.THICK
        ];
        return (
            <section className="parallax-section">
                <h2 className="sr-only">Cooperation Invitation</h2>
                <div className="parallax-section__overlay">
                    <Section>
                        <Section.Content>
                            <h3 className="parallax-section__title">
                                Do you like <span className="text-nowrap">OUR WORK</span> <span className="text-nowrap">so far?</span><br />
                                Let's talk about <span className="text-nowrap">YOUR PROJECT</span>!
                            </h3>
                            <LinkButton url="#contact"
                                className="parallax-section__button"
                                modifiers={buttonModifiers}
                                children="Get in Touch"
                                onClick={this.handleClick} />
                        </Section.Content>
                    </Section>
                </div>
            </section>
        );
    }

    handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        let hash: string = (event.target as HTMLAnchorElement).hash;
        smoothScroll(hash, "html, body");
    }
}