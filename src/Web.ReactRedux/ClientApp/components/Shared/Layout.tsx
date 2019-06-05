import * as React from "react";
import findByType from "@scripts/findComponentsByType";
import "./Layout.scss";

type SubcomponentProps = React.PropsWithChildren<{}>;

const Header = (props: SubcomponentProps): JSX.Element => null;
Header.displayName = "Header";

const Sidebar = (props: SubcomponentProps): JSX.Element => null;
Sidebar.displayName = "Sidebar";

const Content = (props: SubcomponentProps): JSX.Element => null;
Content.displayName = "Content";

const Footer = (props: SubcomponentProps): JSX.Element => null;
Footer.displayName = "Footer";

export class Layout extends React.Component {
    static Header: (props: SubcomponentProps) => JSX.Element;
    static Sidebar: (props: SubcomponentProps) => JSX.Element;
    static Content: (props: SubcomponentProps) => JSX.Element;
    static Footer: (props: SubcomponentProps) => JSX.Element;

    renderHeader(): JSX.Element {
        let { children } = this.props;
        let header: React.ReactNode = findByType(children, Header)[0];
        if (!header) {
            return null;
        }
        return (
            <div className="layout__header">{(header as React.ReactElement).props.children}</div>
        );
    }

    renderSidebar(): JSX.Element {
        let { children } = this.props;
        let sidebar: React.ReactNode = findByType(children, Sidebar)[0];
        if (!sidebar) {
            return null;
        }
        return (
            <div className="layout__sidebar">{(sidebar as React.ReactElement).props.children}</div>
        );
    }

    renderContent(): JSX.Element {
        let { children } = this.props;
        let content: React.ReactNode = findByType(children, Content)[0];
        if (!content) {
            return null;
        }
        return (
            <div className="layout__content">{(content as React.ReactElement).props.children}</div>
        );
    }

    renderFooter(): JSX.Element {
        let { children } = this.props;
        let footer: React.ReactNode = findByType(children, Footer)[0];
        if (!footer) {
            return null;
        }
        return (
            <div className="layout__footer">{(footer as React.ReactElement).props.children}</div>
        );
    }

    render(): JSX.Element {
        return (
            <div className="layout">
                {this.renderHeader()}
                <section className="layout__body">
                    {this.renderSidebar()}
                    {this.renderContent()}
                </section>
                {this.renderFooter()}
            </div>
        );
    }
}

Layout.Header = Header;
Layout.Sidebar = Sidebar;
Layout.Content = Content;
Layout.Footer = Footer;

//<nav className="admin-navbar main__nav">
//    <NavMenu />
//</nav>