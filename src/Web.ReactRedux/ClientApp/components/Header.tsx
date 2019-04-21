import * as React from "react";
import { Navbar } from "./Navbar";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./Header.scss";

export class Header extends React.Component {
    render(): JSX.Element {
        return (
            <header className="header" id="home">
                <div className="header__top-content">
                    <Navbar />
                </div>
                <section className="header__center-content container">
                    <h1 className="header__title">Welcome To Startup</h1>
                    <h2 className="header__subtitle">Your Favourite Creative Agency Template</h2>
                    <a href="#services" className="button button--color-white button--border-thick header__button">Get Started</a>
                </section>
            </header>
        );
    }
}