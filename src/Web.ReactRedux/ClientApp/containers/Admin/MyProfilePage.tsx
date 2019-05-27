import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import UserProfileForm from "./UserProfileForm";
import { AppState } from "@store/state";
import PageContent from "@components/Admin/PageContent";
import Loader from "@components/Shared/Loader";
import { fetchMe } from "@store/actions/usersActions";

type MyProfilePageProps = StateProps & DispatchProps;

class MyProfilePage extends React.Component<MyProfilePageProps> {
    componentWillMount(): void {
        this.props.initPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Admin My Profile";
    }

    render(): JSX.Element {
        return (this.props.isLoading
            ? <Loader />
            : <PageContent caption="My Profile">
                <UserProfileForm />
              </PageContent>
        );
    }   
}

interface StateProps {
    isLoading: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.users.isLoading,
    };
}

interface DispatchProps {
    initPageModel: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        initPageModel: bindActionCreators(fetchMe, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);