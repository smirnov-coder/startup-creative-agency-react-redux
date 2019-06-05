import * as React from "react";
import "./Section.scss";
import findByType from "@scripts/findComponentsByType";

type SubcomponentProps = React.PropsWithChildren<{}>;

const SectionHeader = (props: SubcomponentProps): JSX.Element => null;
SectionHeader.displayName = "SectionHeader";

const SectionContent = (props: SubcomponentProps): JSX.Element => null;
SectionContent.displayName = "SectionContent";

export class Section extends React.Component {
    static Header: (props: SubcomponentProps) => JSX.Element;
    static Content: (props: SubcomponentProps) => JSX.Element;

    renderHeader(): JSX.Element {
        let { children } = this.props;
        const header: React.ReactNode = findByType(children, SectionHeader)[0];
        if (!header) {
            return null;
        }
        return <div className="section__header">{(header as React.ReactElement).props.children}</div>;
    }

    renderContent(): JSX.Element {
        let { children } = this.props;
        const content: React.ReactNode = findByType(children, SectionContent)[0];
        if (!content) {
            return null;
        }
        return <div className="section__content">{(content as React.ReactElement).props.children}</div>;
    }

    render(): JSX.Element {
        return (
            <section className="section">
                <div className="container">
                    {this.renderHeader()}
                    {this.renderContent()}
                </div>
            </section>
        );
    }
}

Section.Header = SectionHeader;
Section.Content = SectionContent;