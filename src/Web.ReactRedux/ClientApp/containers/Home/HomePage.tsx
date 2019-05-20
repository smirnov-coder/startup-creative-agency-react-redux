import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getHomePageModel } from "@store/actions/actionCreators";
import { ServiceInfo, DomainUser, WorkExample, BlogPost, Brand, Testimonial, ContactInfo, SocialLink } from "@store/entities";
import { Header } from "@components/Home/Header";
import { ServicesSection } from "@components/Home/ServicesSection";
import "@bootstrap/css";
import "./HomePage.scss";
import { AboutSection } from "@components/Home/AboutSection";
import { WorksSection } from "@components/Home/WorksSection";
import { ParallaxSection } from "@components/Home/ParallaxSection";
import { BlogSection } from "@components/Home/BlogSection";
import { ClientsSection } from "@components/Home/ClientsSection";
import { ContactSection } from "@components/Home/ContactSection";
import Footer from "./Footer";

export interface HomePageModel {
    services: ServiceInfo[];
    teamMembers: DomainUser[];
    works: WorkExample[];
    blogPosts: BlogPost[];
    brands: Brand[];
    testimonials: Testimonial[];
    contacts: ContactInfo[];
    socialLinks: SocialLink[];
}

type HomePageProps = DispatchProps;

class HomePage extends React.Component<HomePageProps> {
    constructor(props: HomePageProps) {
        super(props);
    }

    componentWillMount(): void {
        this.props.getPageModel();
    }

    componentDidMount(): void {
        document.title = "Startup ReactRedux Home";
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

interface DispatchProps {
    getPageModel: () => void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getPageModel: bindActionCreators(getHomePageModel, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(HomePage);