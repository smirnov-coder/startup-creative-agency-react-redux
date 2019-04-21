import * as React from "react";
import { Dash, DashColors } from "./Dash";
import "./SectionHeader.scss";

export interface ISectionHeaderProps {
    mixinClass?: string;
    title: string;
    subtitle?: string;
}

export class SectionHeader extends React.Component<ISectionHeaderProps> {
    render(): JSX.Element {
        const { mixinClass, title, subtitle } = this.props;
        return (
            <header className={`section-header ${mixinClass}`}>
                <h2 className="section-header__title">{title}</h2>
                <div className="section-header__separator">
                    <Dash color={DashColors.GREY} />
                </div>
                {subtitle ? <h3 className="section-header__subtitle">{subtitle}</h3> : null}
            </header>
        )
    }
}