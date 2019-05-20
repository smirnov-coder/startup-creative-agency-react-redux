import * as React from "react";
import { ListItem } from "./ListItem";
import findByType from "../../scripts/findComponentsByType";

interface ContactItemProps {
    contactName: string;
}

type SubcomponentProps = React.PropsWithChildren<{}>;

const Line = (props: SubcomponentProps): JSX.Element => null;
Line.displayName = "Line";

export class ContactItem extends React.Component<ContactItemProps> {
    static Line: (props: SubcomponentProps) => JSX.Element;

    renderContent(): JSX.Element {
        let { children } = this.props;
        let lines: React.ReactNodeArray = findByType(children, Line);
        if (!lines) {
            return null;
        }
        let elements: JSX.Element[];
        for (var index = 0; index < lines.length; index++) {
            elements.push(
                <div key={index} className="contact-item__line form-group">
                    {(lines[index] as React.ReactElement).props.children}
                </div>
            );
        }
        return (
            <div className="contact-item__content panel-body">
                {elements.map(element => element)}
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div className="contact-item">
                <ListItem>
                    <ListItem.Header>
                        {this.props.contactName}
                    </ListItem.Header>
                    {this.renderContent()}
                </ListItem>
            </div>
        );
    }
}

ContactItem.Line = Line;