import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "@scripts/constants";
import "./Logo.scss";

const Logo: React.SFC = () => {
    return (
        <Link to={Routes.HOME} className="logo custom-link">
            <h2 className="logo__text">Startup</h2>
        </Link>
    );
}

export default Logo;