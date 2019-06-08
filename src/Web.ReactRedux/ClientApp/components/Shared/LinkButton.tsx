import * as React from "react";
import { Link } from "react-router-dom";
import { ButtonProps } from "@components/Shared/Button";
import "@components/Shared/Button/Button.scss";

interface LinkButtonProps extends ButtonProps {
    url: string;
}

const LinkButton: React.SFC<LinkButtonProps> = ({ url, className = "", modifiers, ...restProps }: LinkButtonProps) => {
    return (
        <Link to={url} className={`button ${modifiers ? modifiers.join(" ") : ""} ${className}`} {...restProps} />
    );
}

export default LinkButton;