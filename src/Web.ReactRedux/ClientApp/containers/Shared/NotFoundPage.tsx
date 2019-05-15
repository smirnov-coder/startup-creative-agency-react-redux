import * as React from "react";
import { connect } from "react-redux";
import "./NotFoundPage.scss";
import { Layout } from "../../components/Shared/Layout";
import { AdminHeader } from "../../components/Shared/AdminHeader";
import { AdminFooter } from "../../components/Shared/AdminFooter";
import { AppState } from "../../store/state";
import { Dispatch, bindActionCreators } from "redux";
import { getNotFoundPageModel } from "../../store/actions/actionCreators";

type NotFoundPageProps = StateProps & DispatchProps;

export class NotFoundPage extends React.Component<NotFoundPageProps> {
    componentWillMount(): void {
        this.props.getPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Page Not Found";
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
                        <h1 className="error-info__title">Error 404</h1>
                        <h2 className="error-info__subtitle">Page Not Found</h2>
                        <p className="error-info__description">The page you are looking for doesn't exist at this location.</p>
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
        getPageModel: bindActionCreators(getNotFoundPageModel, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);