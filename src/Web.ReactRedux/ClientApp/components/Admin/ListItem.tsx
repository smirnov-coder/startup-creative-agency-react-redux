import * as React from "react";
import findByType from "@scripts/findComponentsByType";
import "@bootstrap/css";
import "./ListItem.scss";

type SubcomponentProps = React.PropsWithChildren<{}>;

const Header = (props: SubcomponentProps): JSX.Element => null;
Header.displayName = "Header";

const Content = (props: SubcomponentProps): JSX.Element => null;
Content.displayName = "Content";

const Footer = (props: SubcomponentProps): JSX.Element => null;
Footer.displayName = "Footer";

export class ListItem extends React.Component {
    static Header: (props: SubcomponentProps) => JSX.Element;
    static Content: (props: SubcomponentProps) => JSX.Element;
    static Footer: (props: SubcomponentProps) => JSX.Element;

    renderHeader(): JSX.Element {
        let { children } = this.props;
        let header: React.ReactNode = findByType(children, Header)[0];
        if (!header) {
            return null;
        }
        return (
            <div className="list-item__header panel-heading">{(header as React.ReactElement).props.children}</div>
        );
    }

    renderContent(): JSX.Element {
        let { children } = this.props;
        let content: React.ReactNode = findByType(children, Content)[0];
        if (!content) {
            return null;
        }
        return (
            <div className="list-item__content panel-body">{(content as React.ReactElement).props.children}</div>
        );
    }

    renderFooter(): JSX.Element {
        let { children } = this.props;
        let footer: React.ReactNode = findByType(children, Footer)[0];
        if (!footer) {
            return null;
        }
        return (
            <div className="list-item__footer panel-footer">{(footer as React.ReactElement).props.children}</div>
        );
    }

    render(): JSX.Element {
        return (
            <div className="list-item panel panel-default">
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderFooter()}
            </div>
        );
    }
}

ListItem.Header = Header;
ListItem.Content = Content;
ListItem.Footer = Footer;