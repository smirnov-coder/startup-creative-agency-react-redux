import * as React from "react";
import { Brand } from "@store/entities";
import { Routes } from "@scripts/constants";
import { ButtonModifiers } from "@components/Shared/Button";
import "./BrandList.scss";
import BrandItem from "@components/Admin/BrandItem";
import LinkButton from "@components/Shared/LinkButton";

interface BrandListProps {
    items: Brand[];
}

export class BrandList extends React.Component<BrandListProps> {
    render(): JSX.Element {
        return (
            <div className="brand-list">
                <div className="brand-list__items">
                    {this.props.items.map((item, index) => (
                        <div key={index} className="brand-list__item">
                            <BrandItem item={item} />
                        </div>
                    ))}
                </div>
                <LinkButton url={Routes.ADD_BRAND}
                    className="brand-list__add"
                    modifiers={[ButtonModifiers.Size.SMALL]}
                    children="Add New Brand" />
            </div>
        );
    }
}