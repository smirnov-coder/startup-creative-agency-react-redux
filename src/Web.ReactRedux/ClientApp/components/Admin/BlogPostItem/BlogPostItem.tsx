import * as React from "react";
import { BlogPost } from "@store/entities";
import { Routes } from "@scripts/constants";
import { deleteBlogPost } from "@store/actions";
import { concretizeRoute, getDateTimeString, getUserInfoString } from "@scripts/utils";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import { ListItem } from "@components/Admin/ListItem";
import LinkButton from "@components/Shared/LinkButton";
import { withDeleteHandler } from "@containers/Admin/withDeleteHandler";
import "./BlogPostItem.scss";

interface BlogPostItemProps {
    item: BlogPost;
    onView: (id: number) => void;
    onDelete: (id: number) => void;
}

class BlogPostItem extends React.Component<BlogPostItemProps> {
    constructor(props: BlogPostItemProps) {
        super(props);
        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    render(): JSX.Element {
        let { Id, Category, Title, ImagePath, Content, CreatedOn, CreatedBy, LastUpdatedOn, LastUpdatedBy } = this.props.item;
        let url: string = concretizeRoute(Routes.EDIT_BLOG_POST, ":id", Id);
        return (
            <div className="blog-post-item">
                <ListItem>
                    <ListItem.Header>
                        Blog Post, ID: <span className="blog-post-item__id">{Id}</span>
                    </ListItem.Header>
                    <ListItem.Content>
                        <img src={ImagePath} alt={Title} className="blog-post-item__img" />
                        <div className="blog-post-item__info">
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Title: </span>
                                <span className="blog-post-item__title">{Title}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Category: </span>
                                <span className="blog-post-item__category">{Category}</span>
                            </p>
                            <p className="list-item__content-line list-item__content-line--crop-with-dots">
                                <span className="list-item__content-line-heading">Content: </span>
                                <span className="blog-post-item__content">{Content}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Created on </span>
                                <span className="blog-post-item__created-on">{getDateTimeString(CreatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="blog-post-item__created-by">{getUserInfoString(CreatedBy)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Last updated on </span>
                                <span className="blog-post-item__last-updated-on">{getDateTimeString(LastUpdatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="blog-post-item__last-updated-by">{getUserInfoString(LastUpdatedBy)}</span>
                            </p>
                        </div>
                    </ListItem.Content>
                    <ListItem.Footer>
                        <Button className="blog-post-item__view"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            onClick={this.handleViewClick}
                            children="View" />
                        <LinkButton url={url}
                            className="blog-post-item__edit"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children="Edit" />
                        <Button className="blog-post-item__delete"
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

export default withDeleteHandler(deleteBlogPost)(BlogPostItem);