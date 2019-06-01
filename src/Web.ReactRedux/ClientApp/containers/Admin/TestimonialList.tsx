import * as React from "react";
import { Testimonial } from "@store/entities";
import { AppState } from "@store/state";
import { Dispatch, bindActionCreators } from "redux";
import { deleteTestimonial } from "@store/actions/testimonialsActions";
import { connect } from "react-redux";
import { Routes } from "@scripts/constants";
import { LinkButton } from "@components/Shared/LinkButton";
import { ButtonModifiers } from "@components/Shared/Button";
import "./TestimonialList.scss";
import { TestimonialItem } from "@components/Admin/TestimonialItem";

type TestimonialListProps = StateProps & DispatchProps;

class TestimonialList extends React.Component<TestimonialListProps> {
    render(): JSX.Element {
        let { items, deleteTestimonial } = this.props;
        return (
            <div className="testimonial-list">
                <div className="testimonial-list__items">
                    {items.map(item => (
                        <div key={item.Id} className="testimonial-list__item">
                            <TestimonialItem {...item} onDelete={deleteTestimonial} />
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
}

interface StateProps {
    items: Testimonial[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        items: state.testimonials.items
    };
}

interface DispatchProps {
    deleteTestimonial: (testimonialId: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        deleteTestimonial: bindActionCreators(deleteTestimonial, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestimonialList);