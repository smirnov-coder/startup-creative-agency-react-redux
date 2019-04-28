import * as React from "react";
import { IServiceInfo } from "../store/entities";
import { Service } from "../components/Service";
import { AppState } from "../store/reducers/rootReducer";
import { connect } from "react-redux";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./ServiceList.scss";

interface IServiceListProps {
    isLoading: boolean;
    items: IServiceInfo[];
}

class ServiceList extends React.Component<IServiceListProps> {
    render(): JSX.Element {
        let { isLoading, items } = this.props;
        return (
            <section className="service-list">
                <h3 className="sr-only">Service List</h3>
                {/* /// TODO: Add loader. */isLoading ? <div>Loading... Please wait.</div> : items.map(service => (
                    <div key={service.Id} className="col-md-4 service-list__item">
                        <Service {...service} />
                    </div>
                ))}
            </section>
        );
    }
}

interface IStateProps {
    isLoading: boolean;
    items: IServiceInfo[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.servicesReducer.services.isLoading,
        items: state.servicesReducer.services.items
    };
}

export default connect(mapStateToProps, null)(ServiceList);