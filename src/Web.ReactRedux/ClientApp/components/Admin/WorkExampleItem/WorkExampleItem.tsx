﻿import * as React from "react";
import { WorkExample } from "@store/entities";
import { Routes } from "@scripts/constants";
import { concretizeRoute, getDateTimeString, getUserInfoString } from "@scripts/utils";
import { deleteWorkExample } from "@store/actions";
import { ListItem } from "@components/Admin/ListItem";
import LinkButton from "@components/Shared/LinkButton";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import { withDeleteHandler } from "@containers/Admin/withDeleteHandler";
import "./WorkExampleItem.scss";

interface WorkExampleItemProps {
    item: WorkExample;
    onView: (id: number) => void;
    onDelete: (id: number) => void;
}

class WorkExampleItem extends React.Component<WorkExampleItemProps> {
    constructor(props: WorkExampleItemProps) {
        super(props);
        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    render(): JSX.Element {
        let { Id, Category, Name, ImagePath, Description, CreatedOn, CreatedBy, LastUpdatedOn, LastUpdatedBy } = this.props.item;
        let url: string = concretizeRoute(Routes.EDIT_WORK_EXAMPLE, ":id", Id);
        return (
            <div className="work-example-item">
                <ListItem>
                    <ListItem.Header>
                        Work Example, ID: <span className="work-example-item__id">{Id}</span>
                    </ListItem.Header>
                    <ListItem.Content>
                        <img src={ImagePath} alt={Name} className="work-example-item__img" />
                        <div className="work-example-item__info">
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Name: </span>
                                <span className="work-example-item__name">{Name}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Category: </span>
                                <span className="work-example-item__category">{Category}</span>
                            </p>
                            <p className="list-item__content-line list-item__content-line--crop-with-dots">
                                <span className="list-item__content-line-heading">Description: </span>
                                <span className="work-example-item__description">{Description}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Created on </span>
                                <span className="work-example-item__created-on">{getDateTimeString(CreatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="work-example-item__created-by">{getUserInfoString(CreatedBy)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Last updated on </span>
                                <span className="work-example-item__last-updated-on">{getDateTimeString(LastUpdatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="work-example-item__last-updated-by">{getUserInfoString(LastUpdatedBy)}</span>
                            </p>
                        </div>
                    </ListItem.Content>
                    <ListItem.Footer>
                        <Button className="work-example-item__view"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            onClick={this.handleViewClick}
                            children="View" />
                        <LinkButton url={url}
                            className="work-example-item__edit"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children="Edit" />
                        <Button className="work-example-item__delete"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            onClick={this.handleDeleteClick}
                            children="Delete" />
                    </ListItem.Footer>
                </ListItem>
            </div>
        );
    }

    handleViewClick(event: React.MouseEvent): void {
        event.preventDefault();
        this.props.onView(this.props.item.Id);
    }

    handleDeleteClick(event: React.MouseEvent): void {
        event.preventDefault();
        if (confirm("Are you sure you want to proceed?")) {
            this.props.onDelete(this.props.item.Id);
        }
    }
}

export default withDeleteHandler(deleteWorkExample)(WorkExampleItem);