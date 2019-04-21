import * as React from "react";
import { connect } from "react-redux";
import "../components/HomePage.scss";
import "../lib/bootstrap-customized/css/bootstrap.css";
import { bindActionCreators, Dispatch } from "redux";
import IServiceInfo from "../entities/IServiceInfo";
import { AppState } from "../store/reducers/rootReducer";
import { ServicesActions } from "../store/actions/actions";
import { getServices } from "../store/actions/actionCreators";

interface IHomePageProps {
    isFetching: boolean;
    services: IServiceInfo[];
    getServices: () => void;
}

class HomePage extends React.Component<IHomePageProps> {
    componentDidMount(): void {
        this.props.getServices();
    }
    
    render() {
        return (
            <div className="body">
                {
                    this.props.isFetching ? "Loading... Please wait." : `Services count: ${this.props.services.length}`
                }
            </div>
        );
    }
}

interface IStateProps {
    isFetching: boolean;
    services: IServiceInfo[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isFetching: state.servicesReducer.services.isFetching,
        services: state.servicesReducer.services.items
    };
}

interface IDispatchProps {
    getServices: () => void
}

const mapDispatchToProps = (dispatch: Dispatch<ServicesActions>): IDispatchProps => {
    return {
        getServices: bindActionCreators(getServices, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);