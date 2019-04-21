import * as React from "react";
import { ISectionHeaderProps, SectionHeader } from "./SectionHeader";
import "./Section.scss";

export class Section extends React.Component<ISectionHeaderProps> {
    render(): JSX.Element {
        return (
            <section className="section" >
                <div className="container">
                    <SectionHeader {...this.props} />
                    <section className="services-section__content">
                        {this.props.children}
                    </section>
                </div>
            </section>)
    }
}