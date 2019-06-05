import * as React from "react";
import "./Testimonial.scss";

interface TestimonialProps {
    Text: string;
    Author: string;
    Company: string;
}

const Testimonial: React.SFC<TestimonialProps> = ({ Text, Author, Company }: TestimonialProps) => {
    return (
        <article className="testimonial">
            <p className="testimonial__text">{Text}</p>
            <h4 className="testimonial__author">{`${Author}, ${Company}`}</h4>
        </article>
    );
}

export default Testimonial;