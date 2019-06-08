import * as React from "react";
import { Brand } from "@store/entities";
import { Routes } from "@scripts/constants";
import { ButtonModifiers } from "@components/Shared/Button";
import BrandItem from "@components/Admin/BrandItem";
import LinkButton from "@components/Shared/LinkButton";
import "./BrandList.scss";

interface BrandListProps {
    items: Brand[];
}

const BrandList: React.SFC<BrandListProps> = ({ items }: BrandListProps) => {
    return (
        <div className="brand-list">
            <div className="brand-list__items">
                {items.map((item, index) => (
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

export default BrandList;