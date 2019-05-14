import * as React from "react";
import { Testimonial as TestimonialEntity } from "../../store/entities";
import "./Testimonial.scss";

type TestimonialProps = TestimonialEntity;

export class Testimonial extends React.Component<TestimonialProps> {
    constructor(props: TestimonialProps) {
        super(props);
    }

    render(): JSX.Element {
        let { Text, Author, Company } = this.props;
        return (
            <article className="testimonial">
                <p className="testimonial__text">{Text}</p>
                <h4 className="testimonial__author">{`${Author}, ${Company}`}</h4>
            </article>
        );
    }
}