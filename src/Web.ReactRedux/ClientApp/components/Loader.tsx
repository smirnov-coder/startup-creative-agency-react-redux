import * as React from "react";
import "./Loader.scss";

interface ILoaderProps {
    className?: string;
    modifiers?: string[];
}

export class Loader extends React.Component<ILoaderProps> {
    constructor(props: ILoaderProps) {
        super(props);
    }

    render(): JSX.Element {
        let { className = "", modifiers } = this.props;
        return (
            <div className={`loader ${modifiers ? modifiers.join(" ") : ""} ${className}`}>
                <i className="fa fa-spinner fa-pulse fa-3x"></i>
            </div>
        );
    }
}