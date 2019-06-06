import * as React from "react";
import { ServiceInfo } from "@store/entities";
import { Routes } from "@scripts/constants";
import LinkButton from "@components/Shared/LinkButton";
import { ButtonModifiers } from "@components/Shared/Button";
import ServiceItem from "@components/Admin/ServiceItem";
import "./ServiceList.scss";

interface ServiceListProps {
    items: ServiceInfo[];
}

const ServiceList: React.SFC<ServiceListProps> = ({ items }: ServiceListProps) => {
    return (
        <div className="admin-service-list">
            <div className="admin-service-list__items">
                {items.map((item, index) => (
                    <div key={index} className="admin-service-list__item">
                        <ServiceItem item={item} />
                    </div>
                ))}
            </div>
            <LinkButton url={Routes.ADD_SERVICE}
                className="admin-service-list__add"
                modifiers={[ButtonModifiers.Size.SMALL]}
                children="Add New Service" />
        </div>
    );
}

export default ServiceList;