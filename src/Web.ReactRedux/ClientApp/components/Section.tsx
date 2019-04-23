import * as React from "react";
import { ISectionHeaderProps, SectionHeader } from "./SectionHeader";
import "./Section.scss";

export class Section extends React.Component<ISectionHeaderProps> {
    renderHeader(): JSX.Element {
        return (

        );
    }

    render(): JSX.Element {
        return (
            <section className="section" >
                <div className="container">
                    <SectionHeader {...this.props} />
                    <section className="section__content">
                        {this.props.children}
                    </section>
                </div>
            </section>
        );
    }
}

export const findByType = (children: React.ReactNodeArray, component: any) => {
    const result: React.ReactNodeArray = [];
    /* This is the array of result since Article can have multiple times the same sub-component */
    const type = [component.displayName] || [component.name];
    /* We can store the actual name of the component through the displayName or name property of our sub-component */
    React.Children.forEach(children, (child: any) => {
        const childType =
            child && child.type && (child.type.displayName || child.type.name);
        if (type.indexOf(childType) !== -1) {
            result.push(child);
        }
    });
    /* Then we go through each React children, if one of matches the name of the sub-component we’re looking for we put it in the result array */
    return result[0];
};