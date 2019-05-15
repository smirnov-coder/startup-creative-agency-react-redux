﻿import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { getLoginPageModel } from "../../store/actions/actionCreators";
import LoginForm from "./LoginForm";
import { Layout } from "../../components/Shared/Layout";
import { AdminFooter } from "../../components/Shared/AdminFooter";
import { AdminHeader } from "../../components/Shared/AdminHeader";
import { AppState } from "../../store/state";

type LoginPageProps = StateProps & DispatchProps;

export class LoginPage extends React.Component<LoginPageProps> {
    componentWillMount(): void {
        this.props.getPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Login";
    }

    render(): JSX.Element {
        let { isAuthenticated } = this.props; //console.log("login page isAuth", isAuthenticated);//
        return (
            <Layout>
                <Layout.Header>
                    <AdminHeader isAuthenticated={isAuthenticated} />
                </Layout.Header>
                <Layout.Content>
                    <LoginForm />
                </Layout.Content>
                <Layout.Footer>
                    <AdminFooter />
                </Layout.Footer>
            </Layout>
        );
    }   
}

interface StateProps {
    isAuthenticated: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
    //console.log("login page state", state);//
    return {
        isAuthenticated: state.auth.isAuthenticated
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