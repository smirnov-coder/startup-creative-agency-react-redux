import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getPageModel } from "../store/actions/actionCreators";
import { IServiceInfo, IDomainUser, IWorkExample, IBlogPost, IBrand, ITestimonial, IContactInfo, ISocialLink } from "../store/entities";
import { Header } from "../components/Header";
import { ServicesSection } from "../components/ServicesSection";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./HomePage.scss";
import { AboutSection } from "../components/AboutSection";
import { WorksSection } from "../components/WorksSection";
import { ParallaxSection } from "../components/ParallaxSection";
import { BlogSection } from "../components/BlogSection";
import { ClientsSection } from "../components/ClientsSection";
import { ContactSection } from "../components/ContactSection";
import Footer from "./Footer";

export interface IHomePageModel {
    services: IServiceInfo[];
    teamMembers: IDomainUser[];
    works: IWorkExample[];
    blogPosts: IBlogPost[];
    brands: IBrand[];
    testimonials: ITestimonial[];
    contacts: IContactInfo[];
    socialLinks: ISocialLink[];
}

export interface IHomePageProps {
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
                <div className="body__line">
                    <BlogSection />
                </div>
                <div className="body__line">
                    <ClientsSection />
                </div>
                <div className="body__line">
                    <ContactSection />
                </div>
                <div className="body__line">
                    <Footer />
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

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        getPageModel: bindActionCreators(getPageModel, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(HomePage);