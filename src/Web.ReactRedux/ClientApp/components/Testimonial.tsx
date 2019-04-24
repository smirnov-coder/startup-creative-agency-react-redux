import * as React from "react";
import { ITestimonial } from "../store/entities";
import "./Testimonial.scss";

export class Testimonial extends React.Component<ITestimonial> {
    render(): JSX.Element {
        let { Text, Author, Company } = this.props;
        return (
            <article className="testimonial">
                <p className="testimonial__text">{Text}</p>
                <h4 className="testimonial__author">
                    {`${Author}, ${Company}`}
                </h4>
            </article>
        );
    }
}