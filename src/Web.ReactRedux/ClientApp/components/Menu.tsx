import * as React from "react";
import findByType from "../scripts/findComponentsByType";
import "./Menu.scss";

const MenuItem = (props: React.PropsWithChildren<{ className?: string }>): JSX.Element => null;
MenuItem.displayName = "MenuItem";

interface IMenuProps {
    className?: string;
    modifiers?: string[];
}

export class Menu extends React.Component<IMenuProps> {
    static Item: (props: React.PropsWithChildren<{ className?: string }>) => JSX.Element;

    constructor(props: IMenuProps) {
        super(props);
    }

    renderItem(item: React.ReactElement): JSX.Element {
        let { className = "", children } = item.props;
        return (
            <li key={item.key} className={`menu__item ${className}`}>
                {children}
            </li>
        );
    }

    render(): JSX.Element {
        let { className = "", modifiers } = this.props;
        let items: React.ReactNodeArray = findByType(this.props.children, MenuItem);
        if (!items) {
            return null;
        } else {
            return (
                <ul className={`menu ${modifiers ? modifiers.join(" ") : ""} ${className}`}>
                    {items.map(item => this.renderItem(item as React.ReactElement))}
                </ul>
            );
        }
    }
}

Menu.Item = MenuItem;