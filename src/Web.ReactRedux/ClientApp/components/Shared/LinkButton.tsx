import * as React from "react";
import "./Button.scss";
import { ButtonProps } from "./Button";
import { Link } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
    url: string;
}

const LinkButton: React.SFC<LinkButtonProps> = ({ url, className = "", modifiers, ...restProps }: LinkButtonProps) => {
    return (
        <Link to={url} className={`button ${modifiers ? modifiers.join(" ") : ""} ${className}`} {...restProps} />
    );
}

export default LinkButton;