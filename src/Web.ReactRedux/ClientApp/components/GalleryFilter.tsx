import * as React from "react";
import { ButtonModifiers } from "./Button";
import { FilterButton } from "./FilterButton";
import "./GalleryFilter.scss";

interface IGalleryFilterProps {
    categories: string[];
    activeFilter: string;
    onChangeFilter: (activeFilter: string) => void;
}

export class GalleryFilter extends React.Component<IGalleryFilterProps> {
    constructor(props: IGalleryFilterProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(): JSX.Element {
        let allCategories: string[] = this.props.categories;
        let uniqueCategories: string[] = [...new Set(allCategories)];
        uniqueCategories.unshift("*");
        let buttonClass: string = "menu__item gallery-filter__item";
        let activeClass: string = "gallery-filter__item--active";
        return (
            <div className="menu menu--style-inline gallery-filter">
                {uniqueCategories.map(category => (
                    <FilterButton key={category}
                        className={this.isActive(category) ? `${buttonClass} ${activeClass}` : buttonClass}
                        modifiers={[ButtonModifiers.Style.LINK]}
                        dataFilter={category.toLowerCase()}
                        onClick={this.handleClick}>
                        {category === "*" ? "All" : category}
                    </FilterButton>
                ))}
            </div>
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