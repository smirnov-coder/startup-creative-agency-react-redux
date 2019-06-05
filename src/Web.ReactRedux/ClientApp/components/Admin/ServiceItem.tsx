import * as React from "react";
import { ServiceInfo } from "@store/entities";
import { ListItem } from "./ListItem";
import LinkButton from "@components/Shared/LinkButton";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import "./ServiceItem.scss";
import { getDateTimeString, getUserInfoString, concretizeRoute } from "@scripts/utils";
import { Routes } from "@scripts/constants";
import { deleteService } from "@store/actions/servicesActions";
import { withDeleteHandler } from "@containers/Admin/withDeleteHandler";

interface ServiceItemProps {
    item: ServiceInfo;
    onDelete: (serviceId: number) => void;
}

class ServiceItem extends React.Component<ServiceItemProps> {
    constructor(props: ServiceItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(): JSX.Element {
        let { Id, IconClass, Caption, Description, CreatedOn, CreatedBy, LastUpdatedOn, LastUpdatedBy } = this.props.item;
        let url: string = concretizeRoute(Routes.EDIT_SERVICE, ":id", Id);
        return (
            <div className="service-item">
                <ListItem>
                    <ListItem.Header>
                        Service, ID: <span className="service-item__id">{Id}</span>
                    </ListItem.Header>
                    <ListItem.Content>
                        <div className="service-item__icon">
                            <i className={IconClass}></i>
                        </div>
                        <div className="service-item__info">
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Caption: </span>
                                <span className="service-item__caption">{Caption}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Description: </span>
                                <span className="service-item__description">{Description}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Created on </span>
                                <span className="service-item__created-on">{getDateTimeString(CreatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="service-item__created-by">{getUserInfoString(CreatedBy)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Last updated on </span>
                                <span className="service-item__last-updated-on">{getDateTimeString(LastUpdatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="service-item__last-updated-by">{getUserInfoString(LastUpdatedBy)}</span>
                            </p>
                        </div>
                    </ListItem.Content>
                    <ListItem.Footer>
                        <LinkButton url={url}
                            className="service-item__edit"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children="Edit" />
                        <Button className="service-item__delete"
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

export default withDeleteHandler(deleteService)(ServiceItem);