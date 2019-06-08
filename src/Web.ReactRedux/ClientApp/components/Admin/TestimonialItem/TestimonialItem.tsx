import * as React from "react";
import { Testimonial } from "@store/entities";
import { Routes } from "@scripts/constants";
import { concretizeRoute, getDateTimeString, getUserInfoString } from "@scripts/utils";
import { ListItem } from "@components/Admin/ListItem";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import LinkButton from "@components/Shared/LinkButton";
import { withDeleteHandler } from "@containers/Admin/withDeleteHandler";
import { deleteTestimonial } from "@store/actions";
import "./TestimonialItem.scss";

interface TestimonialItemProps {
    item: Testimonial;
    onDelete: (id: number) => void;
}

class TestimonialItem extends React.Component<TestimonialItemProps> {
    constructor(props: TestimonialItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(): JSX.Element {
        let { Id, Author, Company, Text, CreatedOn, CreatedBy, LastUpdatedOn, LastUpdatedBy } = this.props.item;
        let url: string = concretizeRoute(Routes.EDIT_TESTIMONIAL, ":id", Id);
        return (
            <div className="testimonial-item">
                <ListItem>
                    <ListItem.Header>
                        Testimonial, ID: <span className="testimonial-item__id">{Id}</span>
                    </ListItem.Header>
                    <ListItem.Content>
                        <div className="testimonial-item__info">
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Author: </span>
                                <span className="testimonial-item__author">{Author}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Company: </span>
                                <span className="testimonial-item__company">{Company}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Text: </span>
                                <span className="testimonial-item__text">{Text}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Created on </span>
                                <span className="testimonial-item__created-on">{getDateTimeString(CreatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="testimonial-item__created-by">{getUserInfoString(CreatedBy)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Last updated on </span>
                                <span className="testimonial-item__last-updated-on">{getDateTimeString(LastUpdatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="testimonial-item__last-updated-by">{getUserInfoString(LastUpdatedBy)}</span>
                            </p>
                        </div>
                    </ListItem.Content>
                    <ListItem.Footer>
                        <LinkButton url={url}
                            className="testimonial-item__edit"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children="Edit" />
                        <Button className="testimonial-item__delete"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            onClick={this.handleClick}
                            children="Delete" />
                    </ListItem.Footer>
                </ListItem>
            </div>

        );
    }

    handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        if (confirm("Are you sure you want to proceed?")) {
            this.props.onDelete(this.props.item.Id);
        }
    }
}

export default withDeleteHandler(deleteTestimonial)(TestimonialItem);