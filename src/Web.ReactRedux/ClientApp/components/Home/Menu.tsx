import * as React from "react";
import findByType from "../../scripts/findComponentsByType";
import "./Menu.scss";

type MenuItemProps = React.PropsWithChildren<{ className?: string }>;

const MenuItem = (props: MenuItemProps): JSX.Element => null;
MenuItem.displayName = "MenuItem";

interface MenuProps {
    className?: string;
    modifiers?: string[];
}

export class Menu extends React.Component<MenuProps> {
    static Item: (props: MenuItemProps) => JSX.Element;

    constructor(props: MenuProps) {
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