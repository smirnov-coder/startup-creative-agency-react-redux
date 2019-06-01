import * as React from "react";
import { Message } from "@store/entities";
import { AppState } from "@store/state";
import { connect } from "react-redux";
import { getDateTimeString } from "@scripts/utils";
import "./MessageItem.scss";

type MessageItemProps = StateProps;

class MessageItem extends React.Component<MessageItemProps> {
    render(): JSX.Element {
        let { Name, Company, Email, IPAddress, CreatedOn, Subject, Text } = this.props.item;
        return (
            <div className="message">
                <div className="message__line"><b>Name:</b> {Name}</div>
                <div className="message__line"><b>Company:</b> {Company}</div>
                <div className="message__line"><b>E-mail:</b> {Email}</div>
                <div className="message__line"><b>IP Address:</b> {IPAddress}</div>
                <div className="message__line"><b>Send Date:</b> {getDateTimeString(CreatedOn)}</div>
                <div className="message__line"><b>Subject:</b> {Subject}</div>
                <div className="message__line"><b>Text:</b> {Text}</div>
            </div>
        );
    }
}

interface StateProps {
    item: Message;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        item: state.messages.current
    };
}

export default connect(mapStateToProps, null)(MessageItem);