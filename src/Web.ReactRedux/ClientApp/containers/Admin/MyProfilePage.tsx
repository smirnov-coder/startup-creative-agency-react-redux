import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { getMyProfilePageModel } from "@store/actions/actionCreators";
import { DomainUser } from "@store/entities";
import UserProfileForm from "./UserProfileForm";
import { AppState } from "@store/state";
import PageContent from "@components/Admin/PageContent";
import Loader from "@components/Shared/Loader";

export interface MyProfilePageModel {
    userWidget: {
        userName: string,
        photo: string
    };
    user: DomainUser;
    isAdmin: boolean;
    newMessagesCount: number;
}

type MyProfilePageProps = StateProps & DispatchProps;

class MyProfilePage extends React.Component<MyProfilePageProps> {
    componentWillMount(): void {
        this.props.getPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Admin My Profile";
    }

    render(): JSX.Element {
        let { isLoading, user } = this.props; //console.log("page props", this.props);//
        return (isLoading || !user
            ? <Loader />
            : <PageContent caption="My Profile">
                <UserProfileForm />
              </PageContent>
        );
    }   
}

interface StateProps {
    isLoading: boolean;
    user: DomainUser;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.users.isLoading,
        user: state.users.current
    };
}

interface DispatchProps {
    getPageModel: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getPageModel: bindActionCreators(getMyProfilePageModel, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);