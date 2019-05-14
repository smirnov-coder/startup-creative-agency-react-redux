import * as React from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import "../../assets/lib/bootstrap-customized/css/bootstrap.css";
import "../../assets/lib/bootstrap-customized/js/bootstrap";
import "./Navbar.scss";

interface NavbarProps {
    containerRef: React.RefObject<HTMLElement>;
}

export class Navbar extends React.Component<NavbarProps> {
    constructor(props: NavbarProps) {
        super(props);
    }

    private navbarCollapse = React.createRef<HTMLDivElement>();

    componentDidMount(): void {
        if (!$) {
            throw new Error("jQuery '$' is required.");
        }

        let $navbar = $(this.props.containerRef.current);
        let $navbarCollapse = $(this.navbarCollapse.current);
        let prevScrollpos = window.pageYOffset; // Предыдущее значение прокрутки.

        window.addEventListener("scroll", () => {
            let currentScrollPos = window.pageYOffset; // Текущее значение прокрутки.
            // Если скролим вверх, то:
            if (prevScrollpos > currentScrollPos) {
                // Показать навбар.
                $navbar.css("top", "0");
            } else {
                // Иначе, если скролим вниз, то скрыть навбар.
                $navbar.css("top", "-" + $navbar.css("height"));
                // Если панель меню была развёрнута, свернуть её.
                $navbarCollapse.collapse("hide");
            }
            prevScrollpos = currentScrollPos;
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