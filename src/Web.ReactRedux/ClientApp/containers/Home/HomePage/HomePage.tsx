import * as React from "react";
import { compose } from "redux";
import { fetchHomePageModel } from "@store/actions";
import { Header } from "@components/Home/Header";
import ServicesSection from "@components/Home/ServicesSection";
import AboutSection from "@components/Home/AboutSection";
import WorksSection from "@components/Home/WorksSection";
import { ParallaxSection } from "@components/Home/ParallaxSection";
import BlogSection from "@components/Home/BlogSection";
import ClientsSection from "@components/Home/ClientsSection";
import ContactSection from "@components/Home/ContactSection";
import Footer from "@containers/Home/Footer";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import { withInitializer } from "@containers/Admin/withInitializer";
import "@bootstrap/css";
import "./HomePage.scss";

const HomePage: React.SFC = () => {
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

const composed = compose(
    withDocumentTitle("Startup ReactRedux Home"),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchHomePageModel)
);

export default composed(HomePage);