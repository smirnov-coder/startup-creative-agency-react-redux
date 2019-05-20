import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { getLoginPageModel } from "@store/actions/actionCreators";
import { AppState } from "@store/state";
import LoginForm from "./LoginForm";
import Loader from "@components/Shared/Loader";

type LoginPageProps = StateProps & DispatchProps;

export class LoginPage extends React.Component<LoginPageProps> {
    componentWillMount(): void {
        this.props.getPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Auth Login";
    }

    render(): JSX.Element {
        return (this.props.isLoading
            ? <Loader modifiers={["loader--color-white"]} />
            : <LoginForm />
        );
    }   
}

interface StateProps {
    isLoading: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.auth.isLoading
    };
}

interface DispatchProps {
    getPageModel: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getPageModel: bindActionCreators(getLoginPageModel, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);