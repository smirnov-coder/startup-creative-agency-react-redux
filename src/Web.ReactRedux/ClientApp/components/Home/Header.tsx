import * as React from "react";
import { Navbar } from "./Navbar";
import "../../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./Header.scss";
import smoothScroll from "../../scripts/smoothScroll";
import { LinkButton } from "@components/Shared/LinkButton";
import { ButtonModifiers } from "@components/Shared/Button";

export class Header extends React.Component {
    private navbar = React.createRef<HTMLElement>();
    private centerContent = React.createRef<HTMLElement>();

    componentDidMount(): void {
        if (!$) {
            throw new Error("jQuery '$' is required.");
        }
        // Добавить отступ сверху величиной высоты навбара, чтобы
        // центрировать по вертикали содержимое шапки.
        let navbarHeight = $(this.navbar.current).css("height");
        $(this.centerContent.current).css("padding-top", navbarHeight);
    }

    render(): JSX.Element {
        let buttonModifiers: string[] = [
            ButtonModifiers.Color.WHITE,
            ButtonModifiers.Border.THICK
        ];
        return (
            <header className="header" id="home">
                <div className="header__top-content">
                    <Navbar containerRef={this.navbar} />
                </div>
                <section ref={this.centerContent} className="header__center-content container">
                    <h1 className="header__title">Welcome To Startup</h1>
                    <h2 className="header__subtitle">Your Favourite Creative Agency Template</h2>
                    <LinkButton url="#services" className="header__button" modifiers={buttonModifiers}
                        onClick={this.handleClick} children="Get Started" />
                </section>
            </header>
        );
    }

    handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        let hash = (event.target as HTMLAnchorElement).hash;
        smoothScroll(hash, "html, body");
    }
}