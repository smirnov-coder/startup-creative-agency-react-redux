import * as React from "react";
import { Brand } from "@store/entities";
import { Routes } from "@scripts/constants";
import { deleteBrand } from "@store/actions";
import { getUserInfoString, getDateTimeString, concretizeRoute } from "@scripts/utils";
import { ListItem } from "@components/Admin/ListItem";
import LinkButton from "@components/Shared/LinkButton";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import { withDeleteHandler } from "@containers/Admin/withDeleteHandler";
import "./BrandItem.scss";

interface BrandItemProps {
    item: Brand;
    onDelete: (id: number) => void;
}

class BrandItem extends React.Component<BrandItemProps> {
    constructor(props: BrandItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(): JSX.Element {
        let { Id, Name, ImagePath, CreatedOn, CreatedBy, LastUpdatedOn, LastUpdatedBy } = this.props.item;
        let url: string = concretizeRoute(Routes.EDIT_BRAND, ":id", Id);
        return (
            <div className="brand-item">
                <ListItem>
                    <ListItem.Header>
                        Brand, ID: <span className="brand-item__id">{Id}</span>
                    </ListItem.Header>
                    <ListItem.Content>
                        <img src={ImagePath} alt={Name} className="brand-item__img" />
                        <div className="brand-item__info">
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Name: </span>
                                <span className="brand-item__name">{Name}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Created on </span>
                                <span className="brand-item__created-on">{getDateTimeString(CreatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="brand-item__created-by">{getUserInfoString(CreatedBy)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Last updated on </span>
                                <span className="brand-item__last-updated-on">{getDateTimeString(LastUpdatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="brand-item__last-updated-by">{getUserInfoString(LastUpdatedBy)}</span>
                            </p>
                        </div>
                    </ListItem.Content>
                    <ListItem.Footer>
                        <LinkButton url={url}
                            className="brand-item__edit"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children="Edit" />
                        <Button className="brand-item__delete"
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

export default withDeleteHandler(deleteBrand)(BrandItem);