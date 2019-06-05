import * as React from "react";
import { ServiceInfo } from "@store/entities";
import Service from "@components/Home/Service";
import "@bootstrap/css";
import "./ServiceList.scss";
import Loader from "@components/Shared/Loader";
import { compose } from "redux";
import { withLoader } from "@containers/Admin/withLoader";
import { withDataFeed } from "@containers/Admin/withDataFeed";

interface ServiceListProps {
    items: ServiceInfo[];
}

const ServiceList: React.SFC<ServiceListProps> = ({ items }: ServiceListProps) => {
    return (
        <section className="service-list">
            <h3 className="sr-only">Service List</h3>
            {items.map((item, index) => (
                <div key={index} className="col-md-4 service-list__item">
                    <Service {...item} />
                </div>
            ))}
        </section>
    );
}

const composed = compose(
    withLoader(Loader, state => state.services.isLoading),
    withDataFeed(state => state.services.items, "items")
);

export default composed(ServiceList);