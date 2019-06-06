import * as React from "react";
import "./ErrorPage.scss";

interface ErrorPageProps {
    title: string;
    subtitle: string;
    description: string;
}

const ErrorPage: React.SFC<ErrorPageProps> = ({ title, subtitle, description }: ErrorPageProps) => {
    return (
        <div className="error-info">
            <h1 className="error-info__title">{title}</h1>
            <h2 className="error-info__subtitle">{subtitle}</h2>
            <p className="error-info__description">{description}</p>
        </div>
    );
}

export default ErrorPage;