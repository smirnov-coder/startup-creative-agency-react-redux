import * as React from "react";
import "./Nav.scss";

export class Nav extends React.Component {
    render(): JSX.Element {
        return (
            <ul className="custom-nav">
                <li className="custom-nav__item"><a href="#home" className="custom-nav__link">Home</a></li>
                <li className="custom-nav__item"><a href="#services" className="custom-nav__link">Services</a></li>
                <li className="custom-nav__item"><a href="#about" className="custom-nav__link">About</a></li>
                <li className="custom-nav__item"><a href="#works" className="custom-nav__link">Works</a></li>
                <li className="custom-nav__item"><a href="#blog" className="custom-nav__link">Blog</a></li>
                <li className="custom-nav__item"><a href="#clients" className="custom-nav__link">Clients</a></li>
                <li className="custom-nav__item"><a href="#contact" className="custom-nav__link">Contact</a></li>
            </ul>
        );
    }
}