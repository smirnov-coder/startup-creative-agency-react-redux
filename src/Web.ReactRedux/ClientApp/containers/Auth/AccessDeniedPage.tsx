import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAccessDeniedPageModel } from "@store/actions/actionCreators";
import ErrorPage from "@components/Shared/ErrorPage";

type AccessDeniedPageProps = DispatchProps;

export class AccessDeniedPage extends React.Component<AccessDeniedPageProps> {
    componentWillMount(): void {
        this.props.getPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Access Denied";
    }

    render(): JSX.Element {
        return <ErrorPage title="Error 403" subtitle="Access denied." description="You are not authorized for this operation." />
    }
}

interface DispatchProps {
    getPageModel: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getPageModel: bindActionCreators(getAccessDeniedPageModel, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(AccessDeniedPage);