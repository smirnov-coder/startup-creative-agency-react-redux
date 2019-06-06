import * as React from "react";
import "./Dash.scss";

interface DashModifiers {
    Colors: {
        GREY: string,
        WHITE: string
    }
}

export const DashModifiers: DashModifiers = {
    Colors: {
        GREY: "dash--color-grey",
        WHITE: "dash--color-white"
    }
}

interface DashProps {
    modifiers?: string[];
    className?: string;
}

const Dash: React.SFC<DashProps> = ({ className = "", modifiers, ...restProps }: DashProps) => {
    return <hr className={`dash ${modifiers ? modifiers.join(" ") : ""} ${className}`} {...restProps} />;
}

export default Dash;