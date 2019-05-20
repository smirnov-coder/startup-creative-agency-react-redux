import * as React from "react";
import { Link } from "react-router-dom";
import "./Logo.scss";

export class Logo extends React.Component {
    render(): JSX.Element {
        return (
            <Link to="/" className="logo custom-link">
                <h2 className="logo__text">Startup</h2>
            </Link>
        );
    }
}