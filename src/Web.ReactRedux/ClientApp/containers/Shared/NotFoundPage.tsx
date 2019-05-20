import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { getNotFoundPageModel } from "@store/actions/actionCreators";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import { AdminFooter } from "@components/Shared/AdminFooter";
import ErrorPage from "@components/Shared/ErrorPage";

type NotFoundPageProps = DispatchProps;

export class NotFoundPage extends React.Component<NotFoundPageProps> {
    componentWillMount(): void {
        this.props.getPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Page Not Found";
    }

    render(): JSX.Element {
        return (
            <Layout>
                <Layout.Header>
                    <AdminHeader />
                </Layout.Header>
                <Layout.Content>
                    <ErrorPage title="Error 404" subtitle="Page Not Found"
                        description="The page you are looking for doesn't exist at this location." />
                </Layout.Content>
                <Layout.Footer>
                    <AdminFooter />
                </Layout.Footer>
            </Layout>
        );
    }
}

interface DispatchProps {
    getPageModel: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getPageModel: bindActionCreators(getNotFoundPageModel, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(NotFoundPage);