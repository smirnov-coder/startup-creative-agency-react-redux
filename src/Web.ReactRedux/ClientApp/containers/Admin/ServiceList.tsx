import * as React from "react";
import { ServiceInfo } from "@store/entities";
import { AppState } from "@store/state";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LinkButton } from "@components/Shared/LinkButton";
import { ButtonModifiers } from "@components/Shared/Button";
import { ServiceItem } from "@components/Admin/ServiceItem";
import { deleteService } from "@store/actions/actionCreators";
import "./ServiceList.scss";

type ServiceListProps = StateProps & DispatchProps;

class ServiceList extends React.Component<ServiceListProps> {
    render(): JSX.Element {
        let { items, deleteService } = this.props;
        return (
            <div className="admin-service-list">
                <div className="admin-service-list__items">
                    {items.map(item => (
                        <div key={item.Id} className="admin-service-list__item">
                            <ServiceItem {...item} onDelete={deleteService} />
                        </div>
                    ))}
                </div>
                <LinkButton url="/admin/services/add"
                    className="admin-service-list__add"
                    modifiers={[ButtonModifiers.Size.SMALL]}
                    children="Add New Service" />
            </div>
        );
    }
}

interface StateProps {
    items: ServiceInfo[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        items: state.services.items
    };
}

interface DispatchProps {
    deleteService: (serviceId: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        deleteService: bindActionCreators(deleteService, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);