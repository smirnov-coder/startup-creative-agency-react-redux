import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ServicesActions } from "../store/actions/actions";
import { getPageModel } from "../store/actions/actionCreators";
import { IServiceInfo } from "../store/entities";
import { Header } from "./Header";
import { ServicesSection } from "./ServicesSection";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./HomePage.scss";

export interface IHomePageModel {
    services: IServiceInfo[];
}

export interface IHomePageProps {
    //isLoading: boolean;
    //services: IServiceInfo[];
    //teamMembers: IDomainUser[];
    //works: IWorkExample[];
    //blog: IBlogPost[];
    //brands: IBrand[];
    //testimonials: ITestimonial[];
    //contacts: IContactInfo[];
    //socialLinks: ISocialLink[];

    getPageModel: () => void;
}

class HomePage extends React.Component<IHomePageProps> {
    componentDidMount(): void {
        this.props.getPageModel();
    }

    render(): JSX.Element {
        //const { isLoading, services } = this.props; //console.log(this.props, "home page");
        return (
            <div className="body">
                <div className="body__line">
                    <Header />
                </div>
                <div className="body__line">
                    <ServicesSection />
                    {/*<ServicesSection isLoading={isLoading} services={services} />*/}
                </div>
            </div>
        );
    }
}

//interface IStateProps {
//    isLoading: boolean;
//    services: IServiceInfo[];
//    //teamMembers: IDomainUser[];
//    //works: IWorkExample[];
//    //blog: IBlogPost[];
//    //brands: IBrand[];
//    //testimonials: ITestimonial[];
//    //contacts: IContactInfo[];
//    //socialLinks: ISocialLink[];
//}

//const mapStateToProps = (state: AppState): IStateProps => {
//    return {
//        isLoading: state.servicesReducer.services.isLoading, 

//        services: state.servicesReducer.services.items
//    };
//}

interface IDispatchProps {
    getPageModel: () => void
}

const mapDispatchToProps = (dispatch: Dispatch<ServicesActions>): IDispatchProps => {
    return {
        getPageModel: bindActionCreators(getPageModel, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(HomePage);