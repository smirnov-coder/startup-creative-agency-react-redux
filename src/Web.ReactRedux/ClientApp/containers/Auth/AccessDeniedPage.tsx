import * as React from "react";
import { connect } from "react-redux";
import { Layout } from "../../components/Shared/Layout";
import { AdminHeader } from "../../components/Shared/AdminHeader";
import { AdminFooter } from "../../components/Shared/AdminFooter";
import "../Shared/NotFoundPage.scss";
import { AppState } from "../../store/state";
import { bindActionCreators, Dispatch } from "redux";
import { getAccessDeniedPageModel } from "../../store/actions/actionCreators";

type AccessDeniedPageProps = StateProps & DispatchProps;

export class AccessDeniedPage extends React.Component<AccessDeniedPageProps> {
    componentWillMount(): void {
        this.props.getPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Access Denied";
    }

    render(): JSX.Element {
        let { isAuthenticated } = this.props;
        return (
            <Layout>
                <Layout.Header>
                    <AdminHeader isAuthenticated={isAuthenticated} />
                </Layout.Header>
                <Layout.Content>
                    <div className="error-info">
                        <h1 className="error-info__title">Error 403</h1>
                        <h2 className="error-info__subtitle">Access denied.</h2>
                        <p className="error-info__description">You are not authorized for this operation.</p>
                    </div>
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
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

interface DispatchProps {
    getPageModel: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getPageModel: bindActionCreators(getAccessDeniedPageModel, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessDeniedPage);