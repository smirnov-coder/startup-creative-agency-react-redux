import * as React from "react";
import { ServiceInfo } from "@store/entities";
import { Service } from "@components/Home/Service";
import { connect } from "react-redux";
import "@bootstrap/css";
import "./ServiceList.scss";
import { AppState } from "@store/state";
import Loader from "@components/Shared/Loader";

type ServiceListProps = StateProps;

class ServiceList extends React.Component<ServiceListProps> {
    constructor(props: ServiceListProps) {
        super(props);
    }

    render(): JSX.Element {
        let { isLoading, items } = this.props;
        return (
            <section className="service-list">
                <h3 className="sr-only">Service List</h3>
                {isLoading ? <Loader /> : items.map(service => (
                    <div key={service.Id} className="col-md-4 service-list__item">
                        <Service {...service} />
                    </div>
                ))}
            </section>
        );
    }
}

interface StateProps {
    isLoading: boolean;
    items: ServiceInfo[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.services.isLoading,
        items: state.services.items
    };
}

export default connect(mapStateToProps, null)(ServiceList);