import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, compose } from "redux";
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
import { fetchHomePageModel } from "@store/actions/appActions";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import { RouteComponentProps } from "react-router";

type HomePageProps = RouteComponentProps;

class HomePage extends React.Component<HomePageProps> {

    //componentWillMount(): void {
    //    this.props.getPageModel();
    //}

    //componentDidMount(): void {
    //    document.title = "Startup ReactRedux Home";
    //}

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

//interface DispatchProps {
//    getPageModel: () => void
//}

//const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
//    return {
//        getPageModel: bindActionCreators(fetchHomePageModel, dispatch)
//    };
//}

const composed = compose(
    withDocumentTitle("Startup ReactRedux Home"),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchHomePageModel)
);

export default composed(HomePage);

//export default connect(null, mapDispatchToProps)(HomePage);