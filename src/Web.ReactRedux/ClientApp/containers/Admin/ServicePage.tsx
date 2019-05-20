import * as React from "react";
import { ServiceInfo } from "@store/entities";
import { AppState } from "@store/state";
import { Dispatch, bindActionCreators } from "redux";
import { getAddServicePageModel, getEditServicePageModel, addService, updateService } from "@store/actions/actionCreators";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Loader from "@components/Shared/Loader";
import PageContent from "@components/Admin/PageContent";
import { ServiceItemForm } from "./ServiceItemForm";

type ServicePageProps = StateProps & DispatchProps & RouteComponentProps

interface ServicePageState {
    caption: string;
    item: ServiceInfo;
    getPageModel: () => void;
    handleSubmit: (formData: FormData) => void;
}

class ServicePage extends React.Component<ServicePageProps, ServicePageState> {
    constructor(props: ServicePageProps) {
        super(props);
        let { match } = this.props; //console.log("service page props", this.props);//
        switch (match.path.toLowerCase()) {
            case "/admin/services/add":
                this.state = {
                    caption: "Add Service",
                    item: {} as ServiceInfo,
                    getPageModel: () => this.props.getAddServicePageModel(),
                    handleSubmit: this.props.addService
                };
                break;

            case "/admin/services/edit/:id":
                let id: number = (match.params as any).id;
                this.state = {
                    caption: `Edit Service, ID: ${id}`,
                    item: {} as ServiceInfo,
                    getPageModel: () => this.props.getEditServicePageModel(id),
                    handleSubmit: (formData: FormData) => this.props.updateService(id, formData)
                };
                break;

            default:
                throw new Error("Unknown location.");
        }
    }

    componentWillMount(): void {
        this.state.getPageModel();
    }

    componentWillReceiveProps(nextProps: ServicePageProps): void {
        if (nextProps.match.path.toLocaleLowerCase() === "/admin/services/add") {
            this.setState({
                item: {} as ServiceInfo
            });
        } else {
            this.setState({
                item: nextProps.item
            });
        }
    }

    render(): JSX.Element {
        return (this.props.isLoading
            ? <Loader />
            : <PageContent caption={this.state.caption}>
                <ServiceItemForm {...this.state.item} onSubmit={this.state.handleSubmit} />
              </PageContent>
        );
    }
}

interface StateProps {
    isLoading: boolean;
    item: ServiceInfo;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.services.isLoading,
        item: state.services.current
    };
}

interface DispatchProps {
    getAddServicePageModel: () => void;
    getEditServicePageModel: (serviceId: number) => void;
    addService: (formData: FormData) => void;
    updateService: (formData: FormData) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getAddServicePageModel: bindActionCreators(getAddServicePageModel, dispatch),
        getEditServicePageModel: bindActionCreators(getEditServicePageModel, dispatch),
        addService: bindActionCreators(addService, dispatch),
        updateService: bindActionCreators(updateService, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);