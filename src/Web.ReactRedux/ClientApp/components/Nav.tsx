import * as React from "react";
import "./Nav.scss";
import smoothScroll from "../scripts/smoothScroll";

export class Nav extends React.Component {
    render(): JSX.Element {
        return (
            <ul className="custom-nav">
                <li className="custom-nav__item">
                    <a href="#home" className="custom-nav__link" onClick={this.handleClick}>Home</a>
                </li>
                <li className="custom-nav__item">
                    <a href="#services" className="custom-nav__link" onClick={this.handleClick}>Services</a>
                </li>
                <li className="custom-nav__item">
                    <a href="#about" className="custom-nav__link" onClick={this.handleClick}>About</a>
                </li>
                <li className="custom-nav__item">
                    <a href="#works" className="custom-nav__link" onClick={this.handleClick}>Works</a>
                </li>
                <li className="custom-nav__item">
                    <a href="#blog" className="custom-nav__link" onClick={this.handleClick}>Blog</a>
                </li>
                <li className="custom-nav__item">
                    <a href="#clients" className="custom-nav__link" onClick={this.handleClick}>Clients</a>
                </li>
                <li className="custom-nav__item">
                    <a href="#contact" className="custom-nav__link" onClick={this.handleClick}>Contact</a>
                </li>
            </ul>
        );
    }

    handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        let hash = (event.target as HTMLAnchorElement).hash;
        smoothScroll(hash, "html, body");
    }
}