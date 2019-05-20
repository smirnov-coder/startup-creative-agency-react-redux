import * as React from "react";
import { AppState } from "@store/state";
import { bindActionCreators, Dispatch } from "redux";
import { getServicesPageModel } from "@store/actions/actionCreators";
import { connect } from "react-redux";
import Loader from "@components/Shared/Loader";
import PageContent from "@components/Admin/PageContent";
import ServiceList from "./ServiceList";

type ServicesPageProps = StateProps & DispatchProps;

class ServicesPage extends React.Component<ServicesPageProps> {
    componentWillMount(): void {
        this.props.getPageModel();
    }

    render(): JSX.Element {
        let { isLoading } = this.props; //console.log("page props", this.props);//
        return (isLoading
            ? <Loader />
            : <PageContent caption="Service List">
                <ServiceList />
              </PageContent>
        );
    }
}

interface StateProps {
    isLoading: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.services.isLoading
    };
}

interface DispatchProps {
    getPageModel: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getPageModel: bindActionCreators(getServicesPageModel, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPage);