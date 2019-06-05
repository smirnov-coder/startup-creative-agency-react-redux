import * as React from "react";
import "./SectionHeader.scss";
import findByType from "../../scripts/findComponentsByType";

type SubcomponentProps = React.PropsWithChildren<{}>

const SectionHeaderTitle = (props: SubcomponentProps): JSX.Element => null;
SectionHeaderTitle.displayName = "SectionHeaderTitle";

const SectionHeaderSeparator = (props: SubcomponentProps): JSX.Element => null;
SectionHeaderSeparator.displayName = "SectionHeaderSeparator";

const SectionHeaderSubtitle = (props: SubcomponentProps): JSX.Element => null;
SectionHeaderSubtitle.displayName = "SectionHeaderSubtitle";

export class SectionHeader extends React.Component {
    static Title: (props: SubcomponentProps) => JSX.Element;
    static Subtitle: (props: SubcomponentProps) => JSX.Element;
    static Separator: (props: SubcomponentProps) => JSX.Element;

    renderTitle(): JSX.Element {
        let { children } = this.props;
        const title: React.ReactNode = findByType(children, SectionHeaderTitle)[0];
        if (!title) {
            return null;
        }
        return (
            <h2 className="section-header__title">{(title as React.ReactElement).props.children}</h2>
        );
    }

    renderSeparator(): JSX.Element {
        let { children } = this.props;
        const separator: React.ReactNode = findByType(children, SectionHeaderSeparator)[0];
        if (!separator) {
            return null;
        }
        return (
            <div className="section-header__separator">{(separator as React.ReactElement).props.children}</div>
        );
    }

    renderSubtitle(): JSX.Element {
        let { children } = this.props;
        const subtitle: React.ReactNode = findByType(children, SectionHeaderSubtitle)[0];
        if (!subtitle) {
            return null;
        }
        return (
            <h3 className="section-header__subtitle">{(subtitle as React.ReactElement).props.children}</h3>
        );
    }

    render(): JSX.Element {
        return (
            <header className="section-header">
                {this.renderTitle()}
                {this.renderSeparator()}
                {this.renderSubtitle()}
            </header>
        );
    }
}

SectionHeader.Title = SectionHeaderTitle;
SectionHeader.Subtitle = SectionHeaderSubtitle;
SectionHeader.Separator = SectionHeaderSeparator;