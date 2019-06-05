import * as React from "react";
import "./Service.scss";

interface ServiceInfoProps {
    IconClass: string;
    Caption: string;
    Description: string;
}

const Service: React.SFC<ServiceInfoProps> = ({ IconClass, Caption, Description }: ServiceInfoProps) => {
    return (
        <article className="service">
            <div className="service__icon">
                <i className={IconClass}></i>
            </div>
            <h4 className="service__caption">{Caption}</h4>
            <p className="service__description">{Description}</p>
        </article>
    );
}

export default Service;