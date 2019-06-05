import * as React from "react";
import { DomainUser } from "@store/entities";
import { concretizeRoute, getDateTimeString, getUserInfoString } from "@scripts/utils";
import { ListItem } from "@components/Admin/ListItem";
import { Routes } from "@scripts/constants";
import LinkButton from "@components/Shared/LinkButton";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import "./UserItem.scss";
import { Dispatch, bindActionCreators } from "redux";
import { updateDisplayStatus, deleteUser } from "@store/actions/usersActions";
import { connect } from "react-redux";
import { AppState } from "@store/state";

interface ComponentProps {
    item: DomainUser;
    isAdmin: boolean;
    isManagePage: boolean;
}

type UserItemProps = ComponentProps & StateProps & DispatchProps;

interface UserItemState {
    userName: string;
    isDisplayed: boolean;
}

class UserItem extends React.Component<UserItemProps, UserItemState> {
    constructor(props: UserItemProps) {
        super(props);
        let { Identity, Profile } = this.props.item;
        this.state = {
            userName: Identity.UserName,
            isDisplayed: Profile.DisplayAsTeamMember
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    render(): JSX.Element {
        let { Identity, Profile, CreatedOn, CreatedBy, LastUpdatedOn, } = this.props.item;
        let { isAdmin, isManagePage, currentUserName } = this.props;
        let url: string = concretizeRoute(Routes.MANAGE_USER, ":userName", Identity.UserName);
        let photoClass = `user-item__photo ${Profile.PhotoFilePath ? "" : "user-item__photo--hidden"}`;
        return (
            <div className="user-item">
                <ListItem>
                    <ListItem.Header>
                        <span className="user-item__user-name">{`@${Identity.UserName}`}</span>
                    </ListItem.Header>
                    <ListItem.Content>
                        <div className="user-item__photo-holder">
                            <img src={Profile.PhotoFilePath} alt={Identity.UserName} className={photoClass} />
                        </div>
                        <div className="user-item__info">
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">First Name: </span>
                                <span className="user-item__first-name">{this.getValue(Profile.FirstName)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Last Name: </span>
                                <span className="user-item__last-name">{this.getValue(Profile.LastName)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Job Position: </span>
                                <span className="user-item__job">{this.getValue(Profile.JobPosition)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Registered on </span>
                                <span className="user-item__registered-on">{getDateTimeString(CreatedOn)}</span>
                                <span className="list-item__content-line-heading"> By </span>
                                <span className="user-item__registered-by">{getUserInfoString(CreatedBy)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Last updated on </span>
                                <span className="user-item__last-updated-on">{getDateTimeString(LastUpdatedOn)}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Ready for display: </span>
                                <span className="user-item__ready">{Profile.IsReadyForDisplay ? "Yes" : "No"}</span>
                            </p>
                            <p className="list-item__content-line">
                                <span className="list-item__content-line-heading">Displayed on home page: </span>
                                <span className="user-item__displayed">{Profile.DisplayAsTeamMember ? "Yes" : "No"}</span>
                            </p>
                        </div>
                    </ListItem.Content>
                    {!isAdmin ? null :
                        <ListItem.Footer>
                            {isManagePage
                                ? <form className="user-item__form">
                                    <div className="form-check user-item__checkbox">
                                        <input id="DisplayAsTeamMember"
                                            className="user-item__is-displayed form-check-input"
                                            type="checkbox"
                                            checked={this.state.isDisplayed}
                                            onChange={this.handleChange} />
                                        <label htmlFor="DisplayAsTeamMember" className="user-item__checkbox-label">
                                            Display as Team Member
                                        </label>
                                    </div>
                                    <Button className="user-item__update"
                                        modifiers={[ButtonModifiers.Size.SMALL]}
                                        onClick={this.handleUpdateClick}
                                        children="Update" />
                                    {currentUserName === Identity.UserName ? null : 
                                        <Button className="user-item__delete"
                                            modifiers={[ButtonModifiers.Size.SMALL]}
                                            onClick={this.handleDeleteClick}
                                            children="Delete" />
                                    }
                                  </form>
                                : <LinkButton url={url}
                                    className="user-item__edit"
                                    modifiers={[ButtonModifiers.Size.SMALL]}
                                    children="Manage" />
                            }
                        </ListItem.Footer>
                    }
                </ListItem>
            </div>

        );
    }

    getValue(source: string): string {
        return source ? source : "--NotSet--";
    }

    handleChange(event: React.ChangeEvent): void {
        this.setState({
            isDisplayed: (event.target as HTMLInputElement).checked
        });
    }

    handleUpdateClick(): void {
        let { userName, isDisplayed } = this.state;
        this.props.onUpdateDisplayStatus(userName, isDisplayed);
    }

    handleDeleteClick(): void {
        if (confirm("Are you sure you want to proceed?")) {
            this.props.onDelete(this.state.userName);
        }
    }
}

interface StateProps {
    currentUserName: string;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        currentUserName: state.auth.userName
    };
}

interface DispatchProps {
    onUpdateDisplayStatus: (userName: string, isDisplayed: boolean) => void;
    onDelete: (userName: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onUpdateDisplayStatus: bindActionCreators(updateDisplayStatus, dispatch),
        onDelete: bindActionCreators(deleteUser, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);