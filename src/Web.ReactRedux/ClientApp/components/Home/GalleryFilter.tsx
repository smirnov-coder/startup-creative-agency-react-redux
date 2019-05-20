import * as React from "react";
import "./GalleryFilter.scss";
import { Menu } from "./Menu";
import { Button, ButtonModifiers } from "@components/Shared/Button";

interface GalleryFilterProps {
    categories: string[];
    activeFilter: string;
    onChangeFilter: (activeFilter: string) => void;
}

export class GalleryFilter extends React.Component<GalleryFilterProps> {
    constructor(props: GalleryFilterProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(): JSX.Element {
        let allCategories: string[] = this.props.categories;
        let uniqueCategories: string[] = [...new Set(allCategories)];
        uniqueCategories.unshift("*");
        let itemClass: string = "gallery-filter__item";
        let activeClass: string = "gallery-filter__item--active";
        return (
            <Menu className="gallery-filter" modifiers={["menu--style-inline"]}>
                {uniqueCategories.map(category => (
                    <Menu.Item key={category}>
                        <Button modifiers={[ButtonModifiers.Style.LINK]}
                            className={this.isActive(category) ? `${itemClass} ${activeClass}` : itemClass}
                            data-filter={category.toLowerCase()}
                            onClick={this.handleClick}
                            children={category === "*" ? "All" : category} />
                    </Menu.Item>
                ))}
            </Menu>
        );
    }

    isActive(filter: string): boolean {
        return filter.toUpperCase() === this.props.activeFilter.toUpperCase();
    }

    handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        let activeFilter = (event.target as HTMLButtonElement).getAttribute("data-filter");
        this.props.onChangeFilter(activeFilter);
    }
}