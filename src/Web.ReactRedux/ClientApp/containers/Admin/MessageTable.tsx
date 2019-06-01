﻿import * as React from "react";
import { Message } from "@store/entities";
import { AppState } from "@store/state";
import { Dispatch, bindActionCreators } from "redux";
import { Button, ButtonModifiers } from "@components/Shared/Button";
import { connect } from "react-redux";
import { markAsUnread, deleteMessages } from "@store/actions/messagesActions";
import { MessageRow } from "@components/Admin/MessageRow";
import "./MessageTable.scss";
import "@bootstrap/css";

type MessageTableProps = StateProps & DispatchProps;

interface MessageTableState {
    checkedIds: Set<number>;
}

class MessageTable extends React.Component<MessageTableProps, MessageTableState> {
    constructor(props: MessageTableProps) {
        super(props);
        this.state = {
            checkedIds: new Set<number>()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUnreadClick = this.handleUnreadClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    render(): JSX.Element {
        let { items } = this.props;
        return (
            <table className="message-table table table-hover">
                <caption className="message-table__caption">
                    <Button className="message-table__unread"
                        modifiers={[ButtonModifiers.Size.SMALL]}
                        onClick={this.handleUnreadClick}
                        children="Unread" />
                    <Button className="message-table__delete"
                        modifiers={[ButtonModifiers.Size.SMALL]}
                        onClick={this.handleDeleteClick}
                        children="Delete" />
                </caption>
                <thead className="message-table__head">
                    <tr>
                        <th>#</th>
                        <th>&nbsp;</th>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Text</th>
                        <th>Timestamp</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="message-table__body">
                    {items.map((message, index) => (
                        <MessageRow key={message.Id}
                            message={message}
                            messageNo={index + 1}
                            onCheckedChange={this.handleChange} />
                    ))}
                </tbody>
            </table>
        );
    }

    handleUnreadClick(): void {
        this.props.onUnread([...this.state.checkedIds]);
    }

    handleDeleteClick(): void {
        this.props.onDelete([...this.state.checkedIds]);
    }

    handleChange(messageId: number, checked: boolean): void {
        let { checkedIds } = this.state;
        checked ? checkedIds.add(messageId) : checkedIds.delete(messageId);
        this.setState({
            checkedIds
        });
    }
}

interface StateProps {
    items: Message[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        items: state.messages.items
    };
}

interface DispatchProps {
    onUnread: (ids: number[]) => void;
    onDelete: (ids: number[]) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onUnread: bindActionCreators(markAsUnread, dispatch),
        onDelete: bindActionCreators(deleteMessages, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTable);