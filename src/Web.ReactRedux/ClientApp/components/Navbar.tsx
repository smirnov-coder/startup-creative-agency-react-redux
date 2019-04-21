import * as React from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./Navbar.scss";

export class Navbar extends React.Component {
    render(): JSX.Element {
        return (
            <nav className="custom-navbar custom-navbar--position-fixed-top">
                <div className="container">
                    <div className="custom-navbar__content">
                        <div className="custom-navbar__static">
                            <div className="custom-navbar__logo">
                                <Logo />
                            </div>
                            <button type="button" className="custom-navbar__toggler" data-toggle="collapse" data-target="#custom-navbar-collapse">
                                <i className="fa fa-bars fa-2x"></i>
                            </button>
                        </div>
                        <div className="custom-navbar__collapse collapse" id="custom-navbar-collapse">
                            <div className="custom-navbar__nav">
                                <Nav />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}