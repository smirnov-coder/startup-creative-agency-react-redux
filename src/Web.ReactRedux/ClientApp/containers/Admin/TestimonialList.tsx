import * as React from "react";
import { Testimonial } from "@store/entities";
import { Routes } from "@scripts/constants";
import LinkButton from "@components/Shared/LinkButton";
import { ButtonModifiers } from "@components/Shared/Button";
import "./TestimonialList.scss";
import TestimonialItem from "@components/Admin/TestimonialItem";

interface TestimonialListProps {
    items: Testimonial[];
}

const TestimonialList: React.SFC<TestimonialListProps> = ({ items }: TestimonialListProps) => {
    return (
        <div className="testimonial-list">
            <div className="testimonial-list__items">
                {items.map((item, index) => (
                    <div key={index} className="testimonial-list__item">
                        <TestimonialItem item={item} />
                    </div>
                ))}
            </div>
            <LinkButton url={Routes.ADD_TESTIMONIAL}
                className="testimonial-list__add"
                modifiers={[ButtonModifiers.Size.SMALL]}
                children="Add New Testimonial" />
        </div>
    );
}

export default TestimonialList;