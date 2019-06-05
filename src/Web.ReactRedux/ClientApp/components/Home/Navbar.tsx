import * as React from "react";
import { Nav } from "./Nav";
import "@bootstrap/css";
import "@bootstrap/js";
import "./Navbar.scss";
import * as $ from "jquery";
import Logo from "@components/Shared/Logo";

interface NavbarProps {
    containerRef: React.RefObject<HTMLElement>;
}

export class Navbar extends React.Component<NavbarProps> {
    private navbarCollapse = React.createRef<HTMLDivElement>();

    componentDidMount(): void {
        let $navbar = $(this.props.containerRef.current);
        let $navbarCollapse = $(this.navbarCollapse.current);
        let prevScrollPosition = window.pageYOffset; // Предыдущее значение прокрутки.

        window.addEventListener("scroll", () => {
            let currentScrollPosition = window.pageYOffset; // Текущее значение прокрутки.
            // Если скролим вверх, то:
            if (prevScrollPosition > currentScrollPosition) {
                // Показать навбар.
                $navbar.css("top", "0");
            } else {
                // Иначе, если скролим вниз, то скрыть навбар.
                $navbar.css("top", "-" + $navbar.css("height"));
                // Если панель меню была развёрнута, свернуть её.
                $navbarCollapse.collapse("hide");
            }
            prevScrollPosition = currentScrollPosition;
        });

        // Немного подредактируем поведение по умолчанию раскрываемой панели.
        // При переходе к разрешению <768px, панель автоматически сворачивается.
        window.addEventListener("resize", () => {
            if (window.matchMedia("(max-width: 767px)").matches) {
                $navbarCollapse.removeClass("in");
            };
            if (window.matchMedia("(min-width: 768px)").matches) {
                $navbarCollapse.addClass("in");
            };
        });
    }

    render(): JSX.Element {
        let { containerRef } = this.props;
        return (
            <nav ref={containerRef} className="custom-navbar custom-navbar--position-fixed-top">
                <div className="container">
                    <div className="custom-navbar__content">
                        <div className="custom-navbar__static">
                            <div className="custom-navbar__logo">
                                <Logo />
                            </div>
                            <button type="button" className="custom-navbar__toggler" data-toggle="collapse"
                                data-target="#custom-navbar-collapse">
                                <i className="fa fa-bars fa-2x"></i>
                            </button>
                        </div>
                        <div ref={this.navbarCollapse} className="custom-navbar__collapse collapse"
                            id="custom-navbar-collapse">
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