import * as React from "react";
import { IButtonProps } from "./Button";
import "./Button.scss";

interface IFilterButtonProps extends IButtonProps {
    dataFilter: string;
}

export class FilterButton extends React.Component<IFilterButtonProps> {
    constructor(props: IFilterButtonProps) {
        super(props);
    }

    render(): JSX.Element {
        let { className, children, modifiers, dataFilter, onClick } = this.props;
        return (
            <button className={`button ${modifiers.join(" ")} ${className}`} data-filter={dataFilter}
                onClick={(e) => onClick(e)}>
                {children}
            </button>
        );
    }
}