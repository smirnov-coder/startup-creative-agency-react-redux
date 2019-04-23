import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ServicesActions } from "../store/actions/actions";
import { getPageModel } from "../store/actions/actionCreators";
import { IServiceInfo, IDomainUser, IWorkExample } from "../store/entities";
import { Header } from "../components/Header";
import { ServicesSection } from "../components/ServicesSection";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./HomePage.scss";
import { AboutSection } from "../components/AboutSection";
import { WorksSection } from "../components/WorksSection";
import { ParallaxSection } from "../components/ParallaxSection";

export interface IHomePageModel {
    services: IServiceInfo[];
    teamMembers: IDomainUser[];
    works: IWorkExample[];
}

export interface IHomePageProps {
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
        return (
            <div className="body">
                <div className="body__line">
                    <Header />
                </div>
                <div className="body__line">
                    <ServicesSection />
                </div>
                <div className="body__line">
                    <AboutSection />
                </div>
                <div className="body__line">
                    <WorksSection />
                </div>
                <div className="body__line">
                    <ParallaxSection />
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