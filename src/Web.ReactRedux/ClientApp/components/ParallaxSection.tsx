import * as React from "react";

export class ParallaxSection extends React.Component {
    render(): JSX.Element {
        return (
            <section className="parallax-section">
                <h2 className="sr-only">Cooperation Invitation</h2>
                <div className="parallax-section__overlay">
                    <div className="section container">
                        <h3 className="parallax-section__title">
                            Do you like <span className="text-nowrap">OUR WORK</span> <span className="text-nowrap">so far?</span><br />
                            Let's talk about <span className="text-nowrap">YOUR PROJECT</span>!
                        </h3>
                        <a href="#contact" className="parallax-section__button button button--color-white button--border-thick">
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}