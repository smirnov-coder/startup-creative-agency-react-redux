import * as React from "react";
import "./Dash.scss";

interface IDashProps {
    size?: string;
    color?: string;
}

export interface IDashColors {
    GREY: string;
    WHITE: string;
}

export const DashColors: IDashColors = {
    GREY: "dash--color-grey",
    WHITE: "dash--color-white"
}

export class Dash extends React.Component<IDashProps> {
    render(): JSX.Element {
        return (
            <hr className={`dash ${this.props.size} ${this.props.color}`} />
        );
    }
}