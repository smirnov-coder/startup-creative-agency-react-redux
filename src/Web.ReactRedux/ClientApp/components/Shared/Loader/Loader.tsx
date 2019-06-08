import * as React from "react";
import "./Loader.scss";

interface LoaderProps {
    className?: string;
    modifiers?: string[];
}

const Loader: React.SFC<LoaderProps> = ({ className = "", modifiers }: LoaderProps) => {
    return (
        <div className={`loader ${modifiers ? modifiers.join(" ") : ""} ${className}`}>
            <i className="fa fa-spinner fa-pulse fa-3x"></i>
        </div>
    );
}

export default Loader;