import * as React from "react";
import { ListItem } from "./ListItem";
import "@bootstrap/css";
import "./ContactItem.scss";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import { ContactInfo } from "@store/entities";

interface ContactItemProps {
    item: ContactInfo;
    index: number;
    onValuesCountChange: () => void;
}

interface ContactItemState {
    values: {
        Value: string
    }[];
}

export class ContactItem extends React.Component<ContactItemProps, ContactItemState> {
    constructor(props: ContactItemProps) {
        super(props);
        this.state = {
            values: this.props.item.Values
        };
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    render(): React.ReactNode {
        let { item, index } = this.props;
        let prefix = `ContactInfos[${index}]`;
        let nameAttribute = `${prefix}.Name`;
        let captionAttribute = `${prefix}.Caption`;
        return (
            <div className="contact-item">
                <ListItem>
                    <ListItem.Header>
                        <input id={nameAttribute} name={nameAttribute} type="hidden" defaultValue={item.Name} />
                        {item.Name}
                    </ListItem.Header>
                    <ListItem.Content>
                        <div className="contact-item__content">
                            <div className="contact-item__line form-group">
                                <label htmlFor={captionAttribute}
                                    className="contact-item__label control-label col-sm-1">
                                    Caption
                                </label>
                                <div className="col-sm-10">
                                    <input id={captionAttribute}
                                        name={captionAttribute}
                                        className="contact-item__text-input form-control"
                                        defaultValue={item.Caption} />
                                </div>
                            </div>
                            {this.state.values.map((contact, contactValueIndex, array) => {
                                let valueAttribute = `${prefix}.Values[${contactValueIndex}].Value`;
                                return (
                                    <div key={contactValueIndex} className="contact-item__line form-group">
                                        <label htmlFor={valueAttribute}
                                            className="contact-item__label control-label col-sm-1">
                                            {`${item.Name} #${contactValueIndex + 1}`}
                                        </label>
                                        <div className="col-sm-10">
                                            <input id={valueAttribute}
                                                name={valueAttribute}
                                                className="contact-item__text-input form-control"
                                                defaultValue={contact.Value} />
                                        </div>
                                        {contactValueIndex === 0 || contactValueIndex !== array.length - 1 ? null :
                                            <div className="contact-item__line-delete col-sm-1">
                                                <Button className="contact-item__delete"
                                                    modifiers={[ButtonModifiers.Style.LINK]}
                                                    children="Delete"
                                                    onClick={(e) => this.handleDeleteClick(e, contactValueIndex)} />
                                            </div>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </ListItem.Content>
                    <ListItem.Footer>
                        <Button className="contact-item__add"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children={`Add ${item.Name}`}
                            onClick={this.handleAddClick} />
                    </ListItem.Footer>
                </ListItem>
            </div>
        );
    }

    componentDidUpdate(): void {
        this.props.onValuesCountChange();
    }

    handleDeleteClick(event: React.MouseEvent, index: number): void {
        event.preventDefault();
        let { values } = this.state;
        values.splice(index, 1);
        this.setState({
            values
        });
    }

    handleAddClick(event: React.MouseEvent): void {
        event.preventDefault();
        let { values } = this.state;
        if (values[values.length - 1].Value !== "") {
            this.setState({
                values: this.state.values.concat({ Value: "" })
            });
        }
    }
}