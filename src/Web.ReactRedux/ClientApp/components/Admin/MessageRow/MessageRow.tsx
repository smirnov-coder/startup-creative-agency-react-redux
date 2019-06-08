import * as React from "react";
import { Link } from "react-router-dom";
import { Message } from "@store/entities";
import { Routes } from "@scripts/constants";
import { getDateTimeString, concretizeRoute } from "@scripts/utils";
import "./MessageRow.scss";

interface MessageRowProps {
    message: Message;
    messageNo: number;
    onCheckedChange: (messageId: number, checked: boolean) => void;
}

interface MessageRowState {
    checked: boolean;
}

export class MessageRow extends React.Component<MessageRowProps, MessageRowState> {
    constructor(props: MessageRowProps) {
        super(props);
        this.state = {
            checked: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    render(): JSX.Element {
        let { message, messageNo } = this.props;
        let url: string = concretizeRoute(Routes.MESSAGE, ":id", message.Id);
        return (
            <tr className={`message-row ${message.IsRead ? "" : "message-row--unread"}`}>
                <td>{messageNo}</td>
                <td>
                    <input type="checkbox" className="message-row__is-read" data-id={message.Id}
                        checked={this.state.checked} onChange={this.handleChange} />
                </td>
                <td className="message-row__from">{`${message.Name}, ${message.Company} (${message.Email})`}</td>
                <td className="message-row__subject">{message.Subject}</td>
                <td className="message-row__text">{message.Text}</td>
                <td className="text-nowrap">{getDateTimeString(message.CreatedOn)}</td>
                <td>
                    <Link to={url} className="custom-link">Read</Link>
                </td>
            </tr>
        );
    }

    handleChange(event: React.ChangeEvent): void {
        let input = event.target as HTMLInputElement;
        this.setState({
            checked: input.checked
        });
        this.props.onCheckedChange(parseInt(input.getAttribute("data-id")), !this.state.checked)
    }
}